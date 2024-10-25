<script lang="ts">
  import { goto } from "$app/navigation"
  import { userManager } from "@/shared/auth"
  import { onMount } from "svelte"

    onMount(async () => {
      try {
        await userManager.signinRedirectCallback()
        goto('/')
      }
      catch (err) {
        console.log(err)
      }
    })
</script>

<span>Loading</span>
