<script>
    // @ts-nocheck
    import { onMount } from 'svelte';
    import Portal from '../display/Portal.svelte';
    import UserPicture from '../user/UserPicture.svelte';
    import {clickOutside} from '../utils/clickOutside.js';
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

    export let uri = `?`;
    export let selected;
    export let placehoder = "Rechercher..."
    export let type = null;

    let results = [];
    let waiting = false;
    let open = false;
    let search = "";

    let y = 0;
    let dropdownEl;
    let coords = { top: 0, left: 0, width: 0 };

    async function handleFilter() {
        waiting = true;

        const response = await fetch(`${uri}limit=50&page=1&contains=${search}`,  {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const resBody = await response.json();
        results = resBody.data;

        waiting = false;
    }

    function openDropdown() {
        const rect = dropdownEl.getBoundingClientRect();
        coords = { top: rect.bottom, left: rect.left, width: rect.width };
        open = !open;
    }

    function selectResult(e) {
        selected = e;
        open = false;
        search = "";
        dispatch('selectResult', { el: e });
    }

</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="dropdown {open ? 'open' : ''}" bind:this={dropdownEl} use:clickOutside on:click_outside={() => {open = false}}
    on:click|preventDefault|stopPropagation={openDropdown}>
    <!-- Search field -->
    <input on:keyup={handleFilter} bind:value={search} class="search-input" type="text" placeholder={placehoder} />

    <!-- Liste déroulante -->
    {#if open}
    <Portal target="#main-container">
        <div class="list" style="position: absolute; top:{coords.top - 1}px; left:{coords.left - 85}px; width: {coords.width - 2}px;" >
            <!-- Options -->
            {#each results as r}
                <div class="option" on:click={() => selectResult(r)}>
                    {#if type == 'user'}
                        <UserPicture user={r} size={24}></UserPicture>
                        <span>{r.firstname} {r.lastname}</span>
                    {:else}
                        <span>{r.name}</span>
                    {/if}
                </div>
            {:else}
                <div class="option"><span>Aucun résultat</span></div>
            {/each}
        </div>
    </Portal>
    {/if}
</div>

<style>
.dropdown {
    position: relative;
    display: flex;
    background-color: var(--theme-input-bg-color, #ebebed);
    height: 38px;
    border: var(--theme-input-border, none);
    border-radius: 8px;
    padding: 0px 16px;
    font-size: 14px;
    line-height: 16px;
    font-weight: 400;
    font-family: var(--theme-text-font);
    color: var(--theme-input-text-font);
    border: 1px solid var(--theme-input-bg-color, #ebebed);
    flex: 1;
}
.dropdown.open {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    border: 1px solid #00000012;
    box-shadow: #00000012 0 0px 8px;
}
.search-input {
    background-color: transparent;
    height: 40px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    padding: 0px;
    font-size: 14px;
    line-height: 16px;
    font-weight: 400;
    font-family: var(--theme-text-font);
    color: var(--theme-input-text-font);
    flex: 1;
    outline: none;
}
.list {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--theme-input-bg-highlight);
    background-color: #f9f9ff;
    border-radius: 8px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    padding: 4px 0px;
    max-height: 220px;
    overflow-y: auto;
    z-index: 9999;
    border: 1px solid #00000012;
    box-shadow: #00000012 0 0px 8px;
}

.option {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    gap: 8px;
    cursor: pointer;
}
.option > span {
    font-size: 13px;
    line-height: 17px;
    font-weight: 500;
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