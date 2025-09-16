(function () {
    const DATA_URL = '/assets/data/datasets.json'; // exact values from your CSV

    const table = document.getElementById('data');
    const tbody = table.querySelector('tbody');
    const status = document.getElementById('copy-status');
    const dsButtons = document.querySelectorAll('.ds-btn');
    const theadCopyBtns = document.querySelectorAll('.thead-copy-btn');
    const dsTitleCell = document.getElementById('dataset-title');

    // Modal bits
    const modal = document.getElementById('instr-modal');
    const openInstrBtn = document.getElementById('open-instr');
    const closeInstrBtn = document.getElementById('close-instr');

    let DATASETS = null;
    let currentDatasetName = 'Hospital 1';
    let currentRows = [];
    let lastFocusedEl = null;

    function renderRows(rows) {
        const html = rows.map(r => {
            return `<tr>
        <td>${r.Date}</td>
        <td>${r.Int}</td>
        <td>${r.Percent}</td>
        <td>${r.Rate}</td>
      </tr>`;
        }).join('');
        tbody.innerHTML = html;
    }

    function setActiveDataset(name) {
        if (!DATASETS) return;
        currentDatasetName = name;
        currentRows = DATASETS[name] || [];
        renderRows(currentRows);

        dsButtons.forEach(b => b.classList.toggle('is-active', b.getAttribute('data-ds') === name));
        if (dsTitleCell) dsTitleCell.textContent = `${name} Dummy Data`;
    }

    function getColumnValuesByKey(key) {
        const out = [];
        for (const r of currentRows) {
            const v = r[key];
            if (v == null) continue;
            const s = String(v).trim();
            if (s !== '') out.push(s);
        }
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

    // Dataset buttons
    dsButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const ds = btn.getAttribute('data-ds');
            setActiveDataset(ds);
        });
    });

    // Copy buttons in thead (single-column copy + visual feedback + message)
    theadCopyBtns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!DATASETS) return;

            const sel = window.getSelection && window.getSelection();
            if (sel && sel.removeAllRanges) sel.removeAllRanges();
            if (document.activeElement && document.activeElement.blur) document.activeElement.blur();

            const key = btn.getAttribute('data-col-key'); // "Int" | "Percent" | "Rate"
            const values = getColumnValuesByKey(key);
            const payload = values.join('\n');

            try {
                await copyPlain(payload);
                btn.classList.add('was-copied');
                setTimeout(() => btn.classList.remove('was-copied'), 1200);

                if (status) {
                    status.textContent = `Copied ${key} (${currentDatasetName}) — ${values.length} rows`;
                    setTimeout(() => (status.textContent = ''), 2500);
                }
            } catch {
                if (status) {
                    status.textContent = 'Copy failed. Try Ctrl/Cmd+C as a fallback.';
                    setTimeout(() => (status.textContent = ''), 4000);
                }
            }
        });
    });

    // Modal: open/close helpers
    function openModal() {
        if (!modal) return;
        lastFocusedEl = document.activeElement;
        modal.removeAttribute('hidden');
        // Focus the close button for accessibility
        if (closeInstrBtn) closeInstrBtn.focus();
    }
    function closeModal() {
        if (!modal) return;
        modal.setAttribute('hidden', '');
        if (lastFocusedEl && lastFocusedEl.focus) lastFocusedEl.focus();
    }

    // Modal events
    if (openInstrBtn) openInstrBtn.addEventListener('click', openModal);
    if (closeInstrBtn) closeInstrBtn.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target && e.target.getAttribute('data-close') === 'true') {
                closeModal();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (!modal.hasAttribute('hidden') && e.key === 'Escape') {
                closeModal();
            }
        });
    }

    // Load datasets.json (exact CSV -> JSON)
    fetch(DATA_URL, { cache: 'no-store' })
        .then(r => {
            if (!r.ok) throw new Error(`Failed to load ${DATA_URL}`);
            return r.json();
        })
        .then(json => {
            DATASETS = json;
            setActiveDataset(currentDatasetName); // initial render
        })
        .catch(err => {
            console.error(err);
            if (status) status.textContent = 'Could not load datasets.json';
        });
})();
