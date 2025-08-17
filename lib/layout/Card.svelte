<script>
    export let padding = '24px';
    export let marginB = '12px';
</script>

<div class="card" style="padding: {padding}; margin-bottom: {marginB}" >
    <slot></slot>
</div>

<style>
.card {
    width: 100%;
    background-color: var(--main-bg-color);
    box-sizing: border-box;
    border: 1px solid var(--main-border-color);
    border-radius: 8px;
}
</style>