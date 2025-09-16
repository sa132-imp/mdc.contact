(function () {
    const status = document.getElementById('copy-status');
    const table = document.getElementById('data');
    const buttons = document.querySelectorAll('.copy-col-btn');
    if (!table || buttons.length === 0) return;

    function getColumnTexts(colIndex) {
        // Strict: only td from tbody, nth-child is 1-based
        const cells = table.querySelectorAll(`tbody > tr > td:nth-child(${colIndex})`);
        const out = [];
        cells.forEach(td => {
            const s = td.textContent.replace(/\r?\n|\t/g, ' ').trim();
            if (s !== '') out.push(s);
        });
        return out;
    }

    async function copyPlain(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
        } else {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.setAttribute('readonly', '');
            ta.style.position = 'fixed';
            ta.style.left = '-9999px';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
        }
    }

    buttons.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();

            // Clear any on-page selection so the clipboard gets only our payload
            const sel = window.getSelection && window.getSelection();
            if (sel && sel.removeAllRanges) sel.removeAllRanges();
            if (document.activeElement && document.activeElement.blur) document.activeElement.blur();

            const col = Number(btn.getAttribute('data-col'));
            const values = getColumnTexts(col);
            const payload = values.join('\n'); // Excel: one cell per line = one column

            try {
                await copyPlain(payload);
                if (status) {
                    const nice = btn.textContent.replace(/^Copy\s+/, '').replace(/“|”/g, '"');
                    status.textContent = `Copied ${nice} (${values.length} rows)`;
                    setTimeout(() => (status.textContent = ''), 2500);
                }
            } catch {
                if (status) {
                    status.textContent = 'Copy failed. As a fallback, select the column and press Ctrl/Cmd+C.';
                    setTimeout(() => (status.textContent = ''), 4000);
                }
            }
        });
    });
})();
