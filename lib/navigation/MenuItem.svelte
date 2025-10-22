<script>
    export let item;
    export let isOpen = false;
    let isHover = false;
</script>

<li>
    <a aria-label="{item.name} tab menu" href="{item.uri}" class="menu-item {item.selected ? 'selected' : ''}"
        on:mouseenter={() => isHover = true} on:mouseleave={() => isHover = false} data-sveltekit-preload-data="off">
        <div class="{isOpen ? 'menu-open' : ''}">
            <div><!-- Lateral Color Border --></div>
            <div style="background-image: url({item.selected || isHover ? item.iconHover: item.icon})">
                {item.name}
            </div>
        </div>
    </a>
</li>

<style>
    li {
        list-style: none;
        width: 100%;
        margin-bottom: 14px;
    }

    .menu-item {
        display: inline-block;
        width: 100%;
        height: 48px;
        padding: 0px;
        transition: all ease-in-out 0.17s;
    }
    .menu-item:hover, .menu-item.selected {
        color: #efefef;
        border-left-color: var(--theme-main-color);
    }
    .menu-item > div {
        height: 100%;
        display: flex;
    }

    .menu-item > div > div:nth-of-type(1) {
        height: 100%;
        width: 5px;
        min-width: 5px;
        background-color: transparent;
        transition: all linear 0.17s;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
    }
    .menu-item > div > div:nth-of-type(2) {
        height: 48px;
        width: 0px;
        margin: 0px 12px;
        border-radius: 12px;
        background-size: 26px auto;
        background-position: 11px center;
        background-repeat: no-repeat;
        transition: all linear 0.17s;
        line-height: 48px;
        padding-left: 48px;
        overflow-x: hidden;
        font-weight: 600;
        color: var(--theme-text-darkgrey);
        font-family: var(--theme-title-font);
    }
    .menu-item > div.menu-open > div:nth-of-type(2) {
        height: 48px;
        width: 200px;
        display: flex;
    }
    .menu-item.selected > div > div:nth-of-type(1) {
        background-color: var(--theme-main-color);
    }
    .menu-item.selected > div > div:nth-of-type(2) {
        color: var(--theme-main-color);
    }
    .menu-item:hover > div > div:nth-of-type(2) {
        background-color: var(--theme-bg-color-light);
        color: var(--theme-main-color);
    }
</style>