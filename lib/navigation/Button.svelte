<script>
    import loaderIcon from '../assets/icons/loader-ring-grey.svg?url';

    export let label;
    export let url;
    export let clickEvent;
    export let waiting = false;
    export let style = null;
    export let icon = null;
</script>

{#if waiting}
    <button class="waiting" style:background-image={`url("${loaderIcon}")`}>
        {label}
    </button>
{:else}
    {#if clickEvent}
        <!-- Hide icon if icon == null -->
        <button on:click|stopPropagation={clickEvent} class="{style} {icon ? 'icon' : ''}"
            style={ loaderIcon ? { backgroundImage: `url("${loaderIcon}")` } : {} }
        >
            {label}
        </button>
    {:else}
        <a href={url} class="{style} {icon ? 'icon' : ''}" style:background-image={`url("${icon}")`}>
            {label}
        </a>
    {/if}
{/if}

<style>
a, button {
    min-width: 100px;
    display: inline-block;
    background-color: var(--theme-main-color);
    color: #ffffff !important;
    box-shadow: var(--button-box-shadow);
    border: 1px solid var(--theme-main-color);
    border-radius: 7px;
    height: 30px;
    line-height: 30px !important;
    font-size: 13px;
    text-decoration: none;
    text-align: center;
    font-family: var(--theme-main-font);
    font-weight: 700;
    text-transform: uppercase;
    cursor: pointer;
    padding: 0px 20px;
    transition: all ease-in-out 0.17s;
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
a:hover, button:hover {
    background-color: var(--theme-main-color-hover);
}
.waiting:hover {
    background-color: #ddd
}
a:active {
    background-color: var(--theme-main-color-hover);
    position: relative;
    top: 1px;
}
a:disabled {
    background-color: var(--disabled-background-color) !important;
}
.outline {
    background-color: transparent;
    color: var(--theme-main-color) !important;
}
.outline:hover {
    background-color: var(--theme-main-color);
    color: #ffffff !important;
}
.icon {
    background-repeat: no-repeat;
    background-position: 12px center;
    background-size: 18px;
    padding-left: 36px;
}
.min {
    min-width: 30px;
    border: 1px solid var(--theme-main-color);
    padding: 0px 0px;
    background-position: center center;
    background-size: 18px;
    padding-left: 0px;
}
.disabled {
    background-color: #eee;
    color: #888 !important;
    border: 1px solid #eee;
    cursor: not-allowed;
}
.disabled:hover {
    background-color: #eee;
    color: #888 !important;
    border: 1px solid #eee;
    cursor: not-allowed;
}
</style>