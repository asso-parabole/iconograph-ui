<script>
    // @ts-nocheck
    export let fields;
    export let field;
    export let style;

    export const __filter_options = fields;

    function transform(arr) {
        return arr.reduce((acc, obj) => {
            const [key, value] = Object.entries(obj)[0]; // take the single key/value
            acc[key] = value;
            return acc;
       }, {});
    }

    let f_arr = transform(fields);
</script>

{#if style == 2}
    {f_arr[field]}
{:else}
    <div class="indicator-wrapper">
        <span>{f_arr[field]}</span>
    </div>
{/if}

<style>

.indicator-wrapper {
    max-width: calc(100% - 16px);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    height: 16px;
    z-index: 12;
}
.indicator-wrapper > span{
    font-weight: 600;
    text-wrap: nowrap;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #555;
    font-weight: 600;
    font-size: 11px;
}
</style>