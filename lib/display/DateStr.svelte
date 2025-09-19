<script>
    // @ts-nocheck
    export let date;
    export let format;

    function formatDate(date, format, locale = "fr-FR") {
        if (date === null || date === undefined)
            return "";

        if (!(date instanceof Date)) {
            date = new Date(date);
            if (date.toString() == "Invalid Date")
                return "";
        }

        const pad = (num, size = 2) => num.toString().padStart(size, "0");

        // Build localized strings
        const dayNameLong = new Intl.DateTimeFormat(locale, { weekday: "long" }).format(date);
        const dayNameShort = new Intl.DateTimeFormat(locale, { weekday: "short" }).format(date);
        const monthNameLong = new Intl.DateTimeFormat(locale, { month: "long" }).format(date);
        const monthNameShort = new Intl.DateTimeFormat(locale, { month: "short" }).format(date);

        const map = {
            YYYY: date.getFullYear(),
            YY: String(date.getFullYear()).slice(-2),
            MM: pad(date.getMonth() + 1),
            M: date.getMonth() + 1,
            DD: pad(date.getDate()),
            D: date.getDate(),
            dd: pad(date.getDate()),
            HH: pad(date.getHours()),
            H: date.getHours(),
            mm: pad(date.getMinutes()),
            m: date.getMinutes(),
            ss: pad(date.getSeconds()),
            s: date.getSeconds(),
            dddd: dayNameLong,   // ex: "mardi"
            ddd: dayNameShort,   // ex: "mar."
            MMMM: monthNameLong, // ex: "septembre"
            MMM: monthNameShort, // ex: "sept."
        };

        return format.replace(
            /\$\{(YYYY|YY|MM|M|DD|D|dd|HH|H|mm|m|ss|s|dddd|ddd|MMMM|MMM)\}/g,
            (_, token) => map[token]
        );
    }

    // console.log(formatDate(d, "Le ${dddd} ${dd} ${MMMM} ${YYYY} à ${HH}h${mm}", "fr-FR"));
    // console.log(formatDate(d, "${ddd} ${D}/${M}/${YY}", "fr-FR"));

</script>

{formatDate(date, format)}