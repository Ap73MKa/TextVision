import type { Component } from "solid-js";
import { Button } from "~/shared/ui/button";

const SideBar: Component = () => {
  return (
    <div class="size-full flex flex-col gap-2 px-4 py-6">
      <h1>text-vision</h1>
      <Button>Browse files</Button>
    </div>
  );
};

export default SideBar;
