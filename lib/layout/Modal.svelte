<script>
    import Portal from 'svelte-portal';

    export let open = true;

    function handleClose() {
        open = false;
    }
</script>

{#if open}

<Portal target="body" >
    <div id="bgk" class="{!open ? 'hidden' : ''}">
        <div class="container">
            <div on:click|stopPropagation|preventDefault={handleClose} class="croix">+</div>

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
    left: 0px;
    width: 100vw;
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
    min-width: 300px;
    min-height: 200px;
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
.croix {
    cursor: pointer;
    margin-left: 8px;
    height: 24px;
    width: 24px;
    min-width: 24px;
    background-color: #ddd;
    border-radius: 20px;
    font-weight: 600;
    font-size: 20px;
    text-align: center;
    line-height: 24px;
    color: #777;
    transform: rotate(45deg);
    transition: all ease-in-out 0.14s;
    position: absolute;
    top: 8px;
    right: 8px;
}
.croix:hover {
    background-color: #ccc;
}
</style>