import { ZoomImageWheelState } from '@zoom-image/core'
import { createEffect, createSignal } from 'solid-js'
import { toast } from 'solid-toast'
import { debounce } from '@solid-primitives/scheduled'
import { TextBoxType } from '@/shared/RecordType.ts'

type BoxDimensionsType = {
  scale: number
  width: number
  height: number
  offsetX: number
  offsetY: number
}

export default function TesseractTextBlock(props: {
  box: TextBoxType
  zoomImageState: ZoomImageWheelState
  containerScale: number
}) {
  const [boxDimensions, setBoxDimensions] = createSignal<BoxDimensionsType>({
    scale: 1,
    width: 0,
    height: 0,
    offsetX: 0,
    offsetY: 0,
  })

  const getBlockDimension = (): BoxDimensionsType => {
    const zoomValue = props.zoomImageState.currentZoom / props.containerScale
    const blockPosition = getBoxOffset(zoomValue)
    return {
      scale: zoomValue,
      width: props.box.width * zoomValue,
      height: props.box.height * zoomValue,
      offsetX: blockPosition.x,
      offsetY: blockPosition.y,
    }
  }

  const getBoxOffset = (zoomValue: number) => {
    const zoomOffset = {
      x: props.zoomImageState.currentPositionX,
      y: props.zoomImageState.currentPositionY,
    }
    const xOffset = props.box.x0 * zoomValue + zoomOffset.x
    const yOffset = props.box.y0 * zoomValue + zoomOffset.y
    return { x: xOffset, y: yOffset }
  }
  const isBigEnought = () =>
    boxDimensions().width * boxDimensions().height >= 200

  const copyTextToClipboard = async () => {
    await navigator.clipboard.writeText(props.box.boxText)
    toast('Text copied to clipboard')
  }

  const debouncedSetBlockDimensions = debounce(setBoxDimensions, 100)
  createEffect(() => {
    debouncedSetBlockDimensions(getBlockDimension())
  })
  return (
    <>
      {isBigEnought() && (
        <button
          onClick={copyTextToClipboard}
          style={{
            width: `${boxDimensions().width}px`,
            height: `${boxDimensions().height}px`,
            top: `${boxDimensions().offsetY}px`,
            left: `${boxDimensions().offsetX}px`,
          }}
          class="group absolute justify-center overflow-hidden border-2 border-red-900/[.9] text-center transition-all hover:bg-white/[.7]"
        >
          <p
            style={{
              'font-size': `${30 * boxDimensions().scale}px`,
            }}
            class="invisible h-full text-center text-black group-hover:visible"
          >
            {props.box.boxText}
          </p>
        </button>
      )}
    </>
  )
}
