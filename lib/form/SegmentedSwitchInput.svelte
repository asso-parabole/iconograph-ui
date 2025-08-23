<script>

    export let options = [];
    export let selected;

    function select(e) {
        selected = e;
    }
</script>

<div class={`segmented-container`}>
    {#each options as opt, idx}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="segment {opt === selected ? 'selected' : ''}" on:click={() => select(opt)}>
            <div>{opt}</div>
        </div>
    {/each}
</div>

<style>
.segmented-container {
    display: inline-flex;
    overflow: hidden;
    background-color: var(--theme-input-bg-color, #ebebed);
    height: var(--theme-input-height, 40px);
    border: var(--theme-input-border, none);
    border-radius: 50px;
    padding: 0px;
}
.segment {
    padding: 0px 16px;
    margin: 3px;
    cursor: pointer;
    border-radius: 50px;
    border: none;
    display: flex;
    align-items: center;
    text-align: center;
    background: transparent;
    transition: all 0.2s, color 0.2s;
    font-size: 14px;
    line-height: 16px;
    font-weight: 500;
    font-family: var(--theme-text-font);
    color: var(--theme-input-text-font);
}
.segment:not(:last-of-type) {
    margin-right: 0px
}
.segment:not(:first-of-type) {
    margin-left: 0px
}
.segment.selected {
    background: var(--theme-main-color);
    color: white;
}
.segment.disabled {
    background: #e0e0e0;
    color: #888;
    cursor: not-allowed;
}
</style>
