<script>
    import CellLink from "$lib/iconograph-ui/table/CellLink.svelte";

    export let id;
    export let name;
</script>

<CellLink url="/org/{id}" text={name} ></CellLink>