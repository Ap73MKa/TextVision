<script lang="ts">
  import 'cropperjs'

  import type { CropperSelection } from 'cropperjs'

  import { getCropperContext } from './cropper-context'

  let { currentTab, onValueChanged }: { currentTab: string, onValueChanged?: (value: string) => void } = $props()

  const SKIP_INITIAL_RENDERS = 8
  const MIN_SELECTION = 128
  const DEBOUNCE_TIME = 500

  let cropperSelection: CropperSelection
  // eslint-disable-next-line no-undef
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;
  let countOfRender = 0;

  const ctx = getCropperContext()

  const onSelectionChanged = () => {
    if (countOfRender < SKIP_INITIAL_RENDERS) {
      countOfRender++
      return;
    }

      // eslint-disable-next-line no-undef
    if (debounceTimer) clearTimeout(debounceTimer);
      // eslint-disable-next-line no-undef
    debounceTimer = setTimeout(renderSelection, DEBOUNCE_TIME);
  }

  const renderSelection = async () => {
    if (!onValueChanged) return;
    if (!ctx.cropperImage || currentTab !== 'crop') return;
    if (cropperSelection.width * cropperSelection.height < MIN_SELECTION)  return;

    const canvas = await cropperSelection.$toCanvas({
      beforeDraw: (context) => {
        context.imageSmoothingQuality = 'high';
        context.imageSmoothingEnabled = true;
      },
      width: ctx.cropperImage.$image.width,
      height: ctx.cropperImage.$image.height,
    });

    onValueChanged(canvas.toDataURL('image/png', 1));
    debounceTimer = null;
  }

  $effect(() => {
    if (currentTab !== 'crop') return;
    countOfRender = 0;
  })
</script>

<cropper-selection
  bind:this={cropperSelection}
  onchange={onSelectionChanged}
  initial-coverage="0.5"
  dynamic
  movable
  resizable
  zoomable
  outlined
>
  <cropper-grid role="grid" covered></cropper-grid>
  <cropper-crosshair centered></cropper-crosshair>
  <cropper-handle action="move" theme-color="rgba(200, 200, 255, 0.35)"></cropper-handle>
  <cropper-handle action="n-resize"></cropper-handle>
  <cropper-handle action="e-resize"></cropper-handle>
  <cropper-handle action="s-resize"></cropper-handle>
  <cropper-handle action="w-resize"></cropper-handle>
  <cropper-handle action="ne-resize"></cropper-handle>
  <cropper-handle action="nw-resize"></cropper-handle>
  <cropper-handle action="se-resize"></cropper-handle>
  <cropper-handle action="sw-resize"></cropper-handle>
</cropper-selection>
