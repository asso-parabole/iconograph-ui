<script>
    // @ts-nocheck
    import { onMount } from 'svelte';
	import TableRow from "./TableRow.svelte";
    import TableFilter from './TableFilter.svelte';
    import TablePagination from './TablePagination.svelte';
    import refreshIcon from '../assets/icons/icon-refresh.svg?url';
    import loaderIcon from '../assets/icons/loader-ring-grey.svg?url';

    export let columns = [];
    export let uri;
    export let actions = false;
    export let header = false;
    export let pagination = false;
    export let filtering = false;

    let waiting = false;
    let filters = {}
    let selected = {};
    let total = 0;
    let limit = 25;
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
        data = [];

        const filterStr = Object.keys(filters).map(k => k + '=' + encodeURIComponent(filters[k])).join('&');
        const response = await fetch(`${uri}limit=${limit}&offset=${(page - 1) * limit}&${filterStr}`,  {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const resBody = await response.json();

        console.log(resBody);
        data = resBody.data;
        total = resBody.count ? resBody.count : 0;

        selected = {};
        waiting = false;

        if (!response.ok)
            addNotification({'status': 'failure', 'message': response.status + ': ' + resBody.message})
    }

    function resetAndGetData(f = {}) {
        selected = {};
        page = 1;
        filters = f;
        getData();
    }

    onMount(() => {
        resetAndGetData()
    });

</script>

<div class="table-wrapper">
    <div>
        <div >
            <div>
                {#if header}
                <div class="hd-actions" >
                    <div>
                        <!--<input class="checkbox" type="checkbox" on:change={(e) => handleSelectAll(e)}/>--
                        <h4>{data.length} Schedules Rules</h4>-->
                        <span>{data.length} / {total} éléments </span>
                    </div>

                    <div style="display: flex; gap: 8px; align-items: center;">
                        <slot name="actionButton"></slot>
                        <button on:click={getData} class="refresh-btn" aria-label="Refresh Data" style:background-image={`url("${waiting ? loaderIcon : refreshIcon}")`}></button>
                    </div>
                </div>
                {/if}
            </div>
        </div>

        {#if filtering}
            <TableFilter columns={columns} on:filter={(e) => resetAndGetData(e.detail)}></TableFilter>
        {/if}

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
                <TableRow actions={actions} columns={columns} row={d}></TableRow>
            {/each}

            {#if waiting}
                <span style:background-image={`url("${loaderIcon}")`}>Chargement en cours</span>
            {:else if data.length == 0}
                <span>Aucune donnée disponible</span>
            {/if}

            {#if pagination && data.length > 0}
                <TablePagination bind:page={page} bind:limit={limit} bind:waiting={waiting} bind:total={total} on:pageChange={getData} on:limitChange={resetAndGetData} ></TablePagination>
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
        background-position: calc(50% - 100px) center;
        background-size: 24px auto;
        background-repeat: no-repeat;
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
        width: calc(100% - 56px);
        height: 48px;
        padding: 0px 28px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 8px;
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

    .refresh-btn {
        padding: 6px 16px;
        background-color: transparent;
        border: 1px solid var(--main-border-color);
        color: var(--theme-main-color);
        border-radius: 32px;
        font-weight: 600;
        transition: all ease-in-out 0.13s;
        background-position: center center;
        background-size: 16px auto;
        background-repeat: no-repeat;
        height: 32px;
    }
    .refresh-btn:hover {
        cursor: pointer;
        background-color: var(--theme-bg-color-light);
    }

</style>
