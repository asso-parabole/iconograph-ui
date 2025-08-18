<script>
    export let name;
    export let value;

    console.log(value);
</script>

<div class="selector">
    {#each ['Homme', 'Femme'] as sexe}
    <div>
        <input type="radio" name={name} value={sexe} bind:group={value} />
        <label for={sexe}>{sexe}</label>
    </div>
    {/each}
</div>

<style>
.selector {
    display: flex;
    gap: 12px;
}
.selector > div {
    padding: 6px 3px;
    display: flex;
    align-items: center;
    gap: 6px;
}
input {
    background-color: #f5f5fb;
    border: none;
    border-radius: 6px;
    padding: 7px 14px;
    font-size: 14px;
    line-height: 14px;
    font-weight: 500;
    border: 1px solid #f3f3f3; /*#d1d9e0;*/
}
label {
    font-size: 14px;
    line-height: 14px;
    font-weight: 500;
}

</style>
