import { selectedRecord } from '@/stores/recordsStore'
import { createEffect, createSignal, For, onCleanup, onMount } from 'solid-js'
import { useZoomImageWheel } from '@zoom-image/solid'
import {
  FaSolidMagnifyingGlassPlus,
  FaSolidMagnifyingGlassMinus,
} from 'solid-icons/fa'
import { IconTypes } from 'solid-icons'
import RecognizedBlock from '@/components/TesseractTextBlock.tsx'

function ZoomIcon(props: { onClick: () => void; icon: IconTypes }) {
  return (
    <button type="button" onClick={() => props.onClick()}>
      <props.icon class="h-5 w-5 transition-colors hover:fill-gray-600 active:fill-gray-800 dark:fill-stone-400" />
    </button>
  )
}

export default function PhotoView() {
  let containerRef: HTMLDivElement
  let imageRef: HTMLImageElement

  const [date, setDate] = createSignal('')
  const [containerScale, setContainerScale] = createSignal(0)
  const { createZoomImage, zoomImageState, setZoomImageState } =
    useZoomImageWheel()

  const getRecordDate = () => {
    const record = selectedRecord()
    if (!record) return ''
    const dateString = record.createDate.toLocaleDateString()
    const timeString = record.createDate.toLocaleTimeString()
    return `${dateString} ${timeString}`
  }

  const calcContainerScale = (containerWidth: number) => {
    const accuracy = 50
    const scale = imageRef.naturalWidth / containerWidth
    const roundedScale = Math.round(scale * accuracy) / accuracy
    return Math.max(1, roundedScale)
  }

  const zoomInWheel = () =>
    setZoomImageState({
      currentZoom: zoomImageState.currentZoom + 0.5,
    })

  const zoomOutWheel = () =>
    setZoomImageState({
      currentZoom: zoomImageState.currentZoom - 0.5,
    })

  createEffect(() => setDate(getRecordDate()))

  createEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries)
        if (entry.target === containerRef) {
          setContainerScale(calcContainerScale(containerRef.clientWidth))
        }
    })
    resizeObserver.observe(containerRef)
    onCleanup(() => resizeObserver.disconnect())
  })

  onMount(() => {
    createZoomImage(containerRef)
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
        // @ts-expect-error Typescript solid js ref bug
        ref={containerRef}
        class="relative cursor-grab !overflow-visible active:cursor-grabbing"
      >
        <img
          // @ts-expect-error Typescript solid js ref bug
          ref={imageRef}
          src={selectedRecord()?.dataURL}
          alt="img"
          class=""
        />
        <For each={selectedRecord()?.blocks}>
          {(block) => (
            <RecognizedBlock
              block={block}
              zoomImageState={zoomImageState}
              containerScale={containerScale()}
            />
          )}
        </For>
      </div>
    </div>
  )
}
