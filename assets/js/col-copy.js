(function () {
    const DATA_URL = '/assets/data/datasets.json'; // upload datasets.json here

    const table = document.getElementById('data');
    const tbody = table.querySelector('tbody');
    const status = document.getElementById('copy-status');
    const segButtons = document.querySelectorAll('.seg-btn');
    const copyButtons = document.querySelectorAll('.copy-col-btn');

    let DATASETS = null;
    let currentDatasetName = 'Hospital 1';
    let currentRows = [];

    function renderRows(rows) {
        // Render exactly as provided (no rounding). All values are strings.
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
        currentDatasetName = name;
        currentRows = (DATASETS && DATASETS[name]) ? DATASETS[name] : [];
        renderRows(currentRows);
        segButtons.forEach(b => b.classList.toggle('is-active', b.getAttribute('data-ds') === name));
    }

    function getColumnValuesByKey(key) {
        const out = [];
        for (const r of currentRows) {
            const v = r[key];
            if (v === null || v === undefined) continue;
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

    // Hook: dataset selector
    segButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const ds = btn.getAttribute('data-ds');
            if (!DATASETS) return; // ignore clicks until data loads
            setActiveDataset(ds);
        });
    });

    // Hook: copy buttons (copy a single column by key)
    copyButtons.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!DATASETS) return;

            // Clear any on-page selection to avoid copying the whole table
            const sel = window.getSelection && window.getSelection();
            if (sel && sel.removeAllRanges) sel.removeAllRanges();
            if (document.activeElement && document.activeElement.blur) document.activeElement.blur();

            const key = btn.getAttribute('data-col-key'); // "Int" | "Percent" | "Rate"
            const values = getColumnValuesByKey(key);
            const payload = values.join('\n'); // one column, one value per line

            try {
                await copyPlain(payload);
                if (status) {
                    status.textContent = `Copied ${key} (${currentDatasetName}) — ${values.length} rows`;
                    setTimeout(() => (status.textContent = ''), 2500);
                }
            } catch {
                if (status) {
                    status.textContent = 'Copy failed. Try selecting manually and Ctrl/Cmd+C.';
                    setTimeout(() => (status.textContent = ''), 4000);
                }
            }
        });
    });

    // Load datasets (exactly as in your CSV)
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
