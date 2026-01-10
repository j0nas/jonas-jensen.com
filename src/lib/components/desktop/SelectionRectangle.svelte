<script lang="ts">
  interface Props {
    x: number;
    y: number;
    width: number;
    height: number;
    visible: boolean;
  }

  let { x, y, width, height, visible }: Props = $props();
</script>

{#if visible}
  <div
    class="selection-rectangle"
    style="left: {x}px; top: {y}px; width: {width}px; height: {height}px;"
    aria-hidden="true"
  ></div>
{/if}

<style>
  .selection-rectangle {
    position: fixed;
    pointer-events: none;
    border: 1px dashed #000080;
    background-color: rgba(0, 0, 128, 0.1);
    z-index: 9999;
    /* Marching ants animation */
    animation: marching-ants 0.5s linear infinite;
  }

  @keyframes marching-ants {
    0% {
      background-position: 0 0, 100% 0, 100% 100%, 0 100%;
    }
    100% {
      background-position: 20px 0, 100% 20px, calc(100% - 20px) 100%, 0 calc(100% - 20px);
    }
  }

  /* Alternative marching ants using border animation */
  .selection-rectangle {
    border: none;
    background-image:
      linear-gradient(90deg, #000080 50%, transparent 50%),
      linear-gradient(90deg, #000080 50%, transparent 50%),
      linear-gradient(0deg, #000080 50%, transparent 50%),
      linear-gradient(0deg, #000080 50%, transparent 50%);
    background-size:
      8px 1px,
      8px 1px,
      1px 8px,
      1px 8px;
    background-position:
      0 0,
      0 100%,
      0 0,
      100% 0;
    background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
    animation: marching-ants-border 0.4s linear infinite;
  }

  @keyframes marching-ants-border {
    0% {
      background-position:
        0 0,
        8px 100%,
        0 8px,
        100% 0;
    }
    100% {
      background-position:
        8px 0,
        0 100%,
        0 0,
        100% 8px;
    }
  }
</style>
