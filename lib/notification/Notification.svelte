<script>
    import failureIcon from '$lib/iconograph-ui/assets/icons/icon-failure.svg?url';
    import successIcon from '$lib/iconograph-ui/assets/icons/icon-success.svg?url';
    export let notification;

    let hidden = false;
    let icon = notification.status === 'failure' ? failureIcon : successIcon;

    setTimeout(() => {
        hidden = true;
    }, 10000);

</script>

<div class="notif {hidden ? 'hidden' : ''}">
    <div class="{notification.status}"
        style:background-image={`url("${icon}")`} >
    </div>
    <div>
        {@html notification.message}
    </div>
    <button on:click={() => hidden = true}>
        +
    </button>
</div>

{#if false} <a href="/">Fake</a> {/if}

<style>
.notif {
    display: flex;
    background-color: #ffffff;
    border-radius: 8px;
    padding: 12px 12px;
    margin-top: 12px;
    font-size: 12px;
    font-weight: 600;
    box-sizing: border-box;
    border: 1px solid #e4e4e4;
    box-shadow: #00000028 0 0px 8px;
    align-items: center;
}
.notif.hidden {
    display: none;
}
.notif > div:nth-of-type(1) {
    width: 20px;
    min-width: 20px;
    height: 20px;
    background-size: 20px auto;
    background-repeat: no-repeat;

}
.notif > div.success {
    background-image: url('/icons/icon-success.svg')
}
.notif > div.failure {
    background-image: url('/icons/icon-failure.svg')
}
.notif > div:nth-of-type(2) {
    flex: 1;
    margin: 0px 8px;
    padding: 2px 0px;
    line-height: 14px;
    width: 230px;
}
.notif > button {
    background-color: #e9e9e9;
    width: 20px;
    min-width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    border-radius: 20px;
    font-size: 16px;
    font-weight: 700;
    transform: rotate(45deg);
    border: none;
    color: #555;
    cursor: pointer;
    transition: all ease-in-out 0.2s;
}
.notif > button:hover {
    background-color: #d7d7d7;
}
a {
    text-decoration: underline;
}
</style>