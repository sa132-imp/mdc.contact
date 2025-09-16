(function () {
    const btn = document.getElementById('copy-values');
    const status = document.getElementById('copy-status');
    const table = document.getElementById('data');
    if (!btn || !table) return;

    function getValueColumnTexts() {
        // Select all td elements in the 2nd column (Value)
        const cells = table.querySelectorAll('tbody td:nth-child(2)');
        return Array.from(cells).map(td => td.textContent.trim());
    }

    function fallbackCopy(text) {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        return ok;
    }

    btn.addEventListener('click', async () => {
        const values = getValueColumnTexts();
        const payload = values.join('\n'); // Excel: one value per row in one column
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(payload);
            } else {
                if (!fallbackCopy(payload)) throw new Error('Fallback copy failed');
            }
            status.textContent = 'Copied Value column to clipboard';
            setTimeout(() => (status.textContent = ''), 2500);
        } catch (e) {
            status.textContent = 'Copy failed. Select the Value column and press Ctrl/Cmd+C.';
            setTimeout(() => (status.textContent = ''), 4000);
        }
    });
})();
