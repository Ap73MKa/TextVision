<script lang="ts">
  import { fromBase64ToFile } from "@repo/models/services/image-decode"
  import { Button } from "@repo/ui/button";

  import { createPostAction } from "@/entities/post";
  import { goto } from "$app/navigation";

  import { getCropperContext } from "./cropper-context";
  import { toast } from "svelte-sonner";

  const { fileName, lang, imageData }: { fileName: string, lang: string, imageData: string } = $props();
  let loading = $state<boolean>(false);
  const ctx = getCropperContext();

  const renderImageWithStyles = async (): Promise<string> => {
      // eslint-disable-next-line no-undef
    const img = new Image();
    img.src = imageData;

    return new Promise((resolve) => {
      img.onload = () => {
          // eslint-disable-next-line no-undef
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (!context) throw new Error("Не удалось получить контекст канваса")

        const styles = ctx.cropperImage?.$image.style.filter
        if (!styles) {
            resolve(imageData)
            return
        }

        canvas.width = img.width;
        canvas.height = img.height;

        context.filter = styles;
        context.drawImage(img, 0, 0);

        resolve(canvas.toDataURL('image/png'));
      };
    });
  };

  const submitImage = async () => {
    try {
      loading = true;
      const styledImageData = await renderImageWithStyles();
      const file = await fromBase64ToFile(styledImageData);

      await createPostAction({
        name: fileName,
        language: lang,
        photo: file,
      });

      loading = false;
      await goto("/");
    } catch (ex) {
        toast.error(ex?.toString() ?? "Неизвестная ошибка. Повторите попытку позже.")
      loading = false;
    }
  };
</script>

<Button variant="ghost" onclick={submitImage} disabled={loading}>
    Подтвердить
</Button>
