<script lang="ts">
  import { createPostAction } from "@/entities/post";
  import { goto } from "$app/navigation";
  import { Button } from "@repo/ui/button";
  import { getCropperContext } from "./cropper-context";

  const { fileName, lang, imageData }: { fileName: string, lang: string, imageData: string } = $props();
  let loading = $state<boolean>(false);
  const ctx = getCropperContext();

  // Функция для преобразования base64 в файл
  const fromBase64ToFile = async (base64: string): Promise<File> => {
    const res: Response = await fetch(base64);
    const blob: Blob = await res.blob();
    return new File([blob], fileName, { type: 'image/png' });
  };

  // Функция для применения стилей и рендеринга изображения на канвасе
  const renderImageWithStyles = async (): Promise<string> => {
    // Создаем элемент изображения
    const img = new Image();
    img.src = imageData; // Загружаем base64 изображение

    return new Promise((resolve) => {
      img.onload = () => {
        // Создаем канвас
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (!context) {
          throw new Error("Не удалось получить контекст канваса");
        }

        // Применяем стиль из cropper
        const styles = ctx.cropperImage?.$image.style.filter
        if (!styles) return resolve(imageData)

        canvas.width = img.width;
        canvas.height = img.height;

        context.filter = styles; // Применяем фильтр
        context.drawImage(img, 0, 0);

        // Получаем Data URL изображения с примененными стилями
        resolve(canvas.toDataURL('image/png'));
      };
    });
  };

  // Функция отправки изображения
  const submitImage = async () => {
    try {
      loading = true;
      const styledImageData = await renderImageWithStyles();
      const file = await fromBase64ToFile(styledImageData); // Преобразуем base64 в файл

      // Отправляем файл
      await createPostAction({
        name: fileName,
        language: lang,
        photo: file,
      });

      loading = false;
      await goto("/");
    } catch (ex) {
      loading = false;
      console.error(ex);
    }
  };
</script>

<Button variant="ghost" onclick={submitImage} disabled={loading}>
    Submit
</Button>
