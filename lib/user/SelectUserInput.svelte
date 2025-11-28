<script>
    // @ts-nocheck
	import UserPicture from './UserPicture.svelte';
    import SearchSelect from "../inputs/SearchSelect.svelte";
    import crossIcon from '../assets/icons/icon-close-cross.svg?url';

    export let name;
    export let value = null;
    export let multiple = false;
    export let parentId = null;
    export let userType = "*";

    let uri = `/user?userType=${userType}`
    if (parentId)
        uri = `${uri}&parentId=${parentId}`

    if (multiple && !value)
        value = [];

    function handleRemove(id) {
        if (multiple)
            value = value.filter(v => v.id != id);
        else
            value = undefined;
    }

    function handleSelect(e) {
        value.push(e.detail.el);
        value = value;
        console.log(value);
    }

</script>

{#if multiple}
    <div id="multiple-select-wrapper" name={name} >
        {#each value as v}
            <div>
                <div class="user-label">
                    <UserPicture size={24} user={v}></UserPicture>
                    <a href={`/user/${v.id}`} data-sveltekit-preload-data="off">
                        <span>{v.firstname} {v.lastname}</span>
                    </a>
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div on:click={() => handleRemove(v.id)} class="cross" style:background-image={`url("${crossIcon}")`}></div>
                </div>
            </div>
        {/each}
        <div>
            <SearchSelect uri={`${uri}&`} on:selectResult={handleSelect} type={'user'}></SearchSelect>
        </div>
    </div>
{:else}
    <div id="single-select-wrapper" name={name} >
        {#if !value}
            <SearchSelect uri={`${uri}&`} bind:selected={value} type={'user'}></SearchSelect>
        {:else}
            <div class="user-label">
                <UserPicture size={24} user={value}></UserPicture>
                <a href={`/user/${value.id}`} data-sveltekit-preload-data="off">
                    <span>{value.firstname} {value.lastname}</span>
                </a>
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div on:click={handleRemove} class="cross" style:background-image={`url("${crossIcon}")`}></div>
            </div>
        {/if}
    </div>
{/if}

<style>
#multiple-select-wrapper {
    display: inline-flex;
    gap: 8px;
    width: calc(100% - 16px);
    background-color: var(--theme-input-bg-color, #ebebed);
    padding: 8px;
    border-radius: 8px;
    flex-wrap: wrap;
}
#single-select-wrapper {
    display: flex;
    width: 100%;
}
.user-label {
    display: flex;
    align-items: center;
    background-color: #ffffff;
    height: calc(var(--theme-input-height, 40px) - 2px);
    border: 1px solid #e4e4e4;
    border-radius: 8px;
    padding: 0px 16px;
    font-size: 14px;
    line-height: 16px;
    font-weight: 400;
    font-family: var(--theme-text-font);
    color: var(--theme-input-text-font);
    flex: 1;
}
.user-label span {
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
.user-label a, .user-label span {
    flex: 1;
}
.cross {
    cursor: pointer;
    height: 16px;
    width: 16px;
    background-color: #e0e0e0;
    border-radius: 20px;
    background-position: center center;
    background-size: 16px auto;
    background-repeat: no-repeat;
    transition: all ease-in-out 0.10s;
    position: relative;
    left: 8px;
}
.cross:hover {
    background-color: #d0d0d0;
}

</style>