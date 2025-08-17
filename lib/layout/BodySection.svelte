<script>
    import SectionContent from "./SectionContent.svelte";

</script>

<section class="body-section">
    <SectionContent>
        <slot></slot>
    </SectionContent>
</section>

<style>

.body-section {
    margin: 0px;
    width: 100%;
    border-radius: 0px;
    padding: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

</style>