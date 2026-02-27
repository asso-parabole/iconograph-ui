<script>
    // @ts-nocheck
    import { onMount } from 'svelte';
    import { clickOutside } from './../utils/clickOutside.js';
    import detailsIcon from '../assets/icons/icon-details.svg?url';
    import Portal from '../display/Portal.svelte';

    export let options = [];
    export let style = "classic";
    export let outline = false;

    let open = false;
    let dropdownEl;
    let y = 0;
    let coords = { top: 0, right: 0, width: 0 };

    function openDropdown() {
        const rect = dropdownEl.getBoundingClientRect();
        const scrollAtOpen = y;
        coords = { top: rect.bottom + scrollAtOpen, left: rect.left, right: window.innerWidth - rect.right, width: rect.width };
        open = !open;
    }

</script>

<svelte:window bind:scrollY={y} />

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="dropdown {open ? 'open' : ''} {style == "icon" ? 'icon' : ''} {outline ? 'outline' : '' }"
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
        <div class="list" style="position: absolute; top:{coords.top + 6}px; right:{coords.right - 0}px; width: {coords.width}px;" >
        <!-- Options -->
        {#each options as opt}
            {#if opt.separator }
            <hr />
            {:else}
            <div class="option" on:click={opt.action} style:background-image={`url("${opt.icon}")`} >
                <span>{opt.label}</span>
            </div>
            {/if}
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
    box-shadow: var(--button-box-shadow);
    height: 32px;
    border: none;
    border-radius: 7px;
    cursor: pointer;
    padding: 0px 8px;
    font-size: 14px;
    line-height: 32px;
    font-weight: 500;
    font-family: var(--theme-text-font);
    color: #121212;
    flex: 1;
    background-size: 14px auto;
    background-repeat: no-repeat;
    background-position: center right 12px;
    padding-left: 18px;
    padding-right: 32px;
    transition: all ease-in-out 0.17s;
}
.dropdown.outline > div:first-of-type {
    height: 30px;
    line-height: 30px;
    border: 1px solid var(--button-border-color);
    background-color: var(--main-bg-color);
}
.dropdown > div:first-of-type:hover {
    background-color: var(--theme-input-bg-hover);
    box-shadow: var(--button-hover-box-shadow);
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
.dropdown.outline > div:first-of-type.icon {
    height: 30px;
    line-height: 30px;
    max-width: 30px;
    border: 1px solid var(--button-border-color);
    background-color: var(--main-bg-color);
}
.dropdown.outline > div:first-of-type:hover {
    background-color: var(--theme-input-bg-highlight);
}
.list {
    position: absolute;
    top: 100%;
    right: 0px;
    background: #ffffff; /*var(--theme-input-bg-highlight, #ebebed);*/
    border-radius: 7px;
    padding: 8px 0px;
    max-height: 220px;
    overflow-y: auto;
    z-index: 9999;
    min-width: 260px;
    border: 1px solid var(--button-border-color);
    box-shadow: #77777715 0 3px 10px;
}
.option {
    display: flex;
    align-items: center;
    padding: 8px 12px 8px 36px;
    margin: 0px 8px;
    gap: 8px;
    cursor: pointer;
    border-radius: 5px;
    background-size: 20px auto;
    background-repeat: no-repeat;
    background-position: center left 8px;
}
.option > span {
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    font-family: var(--theme-text-font);
    color: var(--theme-input-text-color);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.option:hover {
    background-color: var(--theme-input-bg-color);
}
hr {
    color: var(--button-border-color);
    height: 0;
    line-height: 0;
    margin: 7px 12px;
    border-top: 1px solid var(--button-border-color);
    border-bottom: 0px solid var(--button-border-color);
}
</style>