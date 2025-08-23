<script>
    // @ts-
    export let user;
    export let size;

    let colors = [
        "#66c5cc",
        "#f6cf71",
        "#f89c74",
        "#dcb0f2",
        "#87c55f",
        "#9eb9f3",
        "#fe88b1",
        "#c9db74",
        "#8be0a4",
        "#b497e7",
    ]

    //let firstname = (user.)
    if (!user.firstname) {
        user.firstname = user.name;
        user.lastname = "";
    }
    let colorId = (user.firstname.charCodeAt(0) + user.lastname.charCodeAt(0)) % colors.length;
</script>

<div style='--size:{size}; background-color: {colors[colorId]}' >
    {Array.from(user.firstname)[0]}{Array.from(user.lastname)[0]}
</div>

<style>
div {
    width: calc(var(--size) * 1px);
    height: calc(var(--size) * 1px);
    min-width: calc(var(--size) * 1px);
    border-radius: calc(var(--size) * 1px);

    background-color: #66c5cc;
    /*background-image: url('/img/user-default.svg');*/
    background-position: center;
    background-size: 20px auto;
    background-repeat: no-repeat;

    color: #fff;
    font-weight: 600;
    text-align: center;
    text-transform: uppercase;
    line-height: calc(var(--size) * 1px);
    font-size: calc(var(--size) * 0.4 * 1px );
}
</style>