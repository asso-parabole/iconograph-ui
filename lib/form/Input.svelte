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
        {#each options as opt}
            <option value={String(opt).toUpperCase()}>
                {opt}
            </option>
        {/each}
    </select>
{:else}
    <input type={type} name="{name}" bind:value={value} autocomplete="on" required={required} />
{/if}

<style>

input, textarea {
    background-color: #f5f5fb;
    border: none;
    border-radius: 6px;
    padding: 7px 14px;
    font-size: 14px;
    line-height: 14px;
    font-weight: 500;
    border: 1px solid #f3f3f3; /*#d1d9e0;*/
}
textarea {
    padding: 12px 14px;
    max-width: calc(100% - 28px);
    min-height: 100px;
}
select {
    font-family: var(--theme-text-font);
    background-color: #f5f5fb;
    border: none;
    border-radius: 6px;
    padding: 7px 14px;
    font-size: 14px;
    line-height: 14px;
    font-weight: 500;
}
option {
    font-family: var(--theme-text-font);
    padding: 7px 14px;
    font-size: 14px;
    line-height: 14px;
    font-weight: 500;
}

</style>
