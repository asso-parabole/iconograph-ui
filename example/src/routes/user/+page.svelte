<script>
    import HeadSection from "$lib/iconograph-ui/layout/HeadSection.svelte";
    import BodySection from "$lib/iconograph-ui/layout/BodySection.svelte";
    import Card from "$lib/iconograph-ui/layout/Card.svelte";
    import UserPicture from "$lib/iconograph-ui/user/UserPicture.svelte";
    import NavBar from "$lib/iconograph-ui/navigation/NavBar.svelte";
    import SelectUserInput from "$lib/iconograph-ui/user/SelectUserInput.svelte";
    import UserSelect from "$lib/iconograph-ui/user/UserSelect.svelte";

    import Form from "$lib/iconograph-ui/form/Form.svelte";
    import ActionButton from "$lib/iconograph-ui/form/ActionButton.svelte";
    import Input from "$lib/iconograph-ui/form/Input.svelte";
    import SexeChoiceInput from "$lib/iconograph-ui/form/SexeChoiceInput.svelte";
    import CustomInput from "$lib/components/CustomInput.svelte";

    let inputs = [
        { component: Input, props: { type: "text", name: "title", label: "Titre" } },
        { component: Input, props: { type: "select", name: "title", label: "Titre", options: ['Maison', 'Voiture']} },
        { component: Input, props: { type: "email", name: "email", label: "Email"}, value: "test@example.com" },
        { component: SexeChoiceInput, props: { name: "sexe", label: "Sexe" } },
        { component: CustomInput, props: { name: "color", label: "Couleur" } },
    ];

    let button = {
        label: "Enregistrer",
    }

    let user = {
        firstname: "Nathan",
        lastname: "Chevalier",
    }

    let users = [{
        id: 1234,
        firstname: "Nathan",
        lastname: "Chevalier",
    }]

    let tabs = { infos: 'Informations', docs: 'Documents', groups: 'Groupes' };
    let currentTab;

    function handleManagerSelection(e) {
        console.log(e.detail.id);
    }


</script>

<HeadSection>

    <div class="flex-row center" style="margin-top: 64px; margin-bottom: 24px;">
        <div class="picture-medium">
            <UserPicture user={user} size={120}></UserPicture>
        </div>
        <div class="flex-fill margin-l-l">
            <div class="flex-row">
                <div>
                    <div style="display: flex; align-items: center;" >
                        <h2 class="margin-l-s margin-r-m">{user.firstname} {user.lastname}</h2>
                    </div>
                    <span class="margin-l-s" style="text-transform: uppercase; color: #888; font-weight: 600;"></span>
                </div>
                <div style="margin-right: 60px; display: flex; gap: 8px;">
                    <ActionButton options={[{label: "Supprimer les derniers", action: () => {alert();}}]}></ActionButton>
                    <ActionButton style={"icon"} options={[{label: "Supprimer les derniers", action: () => {alert();}}]}></ActionButton>
                </div>
            </div>
        </div>
    </div>

    <NavBar tabs={tabs} currentTab={currentTab} ></NavBar>

</HeadSection>

<BodySection>

    <Card>

        <SelectUserInput></SelectUserInput>

    </Card>

    <Card>

        <SelectUserInput multiple={true}></SelectUserInput>

    </Card>

    <Card padding={'24px'}>
        <h1>My Form</h1>

        <Form inputs={inputs} uri={'/test'} button={button}>
        </Form>

    </Card>

</BodySection>

<style>
</style>