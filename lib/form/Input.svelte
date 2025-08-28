<script>
    export let name;
    export let type;
    export let value;
    export let options = []
    export let required = false;
</script>

{#if type == "textarea"}
    <textarea name="{name}" bind:value={value} ></textarea>
{:else if type == "select" }
    <select name="{name}" bind:value={value} >
        <option value="" disabled selected>Choisir une option</option>
        {#each options as opt}
            {#if typeof opt === 'object' && opt !== null}
            <option value={String(Object.keys(opt)[0])}>
                {opt[Object.keys(opt)[0]]}
            </option>
            {:else}
            <option value={String(opt)}>
                {opt}
            </option>
            {/if}
        {/each}
    </select>
{:else}
    <input type={type} name="{name}" bind:value={value} autocomplete="on" required={required} />
{/if}

<style>

input, textarea, select {
    background-color: var(--theme-input-bg-color, #ebebed);
    height: var(--theme-input-height, 40px);
    border: var(--theme-input-border, none);
    border-radius: 8px;
    padding: 0px 16px;
    font-size: 14px;
    line-height: 16px;
    font-weight: 400;
    font-family: var(--theme-text-font);
    color: var(--theme-input-text-font);
}
input:focus, textarea:focus, select:focus {
    outline: var(--theme-input-outline, 2px solid #3B94FC);
    outline-offset: var(--theme-input-outline-offset, 0px);
}
textarea {
    padding: 12px 14px;
    max-width: calc(100% - 28px);
    min-height: 100px;
}
option {
    font-family: var(--theme-text-font);
    color: var(--theme-input-text-font);
    padding: 7px 14px;
    font-size: 14px;
    line-height: 14px;
}

</style>
