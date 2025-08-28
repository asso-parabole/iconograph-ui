<script>
    // @ts-nocheck
    import Table from "$lib/iconograph-ui/table/Table.svelte";
    import CustomInput from "./CustomInput.svelte";
    import CustomLabel from "./CustomLabel.svelte";
    import CustomLink from "./CustomLink.svelte";
    import { enumType } from "./types/input";

    let statuses = [
        { name: 'ALL', value: 0 },
        { name: 'DRAFT', value: 1 },
        { name: 'REJECTED', value: 2 },
        { name: 'CONVERGED', value: 3 },
        { name: 'APPROVED', value: 4 },
        { name: 'PUBLISHED', value: 5 },
        { name: 'DISABLED', value: 6 },
        { name: 'DELETED', value: 7 },
        { name: 'REPORTED', value: 8 },
        { name: 'MOD_L1', value: 9 },
        { name: 'MODING', value: 10 }
    ];

    let settings = [
        {
            field: "name", label: "Nom", component: CustomLink, width: 120, props: {},
            sort: (a, b) => a.name.localeCompare(b.name)
        },
        { field: "city", label: "Ville", component: null, props: {}, width: 200, sort: (a, b) => a.name.localeCompare(b.name)},
        { field: "type", label: "Type", component: CustomLabel, props: {}, width: 120, sort: (a, b) => null, filterOptions: enumType},
        { field: "status", label: "Statut", component: null, props: {}, width: 120, sort: (a, b) => null},
    ]

    let uri = "/example"

</script>

<Table uri={uri} columns={settings} actions={false}></Table>
