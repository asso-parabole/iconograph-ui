<script>
    // @ts-nocheck
    import { onMount, createEventDispatcher } from 'svelte';
    import TableColumnFilter from './TableColumnFilter.svelte';
    import {clickOutside} from './../utils/clickOutside.js';
    import searchIcon from '../assets/icons/icon-search-white.svg?url';

    const dispatch = createEventDispatcher();

    export let columns;

    let selectedColumnsToFilter = [];
    let aggregateFilters = {};

    async function addFilter(col) {
        if (col && !selectedColumnsToFilter.includes(col)) {
            selectedColumnsToFilter = [...selectedColumnsToFilter, col];
        }
    }

    function removeFilter(col) {
        delete col.filterValue;
        selectedColumnsToFilter = selectedColumnsToFilter.filter(f => f.field != col.field);

        aggregateFilters = {};
        selectedColumnsToFilter.forEach(f => {
            aggregateFilters[f.field] = f.filterValue;
        });

        dispatch("filter", aggregateFilters);
    }

    async function submitFilter() {
        console.log(aggregateFilters);
        dispatch("filter", aggregateFilters);
    }

    $: {
        aggregateFilters = {};
        selectedColumnsToFilter.forEach(f => {
            aggregateFilters[f.field] = f.filterValue;
        });
    };

    let selectopen = false;
</script>

<div class="tableFilter-wrapper">
    <div>
        <div class="tableFilter-body">
            {#each selectedColumnsToFilter as f}
                <TableColumnFilter filter={f} bind:value={f.filterValue}>
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div on:click={() => {removeFilter(f)}} style="width: 16px; height: 16px;"></div>
                </TableColumnFilter>
            {/each}

            {#if selectedColumnsToFilter.length > 0}
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <button on:click={submitFilter} class="search-filter" aria-label="Filter" style:background-image={`url("${searchIcon}")`}></button>
            {/if}
        </div>

        <div class="tableFilter-body">
            <button class="add-filter" use:clickOutside on:click_outside={() => {selectopen = false}}
                on:click|preventDefault|stopPropagation={() => {selectopen = !selectopen}}>
                + Filtre
            </button>

            {#if selectopen}
                <div class="select-filter" >
                    {#each columns as col}
                        {#if col.filterOptions != false }
                            <!-- svelte-ignore a11y_click_events_have_key_events -->
                            <!-- svelte-ignore a11y_no_static_element_interactions -->
                            <div value={col} on:click={() => addFilter(col)} >{col.label}</div>
                        {/if}
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
.tableFilter-wrapper {
    padding: 8px;
    padding-left: 16px;
}
.tableFilter-wrapper > div {
    display: flex;
    align-items: flex-start;
    gap: 8px;
}
.tableFilter-body {
    position: relative;
    display: flex;
    gap: 8px;
}
.add-filter {
    padding: 6px 16px;
    background-color: transparent;
    border: 1px solid var(--theme-main-color);
    color: var(--theme-main-color);
    border-radius: 7px;
    font-weight: 600;
    transition: all ease-in-out 0.13s;
    height: 32px;
}
.add-filter:hover {
    cursor: pointer;
    background-color: var(--theme-bg-color-light);
}
.search-filter {
    padding: 6px 16px;
    background-color: var(--theme-main-color);
    border: 1px solid var(--theme-main-color);
    background-position: center center;
    background-size: 16px auto;
    background-repeat: no-repeat;
    color: var(--theme-main-color);
    border-radius: 7px;
    font-weight: 600;
    transition: all ease-in-out 0.13s;
    height: 32px;
}
.search-filter:hover {
    cursor: pointer;
    background-color: var(--theme-main-color-hover);
}
.select-filter {
    position: absolute;
    top: 32px;
    left: -1px;
    background-color: var(--main-bg-color);
    box-sizing: border-box;
    border: 1px solid var(--main-border-color);
    border-radius: 8px;
    min-width: 150px;
    padding: 4px 0px;
    box-shadow: #00000012 0 0px 8px;
}
.select-filter > div {
    display: block ruby;
    padding: 6px 16px;
    font-size: 13px;
}
.select-filter > div:hover {
    cursor: pointer;
    background-color: var(--theme-input-bg-color);
}
</style>
