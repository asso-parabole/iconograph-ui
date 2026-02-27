<script>
// @ts-nocheck

    import NotificationWrapper from '$lib/iconograph-ui/notification/NotificationWrapper.svelte';
    import MainMenu from "$lib/iconograph-ui/navigation/MainMenu.svelte";

    let isMenuOpen = false;

    let menu = {
        logo: "",
        main: [
            { name: 'Dashboard', uri: '/parabole', icon: '/icons/icon-dashboard.svg', iconHover: '/icons/icon-dashboard.svg'},
            { name: 'Projets', uri: '/user', icon: '/icons/icon-project.svg', iconHover: '/icons/icon-project.svg'},
            { name: 'Bénéficiaires', uri: '/', icon: '/icons/icon-user.svg', iconHover: '/icons/icon-user.svg'},
            { name: 'Home', uri: '/', icon: '/icons/icon-doc.svg', iconHover: '/icons/icon-doc.svg'},
        ],
        bottom: [
            { name: 'Home', uri: '/', icon: '/icons/icon-doc.svg', iconHover: '/icons/icon-doc.svg'},
        ]
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

:root {
    --background-color: #fcfcfc;
    --main-bg-color: #ffffff;
    --main-border-color: #e4e4e4;
    --main-border: 0px solid #e4e4e4;
    --button-border-color: #e1e1e1;

    --disabled-background-color: #555555;

    /** Theme */
    --theme-main-color: #0e2c12;
    --theme-main-color-hover: #1e1e1e;
    --theme-bg-color-light: #6046c511;
    --theme-text-font: 'Montserrat';
    --theme-title-font: 'Montserrat';
    --theme-text-darkgrey: #555555;

    /** Menu */
    --main-menu-bg-color: #121212;
    --main-menu-hb-color: #555;
    --main-menu-fg-color: #ffffff;
    --main-menu-bg-hover-color: #1e1e1e;
    --main-menu-font-weight: 700;
    --main-menu-font-size: 15px;

    /** Inputs */
    --theme-input-bg-color: #f7f7f9;
    --theme-input-bg-highlight: #efeff5;
    --theme-input-bg-hover: #f2f2f2;
    --theme-input-border: none; /*2px solid ebebed*/
    --theme-input-outline: 2px solid var(--theme-main-color);
    --theme-input-outline-offset: 2px;
    --theme-input-border-failure: 2px solid #f95959;
    --theme-input-height: 40px;
    --theme-input-text-color: #121212;

    /** Icons */
    --logo-minimized: url('/favicon.svg');
    --logo-large: url('/logo.svg');

    /** Shadows */
    --button-box-shadow: #77777733 0px 0px 0px 0px !important;
    --button-hover-box-shadow: #77777733 0px 0px 0px 0px !important;
    --main-shadow: #00000012 0 0 8px;

    /** Fonts */
    --theme-main-font: 'Montserrat';
}
</style>

