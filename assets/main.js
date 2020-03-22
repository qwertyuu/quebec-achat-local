$.extend({
    getUrlVars: function () {
        const vars = {};
        const qStringSeparatorPos = window.location.href.indexOf('?');
        if (qStringSeparatorPos !== -1) {
            const hashes = window.location.href.slice(qStringSeparatorPos + 1).split('&');
            for (let i = 0; i < hashes.length; i++) {
                const hash = hashes[i].split('=');
                vars[hash[0]] = hash[1];
            }
        }
        return vars;
    },
    getUrlWithoutVars: function() {
        const qStringSeparatorPos = window.location.href.indexOf('?');
        if (qStringSeparatorPos === -1) {
            return window.location.href;
        }
        return window.location.href.slice(0, qStringSeparatorPos);
    },
    getUrlVar: function (name) {
        return $.getUrlVars()[name];
    }
});

const urlVars = $.getUrlVars();
const regionSelect = $('#region-select');
regionSelect.dropdown();
regionSelect.change(function () {
    urlVars.region = regionSelect.val();
    const queryString = $.param(urlVars);
    window.location.href = [$.getUrlWithoutVars(), queryString].join('?');
});
