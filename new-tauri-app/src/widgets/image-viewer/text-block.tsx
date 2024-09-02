import { debounce } from '@solid-primitives/scheduled'
import { ZoomImageWheelState } from '@zoom-image/core'
import { Component, createEffect, createSignal } from 'solid-js'
import { toast } from 'solid-sonner'

import { type TextBox } from '~/shared/db'

type BoxDimensionsType = {
  scale: number
  width: number
  height: number
  offsetX: number
  offsetY: number
}

type TextBlockProps = {
  box: TextBox
  zoomImageState: ZoomImageWheelState
  containerScale: number
}

const TextBlock: Component<TextBlockProps> = (props) => {
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

  const isBigEnough = () =>
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
      {isBigEnough() && (
        <button
          onClick={() => copyTextToClipboard}
          style={{
            width: `${boxDimensions().width.toString()}px`,
            height: `${boxDimensions().height.toString()}px`,
            top: `${boxDimensions().offsetY.toString()}px`,
            left: `${boxDimensions().offsetX.toString()}px`,
          }}
          class="group absolute flex items-center justify-center overflow-hidden rounded border border-white/[.3] text-center shadow transition-all hover:bg-black/[.5]"
        >
          <p
            style={{
              'font-size': `${(20 * boxDimensions().scale).toString()}px`,
            }}
            class="invisible text-white group-hover:visible"
          >
            {props.box.boxText}
          </p>
        </button>
      )}
    </>
  )
}

export default TextBlock
