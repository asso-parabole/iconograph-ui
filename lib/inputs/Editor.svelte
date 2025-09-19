<script>
    import { onMount, createEventDispatcher } from "svelte";

    import "quill/dist/quill.snow.css";

    const dispatch = createEventDispatcher();

    export let content = "";
    export let theme = "snow";

    let editorEl;
    let editor;

    const tooltips = {
        bold: "Bold",
        italic: "Italic",
        underline: "Underline",
        strike: "Strikethrough",
        link: "Insert Link",
        image: "Insert Image",
        blockquote: "Blockquote",
        clean: "Remove Formatting",
    };

    function addTooltips() {
        const toolbar = document.querySelector(".ql-toolbar");
        if (!toolbar) return;

        toolbar.querySelectorAll("button, select").forEach((btn) => {
            const format =
                btn.className.match(/ql-(\w+)/)?.[1] ||
                btn.getAttribute("value") ||
                null;

            if (format && tooltips[format]) {
                btn.setAttribute("title", tooltips[format]);
            }
        });
    }

    onMount(async () => {
        const Quill = (await import("quill")).default;

        editor = new Quill(editorEl, {
            theme,
            modules: {
                toolbar: [
                    //[{ size: [] }],
                    [{ 'header': [1, 2, 3, 4, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ color: [] }, { background: [] }],
                    ["blockquote"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    [{ align: [] }],
                    ["link"],
                    ["clean"],
                    // [{ script: "sub" }, { script: "super" }],
                    // [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
                    // ["link", "image", "video", "formula"],
                ],
            },
            placeholder: 'Redigez votre message',
        });

        if (content)
            editor.clipboard.dangerouslyPasteHTML(content);

        editor.on("text-change", () => {
            const html = editor.root.innerHTML;
            const delta = editor.getContents();
            dispatch("change", { html, delta });
        });

        addTooltips();
    });
</script>

<div bind:this={editorEl} style="width: 100%; height: 200px;"></div>

<style>
    /* TODO */
</style>
