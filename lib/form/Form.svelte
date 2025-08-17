<script>
    import Button from "./Button.svelte";

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

        const data = await response.json();

        if (response.ok) {
            //addNotification({'status': 'success', 'message': 'Request successfull'})
        }
        else {
            //addNotification({'status': 'failure', 'message': response.status + ': ' + data.message})
        }

        waiting = false;
    }
</script>

<form>

    {#each inputs as input}
        <div class="form-row">
            <div>
                <label for="{input.props.name}" class="mandatory">{input.props.label}</label>

                <svelte:component this={input.component} {...input.props} bind:value={input.value} />
            </div>
        </div>
    {/each}

    <div on:click|stopPropagation={() => handleSubmit()}>
        <Button button={button} ></Button>
    </div>

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