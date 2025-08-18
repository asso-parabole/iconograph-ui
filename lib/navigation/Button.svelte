<script>
    export let label;
    export let uri;
</script>

<a href="{uri}" >
    {label}
</a>

<style>
a {
    min-width: 100px;
    display: inline-block;
    background-color: var(--theme-main-color);
    color: #ffffff !important;
    /*box-shadow: #000000a0 0px 1px 3px 0px !important;*/
    border-radius: 8px;
    height: 34px;
    line-height: 34px !important;
    font-size: 13px;
    text-decoration: none;
    text-align: center;
    font-family: var(--theme-main-font);
    font-weight: 700;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    padding: 0px 20px;
    margin-top: 12px;
}
a:hover {
    background-color: var(--theme-main-color-hover);
}
a:active {
    background-color: var(--theme-main-color-hover);
    position: relative;
    top: 1px;
}
a:disabled {
    background-color: var(--disabled-background-color) !important;
}
</style>