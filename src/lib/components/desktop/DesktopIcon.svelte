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
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    background: none;
    border: none;
    padding: 4px;
    cursor: pointer;
    width: 64px;
  }
  .desktop-icon:focus {
    outline: 1px dotted white;
  }
  .desktop-icon img {
    width: 32px;
    height: 32px;
  }
  .desktop-icon span {
    color: white;
    text-shadow: 1px 1px 1px black;
    font-size: 11px;
    text-align: center;
  }
</style>
