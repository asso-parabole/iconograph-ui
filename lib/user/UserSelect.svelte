<script>
    // @ts-nocheck
    import { onMount } from 'svelte';
    import Portal from 'svelte-portal';
    import UserPicture from './UserPicture.svelte';
    import {clickOutside} from './../utils/clickOutside.js';
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

    export let uri = '/user';
    export let selected;

    let users = [];
    let waiting = false;
    let open = false;
    let search = "";

    let dropdownEl;
    let coords = { top: 0, left: 0, width: 0 };

    async function handleFilter() {
        waiting = true;

        const response = await fetch(`${uri}?contains=${search}&limit=15&page=1`,  {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const resBody = await response.json();
        users = resBody.data;

        waiting = false;
    }

    function openDropdown() {
        const rect = dropdownEl.getBoundingClientRect();
        coords = { top: rect.bottom, left: rect.left, width: rect.width };
        open = !open;
    }

    function selectUser(user) {
        selected = user;
        open = false;
        search = "";
        dispatch('selectUser', { user: user });
    }

</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="dropdown {open ? 'open' : ''}" bind:this={dropdownEl} use:clickOutside on:click_outside={() => {open = false}}
    on:click|preventDefault|stopPropagation={openDropdown}>
    <input on:keyup={handleFilter}             bind:value={search}
            class="search-input" type="text" placeholder="Rechercher un utilisateur..." />

    <!-- Liste déroulante -->
    {#if open}
    <Portal target="body" >
        <div class="list" style="position: absolute; top:{coords.top}px; left:{coords.left}px; width: {coords.width}px;" >
        <!-- Options -->
        {#each users as user}
            <div class="option" on:click={() => selectUser(user)}>
                <UserPicture user={user} size={24}></UserPicture>
                <span>{user.firstname} {user.lastname}</span>
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
    height: var(--theme-input-height, 40px);
    border: var(--theme-input-border, none);
    border-radius: 8px;
    padding: 0px 16px;
    font-size: 14px;
    line-height: 16px;
    font-weight: 400;
    font-family: var(--theme-text-font);
    color: var(--theme-input-text-font);
    flex: 1;
}
.dropdown.open {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
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
    background: var(--theme-input-bg-highlight, #ebebed);
    border-radius: 8px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    padding: 4px 0px;
    max-height: 220px;
    overflow-y: auto;
    z-index: 9999;
}

.option {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    gap: 8px;
    cursor: pointer;
}
.option > span {
    font-size: 14px;
    line-height: 16px;
    font-weight: 400;
    font-family: var(--theme-text-font);
    color: var(--theme-input-text-color);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.option:hover {
    background: var(--theme-input-bg-hover);
}
</style>