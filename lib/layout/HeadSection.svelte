<script>
    import SectionContent from "./SectionContent.svelte";

</script>

<section class="head-section">
    <SectionContent>
        <slot></slot>
    </SectionContent>
</section>

<style>

.head-section {
    margin: 0px;
    margin-bottom: 12px;
    width: 100%;
    border-radius: 0px;
    padding: 0px;
    background-color: var(--main-bg-color);
    box-sizing: border-box;
    border-bottom: 1px solid var(--main-border-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

</style>