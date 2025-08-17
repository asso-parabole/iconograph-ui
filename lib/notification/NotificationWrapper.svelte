<script context="module">
    import Notification from "./Notification.svelte";
    import { writable } from 'svelte/store'

    export let notifications = writable([]);

    export function addNotification(notif) {
        notifications.update((n) => [...n, notif]);
    }
</script>

<div id="wrapper" >
    {#each $notifications as n}
        <Notification notification={n}></Notification>
    {/each}
</div>

<style>
#wrapper {
    position: fixed;
    bottom: 30px;
    right: 30px;
    min-width: 300px;
    min-height: 50px;
    z-index: 1000;
}
</style>