<script>
    import FormButton from "./FormButton.svelte";
    import { addNotification } from "../notification/NotificationWrapper.svelte";

    export let inputs = [];
    export let button;
    export let uri;

    let waiting = false;

    async function handleSubmit() {
        waiting = true;
        let body = {};

        inputs.forEach(i => {
            body[i.props.name] = i.value;
        });

        console.log(body);
        //await timeout(500);

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
        console.log(data);

        if (!response.ok) {
            addNotification({'status': 'failure', 'message': response.status + ': ' + data.message})
        }
        else {
            addNotification({'status': 'success', 'message': data.message})
        }

    }
</script>

<form>

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

    <FormButton button={button} clickEvent={handleSubmit} ></FormButton>

</form>

<style>
    .form-row {
        display: flex;
        margin-bottom: 6px;
    }
    .form-row > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-right: 12px;
    }
    label {
        display: inline-block;
        padding: 0px 6px;
        margin: 4px 6px;
        font-family: 'Montserrat', sans-serif;
        font-size: 14px;
        font-weight: 600;
        color: #222;
        width: fit-content;
    }
</style>