<script>
    import FormButton from "./FormButton.svelte";
    import { addNotification } from "../notification/NotificationWrapper.svelte";

    export let inputs = [];
    export let button = {};
    export let uri;
    export let callbackFunction = () => {};

    const defaultButton = { label: "Enregistrer", clickEvent: handleSubmit };
    $: button = { ...defaultButton, ...button };

    let waiting = false;

    function setDeep(obj, path, value) {
        let keys = path
            .replace(/\]/g, '')
            .split(/\[/);

        let current = obj;
        keys.forEach((k, i) => {
            if (i === keys.length - 1) {
                current[k] = value;
            } else {
                if (!(k in current)) current[k] = {};
                current = current[k];
            }
        });
    }

    async function handleSubmit() {
        waiting = true;
        let body = {};

        inputs.forEach(i => {
            if (i.props.stringify)
                i.value = JSON.stringify(i.value);
            setDeep(body, i.props.name, i.value);
        });

        console.log(body);

        const response = await fetch(uri, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json'
			}
		});

        waiting = false;

        if (!response.ok && response.status == 404)
            return addNotification({'status': 'failure', 'message': 'Erreur ' + response.status })

        const data = await response.json();

        if (!response.ok) {
            addNotification({'status': 'failure', 'message': response.status + ': ' + data.message})
        }
        else {
            addNotification({'status': 'success', 'message': data.message})
            callbackFunction(data);
        }
    }
</script>

<form>
    <slot></slot>

    <FormButton button={button} clickEvent={button.clickEvent} ></FormButton>

</form>

<style>
form :global(.form-row) {
    display: flex;
    margin-bottom: 6px;
}
form :global(.form-row > div) {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 12px;
}
form :global(label) {
    display: inline-block;
    padding: 0px 0px;
    margin: 4px 6px;
    font-family: var(--theme-text-font);
    font-size: 14px;
    font-weight: 600;
    color: #222;
    width: fit-content;
}
</style>