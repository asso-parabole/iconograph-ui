<script>
    // @ts-nocheck
	import UserSelect from "./UserSelect.svelte";
	import UserPicture from './UserPicture.svelte';

    export let name;
    export let value;

    function handleRemove() {
        value = undefined;
    }

</script>

<div id="single-select-wrapper" name={name} >
    {#if !value}
        <UserSelect uri={'/user'} bind:selected={value} ></UserSelect>
    {:else}
        <div>
            <UserPicture size={24} user={value}></UserPicture>
            <span>{value.firstname} {value.lastname}</span>
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div on:click={handleRemove}>+</div>
        </div>
    {/if}
</div>

<style>
#single-select-wrapper {
    display: flex;
    width: 100%;
}
#single-select-wrapper > div {
    display: flex;
    align-items: center;
    background-color: var(--theme-input-bg-color, #ebebed);
    height: var(--theme-input-height, 40px);
    border: var(--theme-input-border, none);
    border-radius: 8px;
    padding: 0px 16px;
    font-size: 14px;
    line-height: 16px;
    font-weight: 400;
    font-family: var(--theme-text-font);
    color: var(--theme-input-text-font);
    flex: 1;
}
#single-select-wrapper > div > span {
    font-size: 14px;
    line-height: 16px;
    font-weight: 400;
    font-family: var(--theme-text-font);
    color: var(--theme-input-text-color);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-left: 8px;
    flex: 1;
}
#single-select-wrapper > div > div:nth-of-type(2) {
    cursor: pointer;
    margin-left: 8px;
    height: 16px;
    width: 16px;
    min-width: 16px;
    background-color: #ddd;
    border-radius: 20px;
    font-weight: 600;
    text-align: center;
    line-height: 16px;
    color: #777;
    transform: rotate(45deg);
    transition: all ease-in-out 0.14s;
}
#single-select-wrapper > div > div:nth-of-type(2):hover {
    background-color: #ccc;
}

</style>