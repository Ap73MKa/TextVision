import { selectedRecord } from '@/stores/recordsStore'
import { createEffect, createSignal, For, onMount } from 'solid-js'
import { useZoomImageWheel } from '@zoom-image/solid'
import {
  FaSolidMagnifyingGlassPlus,
  FaSolidMagnifyingGlassMinus,
} from 'solid-icons/fa'
import { IconTypes } from 'solid-icons'

function ZoomIcon(props: { onClick: () => void; icon: IconTypes }) {
  return (
    <button type="button" onClick={() => props.onClick()}>
      <props.icon class="h-5 w-5 transition-colors hover:text-gray-600 active:text-gray-800" />
    </button>
  )
}

export default function PhotoView() {
  let container: HTMLDivElement
  const { createZoomImage, zoomImageState, setZoomImageState } =
    useZoomImageWheel()
  const [date, setDate] = createSignal('')
  createEffect(() => {
    const record = selectedRecord()
    if (!record) return
    const dateString = record.createDate.toLocaleDateString()
    const timeString = record.createDate.toLocaleTimeString()
    setDate(`${dateString} ${timeString}`)
  })

  onMount(() => {
    createZoomImage(container)
  })

  const zoomInWheel = () =>
    setZoomImageState({
      currentZoom: zoomImageState.currentZoom + 0.5,
    })

  const zoomOutWheel = () =>
    setZoomImageState({
      currentZoom: zoomImageState.currentZoom - 0.5,
    })

  return (
    <div class="relative flex h-[calc(100vh_-_41px)] w-full min-w-full items-center justify-center overflow-hidden">
      <div class="absolute left-0 top-0 z-20 flex gap-2 p-2">
        <ZoomIcon onClick={zoomOutWheel} icon={FaSolidMagnifyingGlassMinus} />
        <ZoomIcon onClick={zoomInWheel} icon={FaSolidMagnifyingGlassPlus} />
        <p class="line-clamp-1 text-sm">{selectedRecord()?.name}</p>
      </div>
      <div class="absolute bottom-0 right-0 z-20 mb-1 mr-2">
        <p class="line-clamp-1 text-sm">{date()}</p>
      </div>
      <div
        // eslint-disable-next-line
        // @ts-ignore
        ref={container}
        class="relative !overflow-visible"
      >
        <img src={selectedRecord()?.dataURL} alt="img" class="" />
        <For each={selectedRecord()?.blocks}>
          {(block) => (
            <div
              style={{
                width: `${
                  Math.abs(block.bbox.x0 - block.bbox.x1) *
                  zoomImageState.currentZoom
                }px`,
                height: `${
                  Math.abs(block.bbox.y0 - block.bbox.y1) *
                  zoomImageState.currentZoom
                }px`,
                top: `${
                  block.bbox.y0 * zoomImageState.currentZoom +
                  zoomImageState.currentPositionY
                }px`,
                left: `${
                  block.bbox.x0 * zoomImageState.currentZoom +
                  zoomImageState.currentPositionX
                }px`,
              }}
              class="absolute border-2 border-red-700"
            />
          )}
        </For>
      </div>
    </div>
  )
}
// translateX(${-zoomImageState.currentPositionX}px)
// translateY(${zoomImageState.currentPositionY}px)
