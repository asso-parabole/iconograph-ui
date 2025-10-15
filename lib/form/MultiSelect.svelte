<script>
    export let name;
    export let value = [];
    export let options = {};
    export let required = false;

    function toggleSelection(key) {
        if (value.includes(key))
            value = value.filter(v => v !== key);
        else
            value = [...value, key];
    }

    $: entries = Object.entries(options);
</script>

<div class="multi-checkbox">
    {#each entries as [key, label]}
        <label class="option">
            <input type="checkbox" name={name} value={key} checked={value.includes(key)}
                on:change={() => toggleSelection(key)} />
            {label}
        </label>
    {/each}
</div>

<style>
    .multi-checkbox {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
    }
    .option {
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 12px 16px;
        border-radius: 100px;
        background-color: var(--theme-input-bg-color, #ebebed);
        border: var(--theme-input-border, none);
        font-size: 14px;
        line-height: 16px;
        font-weight: 400;
        font-family: var(--theme-text-font);
        color: var(--theme-input-text-font);
    }
    input[type="checkbox"] {
        transform: scale(1.1);
        cursor: pointer;
        margin-right: 8px;
        background-color: transparent;
    }
</style>
