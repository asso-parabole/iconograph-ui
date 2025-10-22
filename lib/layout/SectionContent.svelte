<script>

</script>

<div class="content">
    <slot></slot>
</div>

<style>
.content {
    width: 100%;
    max-width: calc(100vw - 132px);
}
@media (max-width: 780px) {
    .content {
        width: 100%;
        max-width: calc(100vw - 32px);
    }
}
</style>