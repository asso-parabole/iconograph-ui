<script>
    import crossIcon from '../assets/icons/icon-close-cross.svg?url';
    import Portal from 'svelte-portal';

    export let open = true;
    export let target = "body"

    function handleClose() {
        open = false;
    }
</script>

{#if open}

<Portal target="#main-container" >
    <div id="bgk" class="{!open ? 'hidden' : ''}">
        <div class="container">
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <div on:click|stopPropagation|preventDefault={handleClose} class="cross" style:background-image={`url("${crossIcon}")`}></div>

            <slot></slot>

        </div>
    </div>
</Portal>

{/if}

<style>

#bgk {
    position: fixed;
    z-index: 100;
    top: 0px;
    left: 84px;
    width: calc(100vw - 84px);
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all ease-in-out 0.35s;
    @starting-style {
        opacity: 0;
    }
}
#bgk.hidden {
    opacity: 0;
    @starting-style {
        opacity: 1;
    }
}
#bgk .container {
    max-width: calc(100% - 48px);
    max-height: calc(100vh - 48px);
    min-width: 400px;
    min-height: 280px;
    background-color: var(--main-bg-color);
    box-sizing: border-box;
    border-radius: 16px;
    overflow: auto;
    position: relative;
    top: 0vh;
    transition: all ease-in-out 0.3s;
    @starting-style {
        top: -300px;
    }
}
#bgk.hidden .container {
    top: -300px;
    @starting-style {
        top: 0vh;
    }
}
.cross {
    cursor: pointer;
    margin-left: 8px;
    height: 24px;
    width: 24px;
    min-width: 24px;
    background-color: #e0e0e0;
    border-radius: 20px;
    background-position: center center;
    background-size: 24px auto;
    background-repeat: no-repeat;
    transition: all ease-in-out 0.10s;
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 1000;
}
.cross:hover {
    background-color: #d0d0d0;
}

@media (max-width: 780px) {
    #bgk {
        top: 0px;
        left: 0px;
        width: calc(100vw - 0px);
        height: 100vh;
    }
    #bgk .container {
        max-width: calc(100% - 0px);
        max-height: calc(100vh - 0px);
        height: 100%;
        border-radius: 0px;
        padding-top: 24px;
        padding: 12px;
    }

    .cross {
        position: fixed;
        top: 24px;
        right: 24px;
    }
}
</style>