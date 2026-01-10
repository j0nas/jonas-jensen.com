<script lang="ts">
  import { windows } from '$lib/stores/windows';

  export let icon: string;
  export let label: string;
  export let appId: string;

  function handleDblClick() {
    windows.open(appId);
  }
</script>

<button class="desktop-icon" on:dblclick={handleDblClick}>
  <img src={icon} alt="" />
  <span>{label}</span>
</button>

<style>
  .desktop-icon {
    /* Reset all 98.css button styles */
    all: unset;

    /* Desktop icon layout */
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 4px;
    cursor: pointer;
    width: 64px;
    box-sizing: border-box;
  }

  /* Explicitly ensure no button styling remains */
  .desktop-icon,
  .desktop-icon:hover,
  .desktop-icon:active,
  .desktop-icon:focus {
    background: transparent;
    border: none;
    box-shadow: none;
    outline: none;
  }

  .desktop-icon img {
    width: 32px;
    height: 32px;
    pointer-events: none;
  }

  .desktop-icon span {
    color: white;
    text-shadow: 1px 1px 1px black;
    font-size: 11px;
    text-align: center;
    pointer-events: none;
  }
</style>
