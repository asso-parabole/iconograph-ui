<script>
    export let url;
    export let text;
</script>

<span>
    <a href="{url}">{text ? text : ''}</a>
</span>

<style>
span {
    display: inline-flex;
    width: 100%
}
a {
    font-weight: 500;
    text-decoration: none;
    font-size: 13px;
    font-weight: 600;
    color: #555;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>