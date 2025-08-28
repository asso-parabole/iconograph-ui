<script>
    // @ts-nocheck
    import { onMount } from 'svelte';
    import TableColumnFilter from './TableColumnFilter.svelte';

    export let columns;

    let selectedColumnsToFilter = [];
    let selectedColumn = '';

    async function addFilter() {
        if (selectedColumn && !selectedColumnsToFilter.includes(selectedColumn)) {
            selectedColumnsToFilter = [...selectedColumnsToFilter, selectedColumn];
        }
    }

    $: console.log(selectedColumnsToFilter.map(f => f.filterValue)[0]);
</script>

<div class="tableFilter-wrapper">
    <div>
        <div class="tableFilter-body">
            {#each selectedColumnsToFilter as f}
                <TableColumnFilter filter={f} bind:value={f.filterValue}></TableColumnFilter>
            {/each}
            <select bind:value={selectedColumn}>
                <option value="" disabled selected>Select column to filter</option>
                {#each columns as col}
                    <option value={col}>{col.label}</option>
                {/each}
            </select>
            <button on:click={addFilter}>Add Filter</button>
        </div>
    </div>
</div>

<style>
    /* TODO */
</style>
