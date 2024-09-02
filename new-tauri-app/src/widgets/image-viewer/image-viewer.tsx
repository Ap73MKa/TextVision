import { useZoomImageWheel } from '@zoom-image/solid'
import { Icon } from 'solid-heroicons'
import {
  magnifyingGlassMinus,
  magnifyingGlassPlus,
} from 'solid-heroicons/outline'
import {
  type Component,
  createEffect,
  createSignal,
  For,
  JSX,
  onCleanup,
  onMount,
} from 'solid-js'

import { TextBox } from '~/shared/db'

import TextBlock from './text-block'

type ZoomIconProps = {
  onClick: () => void
  iconPath: { path: JSX.Element; outline?: boolean; mini?: boolean }
}

const ZoomIcon: Component<ZoomIconProps> = (props) => {
  return (
    <button
      type="button"
      onClick={() => {
        props.onClick()
      }}
    >
      <Icon
        path={props.iconPath}
        class="size-5 transition-transform hover:scale-105"
      />
    </button>
  )
}

type ImageViewerPrps = { base64Image: string; blocks: TextBox[] }

const ImageViewer: Component<ImageViewerPrps> = (props) => {
  let containerRef: HTMLDivElement
  let imageRef: HTMLImageElement

  const [containerScale, setContainerScale] = createSignal(0)
  const { createZoomImage, zoomImageState, setZoomImageState } =
    useZoomImageWheel()

  const calcContainerScale = (containerWidth: number): number => {
    const accuracy = 50
    const scale = imageRef.naturalWidth / containerWidth
    const roundedScale = Math.round(scale * accuracy) / accuracy
    return Math.max(1, roundedScale)
  }

  const zoomInWheel = () => {
    setZoomImageState({
      currentZoom: zoomImageState.currentZoom + 0.5,
    })
  }

  const zoomOutWheel = () => {
    setZoomImageState({
      currentZoom: zoomImageState.currentZoom - 0.5,
    })
  }

  createEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries)
        if (entry.target === containerRef) {
          const width = containerRef.clientWidth
          const scale = calcContainerScale(width)
          setContainerScale(scale)
        }
    })
    resizeObserver.observe(containerRef)
    onCleanup(() => {
      resizeObserver.disconnect()
    })
  })

  onMount(() => {
    createZoomImage(containerRef)
  })
  return (
    <div class="relative flex h-[calc(100vh_-_41px)] w-full min-w-full items-center justify-center overflow-hidden">
      <div class="absolute right-0 top-0 z-20 flex gap-2 p-2">
        <ZoomIcon onClick={zoomOutWheel} iconPath={magnifyingGlassMinus} />
        <ZoomIcon onClick={zoomInWheel} iconPath={magnifyingGlassPlus} />
      </div>
      <div
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        ref={containerRef!}
        class="relative cursor-grab !overflow-visible active:cursor-grabbing"
      >
        <img
          // @ts-expect-error Typescript solid js ref bug
          ref={imageRef}
          src={props.base64Image}
          alt="img"
        />
        <For each={props.blocks}>
          {(box) => (
            <TextBlock
              box={box}
              zoomImageState={zoomImageState}
              containerScale={containerScale()}
            />
          )}
        </For>
      </div>
    </div>
  )
}

export default ImageViewer
