<script>
// @ts-nocheck
    import { page } from '$app/stores';
    import { afterUpdate } from 'svelte';

    import NotificationWrapper from '$lib/iconograph-ui/notification/NotificationWrapper.svelte';
    import MainMenu from "$lib/iconograph-ui/navigation/MainMenu.svelte";

    let current_url = $page.url.pathname.split('/');

    afterUpdate(() => {
        current_url = $page.url.pathname.split('/');
    });

    let isMenuOpen = false;

    let menu = {
        logo: "",
        main: [
            { name: 'Home', uri: '', icon: '/icons/icon-calendar-g.png', iconHover: '/icons/icon-calendar-v.png', selected: current_url[1] == ''},
            { name: 'Home', uri: '', icon: '/icons/icon-calendar-g.png', iconHover: '/icons/icon-calendar-v.png', selected: current_url[1] == '1' },
            { name: 'Home', uri: '', icon: '/icons/icon-calendar-g.png', iconHover: '/icons/icon-calendar-v.png', selected: current_url[1] == '1' },
            { name: 'Home', uri: '', icon: '/icons/icon-calendar-g.png', iconHover: '/icons/icon-calendar-v.png', selected: current_url[1] == '1' },
        ],
    };

</script>

<MainMenu menu={menu} isOpen={isMenuOpen} ></MainMenu>

<div id="main-container" class="{isMenuOpen ? 'menu-open' : ''}" >
    <div style="display: contents">

        <slot />

    </div>
</div>

<NotificationWrapper></NotificationWrapper>

<style>
#main-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    left: 85px;
    width: calc(100% - 85px);
    transition: 0.3s all ease-in-out;
    padding-bottom: 48px;
}
#main-container.menu-open {
    width: calc(100% - 300px);
    left: 300px;
}


#main-container section > article {
    width: calc(100% - 48px);
    max-width: min(calc(100% - 24px), 1100px) !important;
    margin-bottom: 30px;
    padding: 24px 24px;
    background-color: #ffffff;
    box-sizing: border-box;
    border: 1px solid #e4e4e4;
    border-radius: 8px;
}

@media (max-width: 1040px) {
    #main-container.menu-open > section {
        width: 100%;
        min-width: 300px;
    }
    nav {
        z-index: 50;
    }
    #main-container.menu-open section > article {
        width: calc(100% - 88px);
    }
}

@media (max-width: 780px) {
    #main-container {
        left: 0px;
        margin-top: 0px;
    }
    #main-container.menu-open {
        width: 100vw;
        left: 0px;
    }
    article {
        width: calc(100% - 88px);
        margin-bottom: 30px;
        padding: 24px 24px;
    }
    #main-container section > article {
        width: calc(100% - 88px);
    }
}
</style>

