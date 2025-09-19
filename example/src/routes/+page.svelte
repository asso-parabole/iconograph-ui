<script>
    import HeadSection from "$lib/iconograph-ui/layout/HeadSection.svelte";
    import BodySection from "$lib/iconograph-ui/layout/BodySection.svelte";
    import Card from "$lib/iconograph-ui/layout/Card.svelte";
    import Modal from "$lib/iconograph-ui/layout/Modal.svelte";
    import Form from "$lib/iconograph-ui/form/Form.svelte";
    import FlexForm from "$lib/iconograph-ui/form/FlexForm.svelte";
    import Input from "$lib/iconograph-ui/form/Input.svelte";
    import SexeChoiceInput from "$lib/iconograph-ui/form/SexeChoiceInput.svelte";
    import CustomInput from "$lib/components/CustomInput.svelte";
    import CustomTable from "../lib/components/CustomTable.svelte";
    import Editor from "$lib/iconograph-ui/inputs/Editor.svelte";
    import SegmentedSwitchInput from "$lib/iconograph-ui/form/SegmentedSwitchInput.svelte"
    import Link from "$lib/iconograph-ui/display/Link.svelte";

    let options = [{ key: "Value" }]
    let inputs = [
        { component: Input, props: { type: "text", name: "title", label: "Titre" } },
        { component: Input, props: { type: "select", name: "title", label: "Titre" } },
        { component: Input, props: { type: "select", name: "custom", label: "Custom", options: options } },
        { component: Input, props: { type: "email", name: "email", label: "Email"}, value: "test@example.com" },
        { component: SexeChoiceInput, props: { name: "sexe", label: "Sexe" } },
        { component: CustomInput, props: { name: "color", label: "Couleur" } },
    ];

    let button = {
        label: "Enregistrer",
    }

    let open = false;
    let section = 'Doc';

    function onEditorChange(event) {
      console.log("HTML:", event.detail.html);
    }
</script>

<HeadSection>

    <h1 style="margin-top: 40px;">Welcome to SvelteKit</h1>
    <p  style="margin-bottom: 24px;">Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

</HeadSection>

<BodySection>

    <Card padding={'0px'} >
        <CustomTable></CustomTable>
    </Card>

    <Card>
        <div on:click={() => open = true}>Open Modal</div>
        <Link icon={"DOC"} uri={"/"} label={"CR Bibliapedia"}></Link>
        <Link icon={"FOLDER"} uri={"/"} label={"CR Bibliapedia"}></Link>
        <Link icon={"LINK"} uri={"/"} label={"CR Bibliapedia"}></Link>
        <Link uri={"/"} label={"CR Bibliapedia"}></Link>
    </Card>

    <Card padding={'24px'}>
        <h1>My Form</h1>

        <Form inputs={inputs} uri={'/test'} button={button}>
        </Form>

    </Card>

    <Card padding={'0px'}>
        <Editor on:change={onEditorChange}></Editor>
    </Card>
</BodySection>

<Modal bind:open={open}>
    <div style="padding: 24px; width: 80vw; height: 350px; margin-bottom: 24px;">
        <FlexForm inputs={inputs} uri={'/test'} button={button}>
            <SegmentedSwitchInput options={['Doc', 'Group', 'Entité']} bind:selected={section} ></SegmentedSwitchInput>
            <p style="margin: 12px;">{section} is selected</p>

            {#each inputs as input}
                {#if !input.disabled }
                    <div class="form-row">
                        <div>
                            <label for="{input.props.name}" class="mandatory">{input.props.label}</label>
                            <svelte:component this={input.component} {...input.props} bind:value={input.value} />
                        </div>
                    </div>
                {/if}
            {/each}
        </FlexForm>
    </div>
</Modal>
