<script>
    // @ts-nocheck
    import { onMount } from 'svelte';
    import { clickOutside } from './../utils/clickOutside.js';
    import detailsIcon from '../assets/icons/icon-details.svg?url';
    import Portal from '../display/Portal.svelte';

    export let options = [];
    export let style = "classic";

    let open = false;
    let dropdownEl;
    let y = 0;
    let coords = { top: 0, right: 0, width: 0 };

    function openDropdown() {
        const rect = dropdownEl.getBoundingClientRect();
        coords = { top: rect.bottom, left: rect.left, right: window.innerWidth - rect.right, width: rect.width };
        open = !open;
    }

</script>

<svelte:window bind:scrollY={y} />

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="dropdown {open ? 'open' : ''} {style == "icon" ? 'icon' : ''}"
    bind:this={dropdownEl} use:clickOutside on:click_outside={() => {open = false}}
    on:click|preventDefault|stopPropagation={openDropdown}>
    {#if style == "icon"}
        <div style:background-image={`url("${detailsIcon}")`} class="icon"></div>
    {:else}
        <div style:background-image={`url("${detailsIcon}")`}>Actions</div>
    {/if}

    <!-- Liste déroulante -->
    {#if open}
    <Portal target="#main-container" position={"top: 0px; right: 0px"}>
        <div class="list" style="position: absolute; top:{coords.top + 4}px; right:{coords.right - 14}px; width: {coords.width}px;" >
        <!-- Options -->
        {#each options as opt}
            <div class="option" on:click={opt.action}>
                <span>{opt.label}</span>
            </div>
        {/each}
        </div>
    </Portal>
    {/if}

</div>

<style>
.dropdown {
    position: relative;
    display: flex;
    height: 32px;
    flex: 1;
}
.dropdown.icon {
    height: 32px;
}
.dropdown.open {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
}
.dropdown > div:first-of-type {
    background-color: var(--theme-input-bg-highlight);
    height: 32px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    padding: 0px 8px;
    font-size: 14px;
    line-height: 33px;
    font-weight: 600;
    font-family: var(--theme-text-font);
    color: #333;
    flex: 1;
    min-width: 76px;
    background-size: 14px auto;
    background-repeat: no-repeat;
    background-position: center right 14px;
    padding-left: 20px;

    transition: all ease-in-out 0.17s;
}
.dropdown > div:first-of-type:hover {
    background-color: var(--theme-input-bg-hover);
}
.dropdown > div:first-of-type.icon {
    min-width: 1px;
    width: 32px;
    max-width: 32px;
    background-size: 14px auto;
    background-repeat: no-repeat;
    background-position: center center;
    padding: 0px;
    height: 32px;
}
.list {
    position: absolute;
    top: 100%;
    right: 0px;
    background: #ffffff; /*var(--theme-input-bg-highlight, #ebebed);*/
    border-radius: 8px;
    padding: 8px 0px;
    max-height: 220px;
    overflow-y: auto;
    z-index: 9999;
    min-width: 200px;
    border: 1px solid #00000012;
    box-shadow: #00000012 0 0px 8px;
}
.option {
    display: flex;
    align-items: center;
    padding: 8px 24px;
    gap: 8px;
    cursor: pointer;
}
.option > span {
    font-size: 14px;
    line-height: 18px;
    font-weight: 400;
    font-family: var(--theme-text-font);
    color: var(--theme-input-text-color);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.option:hover {
    background: var(--theme-input-bg-highlight);
}
</style>