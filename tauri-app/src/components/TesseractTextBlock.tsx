import Tesseract from 'tesseract.js'
import { ZoomImageWheelState } from '@zoom-image/core'
import { createEffect, createSignal } from 'solid-js'
import { toast } from 'solid-toast'

type BlockDimensionsType = {
  scale: number
  width: number
  height: number
  x0: number
  y0: number
}

export default function TesseractTextBlock(props: {
  block: Tesseract.Block
  zoomImageState: ZoomImageWheelState
  containerScale: number
}) {
  const [blockDimensions, setBlockDimensions] =
    createSignal<BlockDimensionsType>({
      scale: 1,
      width: 0,
      height: 0,
      x0: 0,
      y0: 0,
    })

  const getBlockDimension = (): BlockDimensionsType => {
    const zoomValue = props.zoomImageState.currentZoom / props.containerScale
    const blockSize = getBlockSize(zoomValue)
    const blockPosition = getBlockOffset(zoomValue)
    return {
      scale: zoomValue,
      width: blockSize.width,
      height: blockSize.height,
      x0: blockPosition.x,
      y0: blockPosition.y,
    }
  }

  const getBlockSize = (zoomValue: number) => {
    const blockWidth = Math.abs(props.block.bbox.x0 - props.block.bbox.x1)
    const blockHeight = Math.abs(props.block.bbox.y0 - props.block.bbox.y1)
    return { width: blockWidth * zoomValue, height: blockHeight * zoomValue }
  }

  const getBlockOffset = (zoomValue: number) => {
    const zoomOffset = {
      x: props.zoomImageState.currentPositionX,
      y: props.zoomImageState.currentPositionY,
    }
    const xOffset = props.block.bbox.x0 * zoomValue + zoomOffset.x
    const yOffset = props.block.bbox.y0 * zoomValue + zoomOffset.y
    return { x: xOffset, y: yOffset }
  }
  const isVisible = () =>
    blockDimensions().width * blockDimensions().height >= 200

  const copyTextToClipboard = async () => {
    await navigator.clipboard.writeText(props.block.text)
    toast('Text copied to clipboard')
  }

  createEffect(() => setBlockDimensions(getBlockDimension()))
  return (
    <>
      {isVisible() && (
        <button
          onClick={copyTextToClipboard}
          style={{
            width: `${blockDimensions().width}px`,
            height: `${blockDimensions().height}px`,
            top: `${blockDimensions().y0}px`,
            left: `${blockDimensions().x0}px`,
          }}
          class="group absolute flex items-center justify-center overflow-hidden border-2 border-red-900/[.9] transition-colors hover:bg-white/[.7]"
        >
          <p
            style={{
              'font-size': `${30 * blockDimensions().scale}px`,
            }}
            class="invisible text-black group-hover:visible"
          >
            {props.block.text}
          </p>
        </button>
      )}
    </>
  )
}
