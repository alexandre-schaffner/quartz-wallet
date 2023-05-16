import type { Accessor } from "solid-js";
import { createSignal, createRenderEffect, onMount, onCleanup } from "solid-js";

function useLayout(): {
  isMobile: Accessor<boolean>;
  width: Accessor<number>;
  height: Accessor<number>;
} {
  const [isMobile, setIsMobile] = createSignal(true);
  const [width, setWidth] = createSignal(0);
  const [height, setHeight] = createSignal(0);

  const handler = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);

    setIsMobile(width() < 700);
  };

  onMount(() => window.addEventListener("resize", handler));
  onCleanup(() => window.removeEventListener("resize", handler));

  createRenderEffect(() => {
    handler();
  });

  return { isMobile, width, height };
}

export default useLayout;
