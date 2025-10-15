<script>
    // @ts-nocheck
	import UserSelect from "./UserSelect.svelte";
	import UserPicture from './UserPicture.svelte';

    export let name;
    export let value = null;
    export let multiple = false;

    if (multiple && !value)
        value = [];

    function handleRemove(id) {
        if (multiple)
            value = value.filter(v => v.id != id);
        else
            value = undefined;
    }

    function handleSelect(e) {
        value.push(e.detail.user);
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
                    <a href={`/user/${v.id}`}>
                        <span>{v.firstname} {v.lastname}</span>
                    </a>
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <div on:click={() => handleRemove(v.id)}>+</div>
                </div>
            </div>
        {/each}
        <div>
            <UserSelect uri={'/user'} on:selectUser={handleSelect}></UserSelect>
        </div>
    </div>
{:else}
    <div id="single-select-wrapper" name={name} >
        {#if !value}
            <UserSelect uri={'/user'} bind:selected={value} ></UserSelect>
        {:else}
            <div class="user-label">
                <UserPicture size={24} user={value}></UserPicture>
                <a href={`/user/${value.id}`}>
                    <span>{value.firstname} {value.lastname}</span>
                </a>
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div on:click={handleRemove}>+</div>
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
.user-label > div:nth-of-type(2) {
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
.user-label > div:nth-of-type(2):hover {
    background-color: #ccc;
}

</style>