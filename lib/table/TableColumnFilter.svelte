<script>
    import crossIcon from '../assets/icons/icon-close-cross.svg?url';

    export let filter;
    export let value;
</script>

<div class="wrapper">
    <div class="row">
        {#if filter}
            <div style="min-width: {filter.width}px;">
                {filter.label}
                {#if filter.filterOptions}
                    est égal à <select bind:value={value}>
                    {#each filter.filterOptions as o}
                        <option value={Object.keys(o)[0]}>{Object.values(o)[0]}</option>
                    {/each}
                    </select>
                {:else}
                    : <input type="text" bind:value={value}/>
                {/if}
                <div class="cross" style:background-image={`url("${crossIcon}")`} ><slot></slot></div>
            </div>
        {:else}
            <div>
                ERROR: TableFilterRow should have a column
            </div>
        {/if}
    </div>
</div>

<style>
.wrapper {
    display: flex;
    border: 1px solid var(--main-border-color);
    color: var(--theme-main-color);
    border-radius: 7px;
    padding: 4px 16px;
    color: #777;
    font-size: 13px;
    font-weight: 500;
    height: 22px;
}
.wrapper > .row > div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
input {
    border: none;
    border-bottom: 1px solid var(--main-border-color);
    margin: 2px 4px;
}
select {
    border: none;
    margin: 0px 4px;
    padding: 3px 8px;
    border-radius: 5px;
}
input:focus-visible, input:-moz-focusring {
    outline: none;
    border-bottom: 1px solid var(--theme-main-color);
}

.cross {
    cursor: pointer;
    height: 16px;
    width: 16px;
    background-color: #e0e0e0;
    border-radius: 20px;
    background-position: center center;
    background-size: 16px auto;
    background-repeat: no-repeat;
    transition: all ease-in-out 0.10s;
    position: relative;
    left: 8px;
}
.cross:hover {
    background-color: #d0d0d0;
}
</style>
