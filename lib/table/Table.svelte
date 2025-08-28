<script>
    // @ts-nocheck
    import { onMount } from 'svelte';
	import TableRow from "./TableRow.svelte";
    import TableFilter from './TableFilter.svelte';

    export let columns = [];
    export let uri;
    export let actions = false;

    let waiting = false;
    let selected = {};
    let pagination = false;
    let total = 0;
    let limit = 500;
    let page = 1;

    let data = [];

    /*
    function handleSort(sname) {
        settings.forEach(e => {
            if (e.name == sname) {
                if (e.ascending) {
                    data = [...data].sort(e.sort).reverse();
                    e.ascending = false;
                }
                else {
                    data = [...data].sort(e.sort);
                    e.ascending = true;
                }
            }
        });
    }

    function handleSelect(e, id) {
        selected[id] = e.target.checked;
    }

    function handleSelectAll(e) {
        data.forEach(e => {
            selected[e.id] = e.target.checked;
        });
    }
    */

    async function getData() {
        waiting = true;

        const response = await fetch(`${uri}?limit=${limit}&page=${page}`,  {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const resBody = await response.json();
        data = resBody.data;

        selected = {};
        waiting = false;

        if (!response.ok)
            addNotification({'status': 'failure', 'message': response.status + ': ' + resBody.message})
    }

    function resetAndGetData() {
        selected = {};
        page = 1;
        getData();
    }

    onMount(() => {
        resetAndGetData()
    });

</script>

<!--<div style="max-width: min(calc(100% - 24px), 1100px) !important;">-->
<div class="table-wrapper">
    <div>
        <!--<div >
            <div>
                {#if actions}
                <div class="hd-actions" >
                    <div>
                        <input class="checkbox" type="checkbox" on:change={(e) => handleSelectAll(e)}/>
                        <h4>{data.length} Schedules Rules</h4>
                        <span>({Object.values(selected).filter(Boolean).length} sélectionnées)</span>
                    </div>
                    <div style="display: flex; gap: 12px;">
                        <select bind:value={status} on:change={resetAndGetData} disabled={waiting} >
                            {#each statuses as option}
                                <option value={option.value}> {option.name} </option>
                            {/each}
                        </select>

                    </div>
                </div>
                {/if}
            </div>
        </div>-->

        <TableFilter columns={columns}></TableFilter>
        <div class="table-header">
            <div><div>
            {#each columns as c}
                <div style="min-width: {c.width}px; width: {c.width}px;">
                    {c.label}
                    {#if c.sort != null }
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div class="sort-icon" on:click={() => handleSort(c.field)}></div>
                    {/if}
                </div>
            {/each}
            </div></div>
        </div>

        <div class="table-body">
            {#each data as d }
            <TableRow actions={actions} columns={columns} row={d}>
            </TableRow>
            {/each}

            <!--{#if pagination && data.length > 0}
            <div class="footer-pagination" >
                <div>
                    Page <input type="number" bind:value={page} on:change={getData} disabled={waiting}/>
                    / {Math.round(total / limit)}
                </div>
                <div>
                    <select bind:value={limit} on:change={resetAndGetData} disabled={waiting} >
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="500">500</option>
                        <option value="1000">1000</option>
                    </select>
                    / page
                </div>
            </div>
            {/if}-->

            {#if data.length == 0}
                <span>Aucune donnée disponible</span>
            {/if}
        </div>
    </div>
</div>

<style>
    .table-wrapper {
        width: 100% !important;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        overflow-x: auto;
        min-width: 0;
        box-sizing: border-box;
    }
    .table-wrapper > div {
        display: inline-flex;
        flex-direction: column;
    }
    .table-wrapper .table-header {
        padding: 0px 28px;
        height: 48px;
        width: calc(100% - 56px);
        background-color: #f7f7f7;
        display: inline-flex;
        align-items: center;
        border-bottom: 1px solid #e5e5e5;
    }
    .table-wrapper .table-header > div {
        min-width: 100%;
        display: inline-flex;
        height: 100%;
    }
    .table-wrapper .table-header > div > div {
        display: inline-flex;
        align-items: center;
        height: 100%;
        background-color: #f7f7f7;
        border-bottom: 1px solid #e5e5e5;
        padding-right: 28px;
    }
    .table-wrapper .table-header > div > div > div {
        color: #333;
        font-weight: 700;
        text-transform: capitalize;
        font-size: 13px;
        padding: 0px;
        padding-right: 24px;
        display: flex;
        gap: 8px;
    }
    .table-body {
        width: 100%;
        background-color: #fff;
    }
    .table-body > span {
        display: inline-block;
        width: 100%;
        height: 96px;
        line-height: 96px;
        text-align: center;
        font-weight: 600;
        color: #aaa;
    }
    .sort-icon {
        width: 18px;
        height: 18px;
        background-image: url('/icons/icon-order.svg');
        background-size: 12px auto;
        background-repeat: no-repeat;
        background-position: center center ;
        cursor: pointer;
    }
    @media (max-width: 600px) {
        .table-wrapper {
            width: 100% !important;
            max-width: calc(100vw - 24px) !important;
        }
    }
    .checkbox {
        margin-right: 12px;
        width: 14px;
        cursor: pointer;
    }
    .hd-actions {
        background-color: #ffffff;
        border-bottom: 1px solid #e5e5e5;
        width: calc(100% - 56px);
        height: 48px;
        padding: 0px 28px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .hd-actions > div:nth-of-type(1) {
        display: flex;
    }
    .hd-actions h4 {
        color: #222;
        color: #6046c5;
        font-size: 14px;
        margin-right: 6px;
    }
    .hd-actions span {
        color: #777;
        font-weight: 600;
        font-size: 14px;
    }
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
</style>
