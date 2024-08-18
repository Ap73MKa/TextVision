import type { Component } from "solid-js";
import { SideBar } from "~/widgets/sidebar";

const MainPage: Component = () => {
  return (
    <div class="size-full divide-x grid grid-cols-[15rem_1fr]">
      <SideBar />
      <div class="bg-secondary size-full flex items-center justify-center">
        Check this out
      </div>
    </div>
  );
};

export default MainPage;
