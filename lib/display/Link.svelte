<script>
    import docIcon from '../assets/icons/icon-doc-black.svg?url';
    import folderIcon from '../assets/icons/icon-folderBox-black.svg?url';
    import linkIcon from '../assets/icons/icon-link-black.svg?url';

    export let uri;
    export let label;
    export let icon = false;

    const icons = {
        "DOC": docIcon,
        "FOLDER": folderIcon,
        "LINK": linkIcon,
    }

</script>

<a href="{uri}" class="{ icon ?  'icon' : '' }" style:background-image={`url("${icons[icon]}")`} target="_blank">
    {label}
</a>

<style>
a {
    text-decoration: underline;
}
a.icon {
    display: inline-block;
    background-image: url('/icons/icon-success.svg');
    background-size: 20px auto;
    background-repeat: no-repeat;
    background-position: 8px center;
    background-color: #eeeef0;
    padding: 6px 16px;
    padding-left: 32px;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    height: 20px;
    line-height: 21px;
    border-radius: 8px;
    cursor: pointer;
}
a.icon:hover {
    background-color: #e0e0e0;
}
</style>

