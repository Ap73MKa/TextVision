<script lang="ts">
  import * as Form from "@repo/ui/form";
  import { Input } from "@repo/ui/input";
  import { postCreateDtoSchema } from "@/entities/post";
  import { superForm, defaults } from "sveltekit-superforms";
  import { zod } from "sveltekit-superforms/adapters";
  import { createPostAction } from "@/entities/post"
  import { goto } from '$app/navigation';

  const form = superForm(defaults(zod(postCreateDtoSchema)), {
      SPA: true,
      validators: zod(postCreateDtoSchema),
      async onUpdate({ form }) {
        if (form.valid) {
          try {
            await createPostAction(form.data);
            goto("/")
          } catch (error) {
            console.log(error)
          }
        }
      }
  });

  const { form: formData, enhance } = form;

  async function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) $formData.photo = input.files[0];
  }
</script>

<form method="POST" use:enhance enctype="multipart/form-data" class="space-y-4 py-2">
 <Form.Field {form} name="name">
  <Form.Control let:attrs>
   <Form.Label>Filename</Form.Label>
   <Input {...attrs} bind:value={$formData.name} />
  </Form.Control>
  <Form.FieldErrors />
 </Form.Field>
 <Form.Field {form} name="photo">
  <Form.Control let:attrs>
   <Form.Label>Language</Form.Label>
   <Input {...attrs} accept="image/png, image/jpeg" type="file" on:change={handleFileChange} />
  </Form.Control>
  <Form.FieldErrors />
 </Form.Field>
 <Form.Button>Submit</Form.Button>
</form>
