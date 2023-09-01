import { selectedRecord } from '@/stores/recordsStore'
import { createEffect, createMemo, createSignal, For, onMount } from 'solid-js'
import { useZoomImageWheel } from '@zoom-image/solid'
import {
  FaSolidMagnifyingGlassPlus,
  FaSolidMagnifyingGlassMinus,
} from 'solid-icons/fa'
import { IconTypes } from 'solid-icons'
import Tesseract from 'tesseract.js'
import { ZoomImageWheelState } from '@zoom-image/core'

function ZoomIcon(props: { onClick: () => void; icon: IconTypes }) {
  return (
    <button type="button" onClick={() => props.onClick()}>
      <props.icon class="h-5 w-5 transition-colors hover:text-gray-600 active:text-gray-800" />
    </button>
  )
}

function RecognizedBlock(props: {
  block: Tesseract.Block
  zoomImageState: ZoomImageWheelState
  containerScale: number
}) {
  const getSize = createMemo(() => {
    const zoomValue = props.zoomImageState.currentZoom / props.containerScale
    const blockWidth = Math.abs(props.block.bbox.x0 - props.block.bbox.x1)
    const blockHeight = Math.abs(props.block.bbox.y0 - props.block.bbox.y1)
    console.log(props.containerScale)
    return { width: blockWidth * zoomValue, height: blockHeight * zoomValue }
  })
  const getOffset = createMemo(() => {
    const zoomValue = props.zoomImageState.currentZoom / props.containerScale
    const zoomOffset = {
      x: props.zoomImageState.currentPositionX,
      y: props.zoomImageState.currentPositionY,
    }
    const xOffset = props.block.bbox.x0 * zoomValue + zoomOffset.x
    const yOffset = props.block.bbox.y0 * zoomValue + zoomOffset.y
    return { x: xOffset, y: yOffset }
  })
  return (
    <div
      style={{
        width: `${getSize().width}px`,
        height: `${getSize().height}px`,
        top: `${getOffset().y}px`,
        left: `${getOffset().x}px`,
      }}
      class="group absolute border-2 border-red-900/[.9] hover:bg-white/[.7]"
    >
      <p class="invisible group-hover:visible">{props.block.text}</p>
    </div>
  )
}

export default function PhotoView() {
  let containerRef: HTMLDivElement
  let imageRef: HTMLImageElement
  const getRecordDate = () => {
    const record = selectedRecord()
    if (!record) return ''
    const dateString = record.createDate.toLocaleDateString()
    const timeString = record.createDate.toLocaleTimeString()
    return `${dateString} ${timeString}`
  }
  const { createZoomImage, zoomImageState, setZoomImageState } =
    useZoomImageWheel()
  const [date, setDate] = createSignal('')
  createEffect(() => setDate(getRecordDate()))

  onMount(() => {
    createZoomImage(containerRef)
  })

  const zoomInWheel = () =>
    setZoomImageState({
      currentZoom: zoomImageState.currentZoom + 0.5,
    })

  const zoomOutWheel = () =>
    setZoomImageState({
      currentZoom: zoomImageState.currentZoom - 0.5,
    })

  const getContainerScale = () =>
    Math.max(1, imageRef.naturalWidth / containerRef.clientWidth)

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
              containerScale={getContainerScale()}
            />
          )}
        </For>
      </div>
    </div>
  )
}
