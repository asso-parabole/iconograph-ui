<script>
    import Input from "../form/Input.svelte";
    import visibleIcon from '../assets/icons/icon-visible.svg?url';

    export let name;
    export let value;
    export let required = false;

    let hidden = true;
</script>

<div class="wrapper">
    <div>
        <Input type="{hidden ? 'password' : 'text'}" name={name} bind:value={value} {required}/>
    </div>

    <div class="eyes" on:click={() => hidden = !hidden} style:background-image={`url("${visibleIcon}")`}></div>
</div>

<style>
.wrapper {
    position: relative;
    display: flex;
}
.wrapper > div:first-of-type {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.eyes {
    width: 28px;
    height: 28px;
    position: absolute;
    right: 6px;
    top: 6px;
    border-radius: 30px;
    background-size: 20px auto;
    background-repeat: no-repeat;
    background-position: center;
    transition: all ease-in-out 0.17s;
    cursor: pointer;
    background-color: transparent;
}
.eyes:hover {
    background-color: var(--theme-input-bg-hover);
}

</style>
