<script lang="ts">
  import LogOutIcon from "lucide-svelte/icons/log-out"
  import MailIcon from "lucide-svelte/icons/mail"
  import NotepadIcon from "lucide-svelte/icons/notepad-text"
  import UserIcon from "lucide-svelte/icons/user"

  import { user } from "@/shared/auth";

  const signOut = () => { user.set(null) }
</script>

{#if $user}
    <div class="size-full pt-4 flex flex-col">
        <div class="w-full flex flex-col gap-4 justify-center items-center py-8">
            <h2 class="font-medium text-xl">Аккаунт</h2>
            <div class="size-20 text-xl rounded-full bg-background flex items-center justify-center overflow-hidden">
                {$user.givenName.charAt(0)}{$user.familyName.charAt(0)}
            </div>
        </div>
        <div class="w-full bg-background rounded-t-3xl border-t overflow-hidden grow p-4">
            <div class="text-center pt-2 pb-4">Личная информация</div>
            <ul class="w-full flex flex-col gap-8 pb-8 border-b">
                <li class="w-ful flex gap-4 px-2 items-center">
                    <div class="size-10 p-0.5">
                        <NotepadIcon class="size-full stroke-[1.3]" />
                    </div>
                    <div class="w-full flex flex-col">
                        <h3 class="text-muted-foreground">Логин</h3>
                        <span class="leading-5 text-lg">{$user.preferedName}</span>
                    </div>
                </li>
                <li class="w-ful flex gap-4 px-2 items-center">
                    <div class="size-10">
                        <UserIcon class="size-full stroke-[1.3]" />
                    </div>
                    <div class="w-full flex flex-col">
                        <h3 class="text-muted-foreground">Полное имя</h3>
                        <span class="leading-5 text-lg">{$user.givenName} {$user.familyName}</span>
                    </div>
                </li>
                <li class="w-ful flex gap-4 px-2 items-center">
                    <div class="size-10 p-0.5">
                        <MailIcon class="size-full stroke-[1.3]" />
                    </div>
                    <div class="w-full flex flex-col">
                        <h3 class="text-muted-foreground">Почта</h3>
                        <span class="leading-5 text-lg">{$user.email}</span>
                    </div>
                </li>
            </ul>
            <button type="button" onclick={signOut} class="w-full flex text-left text-destructive gap-4 px-2 py-8 items-center">
                <div class="size-10 p-0.5">
                    <LogOutIcon class="size-full stroke-[1.3]" />
                </div>
                <div class="w-full flex flex-col">
                    <h3 class="leading-5 text-lg">Выход</h3>
                    <span class="text-destructive">Выйти из аккаунта для смены</span>
                </div>
            </button>
        </div>
    </div>
{/if}
