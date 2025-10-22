<script>
    // @ts-nocheck

    import MenuItem from './MenuItem.svelte';

    export let isOpen = false;
    export let menu;

</script>

<nav class="{isOpen ? 'menu-open' : ''}">
    <header>
        <div class="{isOpen ? 'menu-open' : ''}" >
            <div on:click={() => isOpen = !isOpen}>
                <div></div><div></div><div></div>
            </div>
        </div>
    </header>

    <div class="logo" >
        <!-- Logo -->
    </div>

    <div class="main">
        <ul>
            {#each menu.main as item}
                <MenuItem item={item} isOpen={isOpen}></MenuItem>
            {/each}
        </ul>
    </div>

    <div class="bottom" >
        {#each menu.bottom as item}
            <MenuItem item={item} isOpen={isOpen} ></MenuItem>
        {/each}
    </div>
</nav>

<style>
    header {
        background-color: transparent;
        height: 36px;
        padding: 14px;
        position: absolute;
        top: 10px;
        right: -11px;
        z-index: 300;
    }
    header > div {
        position: absolute;
        top: 10px;
        left: 0px;
        width: 32px;
        height: 32px;
        border-radius: 30px;
        cursor: pointer;
        background-color: #fff;
        border: 1px solid var(--main-border-color);
        transition: all ease-in-out 0.3s;
        align-self: flex-end;
    }
    header > div > div {
        position: relative;
        top: -4px;
        left: -2px;
        width: 32px;
        height: 32px;
    }
    header > div.menu-open {
        background-color: #fff;
        box-shadow: inset;
    }
    header > div > div > div{
        display: inline-block;
        position: absolute;
        vertical-align: top;
        background-color: #333;
        border-radius: 0px;
        height: 2px;
        width: 16px;
        transition: all 0.3s;
        border-radius: 0px;
    }
    header > div > div > div:nth-of-type(1){
        top: 15px;
        left: 10px;
    }
    header > div > div > div:nth-of-type(2){
        top: 20px;
        left: 10px;
    }
    header > div > div > div:nth-of-type(3){
        top: 24px;
        left: 10px;
    }
    header > div.menu-open > div > div:nth-of-type(1){
        top: 20px;
        transform: rotate(45deg);
    }
    header > div.menu-open > div > div:nth-of-type(2){
        display: none;
    }
    header > div.menu-open > div > div:nth-of-type(3){
        top: 20px;
        transform: rotate(-45deg);
    }
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
        align-items: flex-start;
        z-index: 200;
    }
    nav.menu-open {
        transform: translateX(0px);
        width: 285px;
    }
    nav > .logo {
        width: 48px;
        height: 40px;
        min-height: 40px;
        background-image: var(--logo-minimized);
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;
        margin-bottom: 32px;
        margin-left: 17px;
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


    @media (max-width: 780px) {
        nav{
            transform: translateX(-85px);
        }
        nav.menu-open {
            transform: translateX(0px);
            width: 285px;
        }
        header {
            top: 10px;
            right: initial;
            left: 105px;
        }
        nav.menu-open > header {
            left: 20px;
        }
        header > div {
            border: none;
        }
    }

</style>
