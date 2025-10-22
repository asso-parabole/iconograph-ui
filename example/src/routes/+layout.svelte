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

<MainMenu menu={menu} bind:isOpen={isMenuOpen} ></MainMenu>

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
/* TODO: Integrate as a component
#main-container.menu-open {
    width: calc(100% - 285px);
    left: 285px;
}
*/

@media (max-width: 780px) {
    #main-container {
        left: 0px;
        width: 100%;
        margin-top: 0px;
    }
}
</style>

