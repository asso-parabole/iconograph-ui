<script>
    // @ts-nocheck

    import MenuItem from './MenuItem.svelte';

    export let isOpen = false;
    export let menu;

</script>

<nav class="{isOpen ? '' : 'hidden'}">
    <div class="logo" >
        <!-- Logo -->
    </div>

    <div class="main">
        <ul>
            {#each menu.main as item}
                <MenuItem item={item}></MenuItem>
            {/each}
        </ul>
    </div>

    <div class="bottom" >
        {#each menu.bottom as item}
            <MenuItem item={item}></MenuItem>
        {/each}
    </div>
</nav>

<style>
    nav {
        background-color: var(--main-bg-color);
        position: fixed;
        top: 0px;
        left: 0px;
        width: 85px;
        min-height: 100vh;
        max-height: 100vh;
        box-sizing: border-box;
        border-right: 1px solid var(--main-border-color);
        padding-top: 58px;
        padding-bottom: 10px;
        transition: all ease-in-out 0.4s;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 200;
    }
    nav.hidden {
        transform: translateX(0px);
    }
    nav > .logo {
        width: 40px;
        height: 40px;
        min-height: 40px;
        background-image: var(--logo-minimized);
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;
        margin-bottom: 32px;
    }

    nav > .main {
        flex: 1;
        width: 100%;
        max-height: calc(100vh - 140px - 96px);
        overflow-y: auto;
    }
    nav ul {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    nav > .bottom {
        width: 100%
    }
    nav > .bottom > div {
        height: 96px;
        width: 30px;
    }

</style>
