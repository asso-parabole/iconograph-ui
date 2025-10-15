<script>
    import { onMount } from "svelte";
    import "quill/dist/quill.snow.css";
    import "quill-better-table/dist/quill-better-table.css";

    export let content = "";
    export let theme = "snow";
    export let width = "100%";
    export let height = "200px";

    let editorEl;
    let editor;
    let isInternalChange = false; // pour éviter les boucles du changement dynamique de content

    const tooltips = {
        bold: "Gras",
        italic: "Italique",
        underline: "Souligné",
        strike: "Barré",
        link: "Lien",
        image: "Image",
        blockquote: "Citation",
        clean: "Effacer le formatage",
    };

    function addTooltips() {
        const toolbar = editorEl?.parentElement?.querySelector(".ql-toolbar");
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
        const QuillBetterTable = (await import("quill-better-table")).default;

        Quill.register({ "modules/better-table": QuillBetterTable }, true);

        editor = new Quill(editorEl, {
            theme,
            modules: {
                toolbar: [
                    [{ header: [1, 2, 3, 4, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ color: [] }, { background: [] }],
                    ["blockquote"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    [{ align: [] }],
                    ["link"],
                    ["clean"],
                    // ["table"],
                ],
                table: false, // désactive le module table de base
                "better-table": {
                    operationMenu: {
                        items: {
                            unmergeCells: { text: "Unmerge cells" },
                        },
                    },
                },
            },
            placeholder: "Rédigez votre message...",
        });

        if (content)
            editor.clipboard.dangerouslyPasteHTML(content);

        editor.on("text-change", () => {
            isInternalChange = true;
            content = editor.root.innerHTML;
            isInternalChange = false;
        });

        addTooltips();
    });

    $: if (editor && !isInternalChange) {
        const currentHTML = editor.root.innerHTML;
        if (content && content !== currentHTML) {
            editor.clipboard.dangerouslyPasteHTML(content);
        }
    }
</script>

<div
    bind:this={editorEl}
    style="width: {width}; height: {height};"
></div>

<style>
    /*.ql-toolbar {
        border-radius: 0.5rem 0.5rem 0 0;
    }
    .ql-container {
        border-radius: 0 0 0.5rem 0.5rem;
        min-height: 100px;
    }*/
</style>
