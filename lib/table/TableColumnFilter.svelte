<script>
    export let filter;
    export let value;

    console.log("Column filter: ", filter);
</script>

<div class="wrapper">
    <div class="row">
        {#if filter}
            <div style="min-width: {filter.width}px; width: {filter.width}px;">
                {#if filter.filterOptions}
                    <select bind:value={value}>
                    {#each filter.filterOptions as o}
                        <option value={Object.keys(o)[0]}>{Object.values(o)[0]}</option>
                    {/each}
                    </select>
                    <div>{ console.log(filter.filterOptions) }</div>
                {:else}
                    <input type="text"/>
                {/if}
            </div>
        {:else}
            <div>
                ERROR: TableFilterRow should have a column
            </div>
        {/if}
    </div>
</div>

<style>
/* TODO */
</style>
