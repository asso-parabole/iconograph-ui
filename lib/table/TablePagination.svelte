<script>
    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher()

    export let page;
    export let limit;
    export let waiting;
    export let total;

</script>

<div class="footer-pagination" >
    <div>
        Page <input type="number" bind:value={page} onchange={() => { dispatch('pageChange', {})}} disabled={waiting}/>
        / {Math.round(total / limit)}
    </div>
    <div>
        <select bind:value={limit} onchange={() => { dispatch('limitChange', {})}} disabled={waiting} >
            {#each [5, 10, 25, 50, 100, 500] as v }
                <option value={v} selected={v == limit} >{v}</option>
            {/each}
        </select>
        / page
    </div>
</div>

<style>
    .footer-pagination {
        background-color: #f7f7f7;
        border-bottom: 1px solid #e5e5e5;
        width: calc(100% - 56px);
        height: 48px;
        padding: 0px 28px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #555;
        font-weight: 600;
        font-size: 14px;
        display: flex;
        justify-content: center;
        width: calc(100% - 56px);
    }
    .footer-pagination input[type="number"]{
        width: 50px;
        background-color: #fff;
        margin: 0px 6px;
    }
    .footer-pagination select{
        background-color: #fff;
        margin-left: 60px;
    }
    input, select {
        background-color: var(--theme-input-bg-color, #ebebed);
        height: 32px;
        border: var(--theme-input-border, none);
        border-radius: 8px;
        padding: 0px 16px;
        font-size: 14px;
        line-height: 16px;
        font-weight: 400;
        font-family: var(--theme-text-font);
        color: var(--theme-input-text-font);
        cursor: pointer;
    }
</style>