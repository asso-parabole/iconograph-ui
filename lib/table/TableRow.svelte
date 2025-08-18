<script>
    export let actions;
    export let columns;
    export let row;
</script>

<div class="wrapper">
    {#if actions}
        <input class="checkbox" type="checkbox" on:change={(e) => handleSelect(e, row.id)} checked={selected[row.id]}/>
    {/if}
    <div class="row">
        {#each columns as c}
            <div style="min-width: {c.width}px; width: {c.width}px;">
                {#if c.component}
                    <svelte:component this={c.component} {...c.props} {...{ [c.field]: row[c.field], ...row }}/>
                {:else}
                    <span>{row[c.field]}</span>
                {/if}
            </div>
        {/each}
    </div>
</div>

<style>
.wrapper {
    display: inline-flex;
    min-width: calc(100% - 56px);
    border-bottom: 1px solid #e5e5e5;
    padding: 0px 28px;
    height: 48px;
}
.row {
    height: 100%;
    display: inline-flex;
    align-items: center;
}
.row > div {
    margin-right: 24px;
    display: flex;
    align-items: center;
}
span {
    display: inline-block;
    height: max-content;
    line-height: 18px;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 13px;
    font-weight: 500;
    color: #777;
    font-family: "Roboto", serif;
    margin-top: 1px;
}
</style>