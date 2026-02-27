<script>
    // @ts-nocheck
    import { page } from '$app/stores';
    import { afterUpdate } from 'svelte';

    import MenuItem from './MenuItem.svelte';

    export let isOpen = false;
    export let menu;

    let current_url = $page.url.pathname.split('/');

    afterUpdate(() => {
        current_url = $page.url.pathname.split('/');
        current_url = '/' + current_url[1];

        console.log(current_url);
    });

</script>

<nav class="{isOpen ? 'menu-open' : ''}">
    <header>
        <div class="{isOpen ? 'menu-open' : ''}" >
            <div on:click={() => isOpen = !isOpen}>
                <div></div><div></div><div></div>
            </div>
        </div>
    </header>

    {#if menu.logo != null}
        <div class="logo" >
        </div>
    {:else}
        <div><h1>Bienvenue</h1></div>
    {/if}

    <div class="main">
        <ul>
            {#each menu.main as item}
                <link rel="preload" as="image" href={item.iconHover}>
                <MenuItem item={item} isOpen={isOpen} selected={current_url == item.uri}></MenuItem>
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
        /*right: -11px;*/
        left: 20px;
        z-index: 300;
        margin-bottom: 12px;
    }
    header > div {
        position: absolute;
        top: 16px;
        left: 0px;
        width: 32px;
        height: 32px;
        border-radius: 30px;
        cursor: pointer;
        /*background-color: var(--main-menu-bg-color, #ffffff);
        border: 1px solid var(--main-border-color);*/
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
        /*background-color: var(--main-menu-bg-color, #ffffff);*/
        box-shadow: inset;
    }
    header > div > div > div{
        display: inline-block;
        position: absolute;
        vertical-align: top;
        background-color: #555;
        border-radius: 0px;
        height: 3px;
        width: 25px;
        transition: all 0.3s;
        border-radius: 0px;
    }
    header > div > div > div:nth-of-type(1){
        top: 12px;
        left: 10px;
    }
    header > div > div > div:nth-of-type(2){
        top: 20px;
        left: 10px;
    }
    header > div > div > div:nth-of-type(3){
        top: 28px;
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
        background-color: var(--main-menu-bg-color, #ffffff);
        position: fixed;
        top: 0px;
        left: 0px;
        width: 85px;
        min-height: 100vh;
        max-height: 100vh;
        box-sizing: border-box;
        border-right: 1px solid var(--main-border-color);
        padding-top: 80px;
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
            position: fixed;
            top: 10px;
            right: initial;
            left: 105px;
            transform: translateX(0px);
            transition: all ease-in-out 0.4s;
        }
        nav.menu-open > header {
            transform: translateX(-85px);
        }
        header > div {
            border: none;
        }
    }

</style>
