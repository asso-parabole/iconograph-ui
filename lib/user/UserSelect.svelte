<script>
    // @ts-nocheck
    import { createEventDispatcher } from 'svelte';
    import {clickOutside} from './../utils/clickOutside.js';
	import UserPicture from './UserPicture.svelte';

	const dispatch = createEventDispatcher();

    function handleUserSelection(uid) {
        isOpen = false;
        inputFilter = null;
        filteredUsers = users;

        dispatch('selectUser', {
			id: uid
		});
    }

    function handleFilter() {
        filteredUsers = users.filter((user) => {
            let str = (user.firstname + ' ' + user.lastname).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            const inputStr = inputFilter.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            return (typeFilter == null || user.type.value == typeFilter) && str.includes(inputStr);
        });
    }

    export let users = []
    export let typeFilter = null;

    let inputFilter;
    let filteredUsers = users.filter((user) => {
        return (typeFilter == null || user.type.value == typeFilter);
    });
    let isOpen = false;
</script>

<div id="user-select-wrapper" use:clickOutside on:click_outside={() => {isOpen = false}}>
    <div>
        <input type="text" bind:value={inputFilter} on:keyup={handleFilter} on:focus={() => (isOpen = !isOpen)} placeholder="Ajouter un utilisateur"/>
    </div>
    {#if isOpen}
        <div>
        {#each filteredUsers as user}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div on:click|stopPropagation|preventDefault={handleUserSelection(user.id)}>
                <UserPicture user={user} size={24}></UserPicture>
                <span>{user.firstname} {user.lastname}</span>
            </div>
        {/each}
        </div>
    {/if}
</div>

<style>
input {
    border: none
}
#user-select-wrapper {
    background-color: #f5f5fb;
    border-radius: 6px;
    padding: 2px 0px;
    transition: 0.3s ease-in-out all;
    width: 220px;
    position: relative;
    z-index: 100;
}
#user-select-wrapper > div:nth-of-type(1) {
    background-image: url('/icons/icon-user-add.svg');
    background-size: 20px auto;
    background-repeat: no-repeat;
    background-position: left center;
    margin-right: 6px;
    margin-left: 12px;
    padding-left: 24px;
}
#user-select-wrapper > div:nth-of-type(1) > input{
    background-color: #f5f5fb;
    border-radius: 0px;
    padding: 4px 6px;
    height: 20px;
    font-size: 14px;
    font-weight: 500;
    color: #333;
    cursor: pointer;
    width: calc(100% - 12px);
}
#user-select-wrapper > div:nth-of-type(1) > input:focus{
    cursor: initial;
}
#user-select-wrapper > div:nth-of-type(1) > input::placeholder {
    color: #777;
}
#user-select-wrapper > div:nth-of-type(2) {
    display: flex;
    flex-direction: column;
    padding-bottom: 8px;
    background-color: #f5f5fb;
    width: 220px;
    z-index: 1000;
}
#user-select-wrapper > div:nth-of-type(2) > div {
    padding: 4px 12px;
    flex: 1;
    display: flex;
    align-items: center;
}
#user-select-wrapper > div:nth-of-type(2) > div > span {
    color: #333;
    font-weight: 600;
    cursor: pointer;
    margin-left: 8px;
}
#user-select-wrapper > div:nth-of-type(2) > div:hover {
    background-color: #eee;
}
</style>