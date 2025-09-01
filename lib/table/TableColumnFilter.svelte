<script>
    export let filter;
    export let value;
</script>

<div class="wrapper">
    <div class="row">
        {#if filter}
            <div style="min-width: {filter.width}px; width: {filter.width}px;">
                {filter.label}
                {#if filter.filterOptions}
                    <select bind:value={value}>
                    {#each filter.filterOptions as o}
                        <option value={Object.keys(o)[0]}>{Object.values(o)[0]}</option>
                    {/each}
                    </select>
                {:else}
                    <input type="text" bind:value={value}/>
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
