<script>
    // @ts-nocheck
    import { createEventDispatcher } from 'svelte';
	import UserSelect from "./UserSelect.svelte";
	import UserPicture from './UserPicture.svelte';

    const dispatch = createEventDispatcher();

    export let users = [];
    export let typeFilter = null;
    export let selected = false;
    export let selectedUser = null;

    function handleUserSelection(e) {
        selectedUser = users.filter((user) => {
            return user.id == e.detail.id;
        }).at(-1);
        selected = true;

        dispatch('selectUser', {
			id: e.detail.id
		});
    }

    function handleRemove() {
        selected = false;
        selectedUser = null;

        dispatch('selectUser', {
			id: null
		});
    }
</script>

<div id="single-select-wrapper">
    {#if !selected}
        <UserSelect on:selectUser={handleUserSelection} users={users} typeFilter={typeFilter}></UserSelect>
    {:else}
        <div>
            <UserPicture size={24} user={selectedUser}></UserPicture>
            <span>{selectedUser.firstname} {selectedUser.lastname}</span>
            <div on:click={handleRemove}>+</div>
        </div>
    {/if}
</div>

<style>
#single-select-wrapper {
    display: flex;
    position: relative;
    z-index: 1000;
}
#single-select-wrapper > div {
    background-color: #f5f5fb;
    border-radius: 6px;
    width: inherit;
    transition: 0.3s ease-in-out all;
    display: flex;
    height: 34px;
    align-items: center;
    padding-left: 12px;
}
#single-select-wrapper > div > span {
    color: #333;
    font-weight: 600;
    max-width: 125px;
    flex: 1;
    margin-left: 8px;
    margin-right: 8px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
#single-select-wrapper > div > div:nth-of-type(2) {
    cursor: pointer;
    margin-right: 12px;
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
}

</style>