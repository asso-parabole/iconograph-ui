<script>
    import loaderIcon from '../assets/icons/loader-ring-grey.svg?url';

    export let button;
    export let clickEvent;
    export let waiting = false;
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
{#if waiting}
    <div class="button waiting" style:background-image={`url("${loaderIcon}")`}>
        {button.label}
    </div>
{:else}
    <div class="button" on:click|preventDefault|stopPropagation={clickEvent}> <!-- Prevent button default submit event when pressing enter-->
        {button.label}
    </div>
{/if}

<style>
.button {
    min-width: 100px;
    display: inline-block;
    background-color: var(--theme-main-color);
    color: #ffffff !important;
    /*box-shadow: #000000a0 0px 1px 3px 0px !important;*/
    border-radius: 8px;
    height: 34px;
    line-height: 34px !important;
    font-size: 13px;
    text-decoration: none;
    text-align: center;
    font-family: var(--theme-main-font);
    font-weight: 700;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    padding: 0px 20px;
    margin-top: 12px;
}
.button:hover {
    background-color: var(--theme-main-color-hover);
}
.button:active {
    background-color: var(--theme-main-color-hover);
    position: relative;
    top: 1px;
}
.button:disabled {
    background-color: var(--disabled-background-color) !important;
}
.waiting {
    background-repeat: no-repeat;
    background-position: 12px center;
    background-size: 20px;
    padding-left: 40px;
    background-color: #eee;
    color: #888 !important;
    cursor: not-allowed;
}
.waiting:hover {
    background-color: #ddd
}
</style>