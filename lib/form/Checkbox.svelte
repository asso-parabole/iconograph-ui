<script>
    export let name;
    export const type = "checkbox";
    export let value = false;
    export let options = [];
    export let required = false;

    // label from options[0] or fallback
    $: label = options?.[0] ?? "Checkbox";
</script>


<!-- Styled wrapper -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="checkbox-container">
    <div class="onoffswitch">

        <input type="checkbox" {name} class="onoffswitch-checkbox" id="myonoffswitch" tabindex="0" bind:checked={value} {required}>

        <label class="onoffswitch-label" for="myonoffswitch">
            <span class="onoffswitch-inner"></span>
            <span class="onoffswitch-switch"></span>
        </label>
    </div>

    <div class="checkbox-label">
        {label}
    </div>
</div>


<style>
.hidden-input {
    display: none;
}

.checkbox-container {
    display: inline-flex;
    align-items: center;
    gap: 10px;
}

.checkbox-label {
    font-size: 14px;
    line-height: 16px;
    font-weight: 400;
    color: var(--theme-input-text-font);
}

.onoffswitch {
    position: relative;
    width: 50px;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select: none;
}
.onoffswitch-checkbox {
    position: absolute;
    opacity: 0;
    pointer-events: none;
}
.onoffswitch-label {
    display: block;
    overflow: hidden;
    cursor: pointer;
    border: 0px solid #999999;
    border-radius: 20px;
    margin: 0px;
    width: 100%;
}
.onoffswitch-inner {
    display: block;
    width: 200%;
    margin-left: -100%;
    transition: margin 0.3s ease-in 0s;
}
.onoffswitch-inner:before, .onoffswitch-inner:after {
    display: block;
    float: left;
    width: 50%;
    height: 28px;
    padding: 0;
    line-height: 28px;
    font-size: 14px;
    color: white;
    font-family: Trebuchet, Arial, sans-serif;
    font-weight: bold;
    box-sizing: border-box;
}
.onoffswitch-inner:before {
    content: "";
    padding-left: 10px;
    background-color: var(--theme-main-color);
    color: #FFFFFF;
}
.onoffswitch-inner:after {
    content: "";
    padding-right: 10px;
    background-color: var(--theme-input-bg-color, #ebebed);
    color: #999999;
    text-align: right;
}
.onoffswitch-switch {
    display: block; width: 18px; margin: 5px;
    background: #FFFFFF;
    position: absolute; top: 0; bottom: 0;
    right: 18px;
    border: 0px solid #999999;
    border-radius: 20px;
    transition: all 0.3s ease-in 0s;
}
.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner {
    margin-left: 0;
}
.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-switch {
    right: 0px;
}
</style>
