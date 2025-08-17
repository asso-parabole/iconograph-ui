<script>
    export let item;
    let isHover = false;
</script>

<li>
    <a aria-label="{item.name} tab menu" href="{item.uri}" class="menu-item {item.selected ? 'selected' : ''}"
        on:mouseenter={() => isHover = true} on:mouseleave={() => isHover = false} data-sveltekit-preload-data="off">
        <div>
            <div><!-- Lateral Color Border --></div>
            <div style="background-image: url({item.selected || isHover ? item.iconHover: item.icon})"></div>
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
        background-color: transparent;
        transition: all ease-in-out 0.17s;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
    }
    .menu-item > div > div:nth-of-type(2) {
        height: 48px;
        width: 48px;
        margin: 0px 12px;
        border-radius: 12px;
        background-size: 26px auto;
        background-position: center center;
        background-repeat: no-repeat;
        transition: all ease-in-out 0.17s;
    }

    .menu-item.selected > div > div:nth-of-type(1) {
        background-color: var(--theme-main-color);
    }
    .menu-item:hover > div > div:nth-of-type(2) {
        background-color: var(--theme-bg-color-light);
    }
</style>