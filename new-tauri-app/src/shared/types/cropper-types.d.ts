import type CropperCanvas from '@cropper/element-canvas'
import type CropperCrosshair from '@cropper/element-crosshair'
import type CropperGrid from '@cropper/element-grid'
import type CropperHandle from '@cropper/element-handle'
import type CropperImage from '@cropper/element-image'
import type CropperSelection from '@cropper/element-selection'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'cropper-image': JSX.HTMLAttributes<CropperImage>
      'cropper-canvas': JSX.HTMLAttributes<CropperCanvas>
      'cropper-handle': JSX.HTMLAttributes<CropperHandle>
      'cropper-selection': JSX.HTMLAttributes<CropperSelection>
      'cropper-grid': JSX.HTMLAttributes<CropperGrid>
      'cropper-crosshair': JSX.HTMLAttributes<CropperCrosshair>
    }
  }
}

export {}
