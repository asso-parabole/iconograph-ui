<script>
    export let tabs;
    export let currentTab;
</script>

<aside class="horizontal-navbar">
    {#each Object.keys(tabs) as key}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div on:click={() => {currentTab = key}} class="{currentTab == key ? 'selected' : ''}">
            {tabs[key]}
        </div>
    {/each}
</aside>

<style>
    .horizontal-navbar {
        width: 100%;
        margin: 0px !important;
        padding: 0px !important;
        border-bottom: 0px !important;
        overflow: auto;
        display: flex;
    }
    .horizontal-navbar > div {
        font-family: var(--theme-title-font);
        font-weight: 700;
        color: var(--theme-text-darkgrey);
        font-size: 14px;
        padding: 8px 24px;
        transition: all ease-in-out 0.17s;
        border-bottom: 4px solid transparent;
        text-wrap: nowrap;
        white-space: nowrap;
    }
    .horizontal-navbar > div:hover {
        color: var(--theme-main-color);
        cursor: pointer;
    }
    .horizontal-navbar > div.selected {
        color: var(--theme-main-color);
        border-bottom: 4px solid var(--theme-main-color);
    }
</style>