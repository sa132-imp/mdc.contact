(function () {
    // ---- Embedded datasets (from your CSV). Dates normalized to YYYY-MM-DD.
    const DATASETS = {
        "Hospital 1": [{ "Date": "2023-04-01", "Int": 1352, "Percent": 0.615983068, "Rate": 6.88 }, { "Date": "2023-05-01", "Int": 1362, "Percent": 0.6239158, "Rate": 6.007142857 }, { "Date": "2023-06-01", "Int": 1395, "Percent": 0.623173615, "Rate": 5.595238095 }, { "Date": "2023-07-01", "Int": 1419, "Percent": 0.595833676, "Rate": 6.442857143 }, { "Date": "2023-08-01", "Int": 1406, "Percent": 0.606855327, "Rate": 6.045238095 }, { "Date": "2023-09-01", "Int": 1397, "Percent": 0.621026797, "Rate": 6.064285714 }, { "Date": "2023-10-01", "Int": 1361, "Percent": 0.565765328, "Rate": 5.702380952 }, { "Date": "2023-11-01", "Int": 1422, "Percent": 0.619065015, "Rate": 5.369047619 }, { "Date": "2023-12-01", "Int": 1391, "Percent": 0.595829096, "Rate": 7.280952381 }, { "Date": "2024-01-01", "Int": 1419, "Percent": 0.605851633, "Rate": 7.588095238 }, { "Date": "2024-02-01", "Int": 1398, "Percent": 0.606230916, "Rate": 6.634920635 }, { "Date": "2024-03-01", "Int": 1391, "Percent": 0.602777099, "Rate": 6.229166667 }, { "Date": "2024-04-01", "Int": 1385, "Percent": 0.62616052, "Rate": 6.262380952 }, { "Date": "2024-05-01", "Int": 1382, "Percent": 0.611980434, "Rate": 6.830952381 }, { "Date": "2024-06-01", "Int": 1366, "Percent": 0.630324104, "Rate": 7.266666667 }, { "Date": "2024-07-01", "Int": 1394, "Percent": 0.630979757, "Rate": 6.066666667 }, { "Date": "2024-08-01", "Int": 1403, "Percent": 0.632807557, "Rate": 6.113095238 }, { "Date": "2024-09-01", "Int": 1374, "Percent": 0.639697871, "Rate": 6.272619048 }, { "Date": "2024-10-01", "Int": 1364, "Percent": 0.61208052, "Rate": 6.192857143 }, { "Date": "2024-11-01", "Int": 1393, "Percent": 0.60870922, "Rate": 6.347619048 }, { "Date": "2024-12-01", "Int": 1387, "Percent": 0.608746713, "Rate": 6.547619048 }, { "Date": "2025-01-01", "Int": 1410, "Percent": 0.619159772, "Rate": 7.592857143 }, { "Date": "2025-02-01", "Int": 1392, "Percent": 0.61121296, "Rate": 8.29245283 }, { "Date": "2025-03-01", "Int": 1411, "Percent": 0.623796971, "Rate": 7.114285714 }, { "Date": "2025-04-01", "Int": 1411, "Percent": 0.618014819, "Rate": 7.021428571 }, { "Date": "2025-05-01", "Int": 1392, "Percent": 0.644758264, "Rate": 6.885714286 }, { "Date": "2025-06-01", "Int": 1385, "Percent": 0.642044821, "Rate": 6.626190476 }, { "Date": "2025-07-01", "Int": 1379, "Percent": 0.641503704, "Rate": 6.392857143 }],
        "Hospital 2": [{ "Date": "2023-04-01", "Int": 7136, "Percent": 0.724288165, "Rate": 8.578571429 }, { "Date": "2023-05-01", "Int": 7604, "Percent": 0.727483795, "Rate": 7.733333333 }, { "Date": "2023-06-01", "Int": 7909, "Percent": 0.713432735, "Rate": 7.969047619 }, { "Date": "2023-07-01", "Int": 7717, "Percent": 0.712925384, "Rate": 8.002380952 }, { "Date": "2023-08-01", "Int": 7341, "Percent": 0.695011413, "Rate": 8.202380952 }, { "Date": "2023-09-01", "Int": 7121, "Percent": 0.706847568, "Rate": 8.430952381 }, { "Date": "2023-10-01", "Int": 7641, "Percent": 0.687782381, "Rate": 8.438095238 }, { "Date": "2023-11-01", "Int": 7375, "Percent": 0.681704171, "Rate": 8.2 }, { "Date": "2023-12-01", "Int": 7366, "Percent": 0.687667662, "Rate": 9.569047619 }, { "Date": "2024-01-01", "Int": 7270, "Percent": 0.665503816, "Rate": 10.12619048 }, { "Date": "2024-02-01", "Int": 7613, "Percent": 0.673207642, "Rate": 11.05555556 }, { "Date": "2024-03-01", "Int": 7657, "Percent": 0.682453145, "Rate": 10.1 }, { "Date": "2024-04-01", "Int": 7739, "Percent": 0.687466215, "Rate": 11.49761905 }, { "Date": "2024-05-01", "Int": 7118, "Percent": 0.680158004, "Rate": 10.63333333 }, { "Date": "2024-06-01", "Int": 7181, "Percent": 0.683917162, "Rate": 11.61904762 }, { "Date": "2024-07-01", "Int": 7498, "Percent": 0.679022657, "Rate": 10.19285714 }, { "Date": "2024-08-01", "Int": 7414, "Percent": 0.681744064, "Rate": 9.807142857 }, { "Date": "2024-09-01", "Int": 7334, "Percent": 0.69098281, "Rate": 10.0452381 }, { "Date": "2024-10-01", "Int": 7272, "Percent": 0.676055692, "Rate": 9.642857143 }, { "Date": "2024-11-01", "Int": 7091, "Percent": 0.692190425, "Rate": 9.997619048 }, { "Date": "2024-12-01", "Int": 7129, "Percent": 0.689987203, "Rate": 9.995238095 }, { "Date": "2025-01-01", "Int": 7424, "Percent": 0.700145732, "Rate": 10.70238095 }, { "Date": "2025-02-01", "Int": 7069, "Percent": 0.695053031, "Rate": 10.92055556 }, { "Date": "2025-03-01", "Int": 7359, "Percent": 0.698197623, "Rate": 10.39285714 }, { "Date": "2025-04-01", "Int": 7250, "Percent": 0.694851981, "Rate": 10.66428571 }, { "Date": "2025-05-01", "Int": 7197, "Percent": 0.705378861, "Rate": 10.24047619 }, { "Date": "2025-06-01", "Int": 7111, "Percent": 0.707087338, "Rate": 9.807142857 }, { "Date": "2025-07-01", "Int": 7162, "Percent": 0.70247978, "Rate": 9.861904762 }],
        "Hospital 3": [{ "Date": "2023-04-01", "Int": 11100, "Percent": 0.686365261, "Rate": 3.767833333 }, { "Date": "2023-05-01", "Int": 11104, "Percent": 0.696992734, "Rate": 3.280892857 }, { "Date": "2023-06-01", "Int": 11143, "Percent": 0.703644352, "Rate": 2.970095238 }, { "Date": "2023-07-01", "Int": 11249, "Percent": 0.700448692, "Rate": 3.787595238 }, { "Date": "2023-08-01", "Int": 12188, "Percent": 0.666426425, "Rate": 4.021547619 }, { "Date": "2023-09-01", "Int": 11311, "Percent": 0.707017723, "Rate": 4.327142857 }, { "Date": "2023-10-01", "Int": 12053, "Percent": 0.701519564, "Rate": 4.395238095 }, { "Date": "2023-11-01", "Int": 11588, "Percent": 0.708283799, "Rate": 4.748333333 }, { "Date": "2023-12-01", "Int": 11358, "Percent": 0.708748225, "Rate": 5.402142857 }, { "Date": "2024-01-01", "Int": 11421, "Percent": 0.710088237, "Rate": 5.230952381 }, { "Date": "2024-02-01", "Int": 11680, "Percent": 0.714090098, "Rate": 5.74047619 }, { "Date": "2024-03-01", "Int": 12125, "Percent": 0.694687171, "Rate": 5.7375 }, { "Date": "2024-04-01", "Int": 11862, "Percent": 0.701671521, "Rate": 5.588333333 }, { "Date": "2024-05-01", "Int": 11492, "Percent": 0.706501578, "Rate": 5.935238095 }, { "Date": "2024-06-01", "Int": 11293, "Percent": 0.706410325, "Rate": 5.847619048 }, { "Date": "2024-07-01", "Int": 11262, "Percent": 0.709117976, "Rate": 5.277380952 }, { "Date": "2024-08-01", "Int": 11284, "Percent": 0.704793904, "Rate": 5.124404762 }, { "Date": "2024-09-01", "Int": 11720, "Percent": 0.706357524, "Rate": 4.90047619 }, { "Date": "2024-10-01", "Int": 11488, "Percent": 0.708814913, "Rate": 5.0625 }, { "Date": "2024-11-01", "Int": 11252, "Percent": 0.709292099, "Rate": 5.297619048 }, { "Date": "2024-12-01", "Int": 11281, "Percent": 0.70998173, "Rate": 5.348809524 }, { "Date": "2025-01-01", "Int": 11096, "Percent": 0.71160078, "Rate": 5.108333333 }, { "Date": "2025-02-01", "Int": 11578, "Percent": 0.712445887, "Rate": 5.761111111 }, { "Date": "2025-03-01", "Int": 11644, "Percent": 0.708861084, "Rate": 5.955357143 }, { "Date": "2025-04-01", "Int": 11268, "Percent": 0.710875723, "Rate": 5.891666667 }, { "Date": "2025-05-01", "Int": 11131, "Percent": 0.718376196, "Rate": 5.841666667 }, { "Date": "2025-06-01", "Int": 11369, "Percent": 0.717094445, "Rate": 5.4 }, { "Date": "2025-07-01", "Int": 11303, "Percent": 0.716765185, "Rate": 5.177380952 }],
        "Hospital 4": [{ "Date": "2023-04-01", "Int": 3925, "Percent": 0.625107653, "Rate": 3.132452381 }, { "Date": "2023-05-01", "Int": 3902, "Percent": 0.639099251, "Rate": 2.08397619 }, { "Date": "2023-06-01", "Int": 3951, "Percent": 0.631839355, "Rate": 1.790714286 }, { "Date": "2023-07-01", "Int": 4602, "Percent": 0.620830512, "Rate": 2.580714286 }, { "Date": "2023-08-01", "Int": 3938, "Percent": 0.613211005, "Rate": 1.289833333 }, { "Date": "2023-09-01", "Int": 3972, "Percent": 0.620632639, "Rate": 1.444833333 }, { "Date": "2023-10-01", "Int": 3933, "Percent": 0.630868145, "Rate": 1.220142857 }, { "Date": "2023-11-01", "Int": 3925, "Percent": 0.62930425, "Rate": 1.675833333 }, { "Date": "2023-12-01", "Int": 4203, "Percent": 0.623472649, "Rate": 2.424761905 }, { "Date": "2024-01-01", "Int": 3932, "Percent": 0.63441786, "Rate": 2.220238095 }, { "Date": "2024-02-01", "Int": 3916, "Percent": 0.630173906, "Rate": 2.227142857 }, { "Date": "2024-03-01", "Int": 3928, "Percent": 0.633026972, "Rate": 2.232738095 }, { "Date": "2024-04-01", "Int": 3927, "Percent": 0.638031395, "Rate": 2.268690476 }, { "Date": "2024-05-01", "Int": 3944, "Percent": 0.641183792, "Rate": 2.44452381 }, { "Date": "2024-06-01", "Int": 4098, "Percent": 0.637224849, "Rate": 2.421666667 }, { "Date": "2024-07-01", "Int": 3943, "Percent": 0.64436181, "Rate": 2.352642857 }, { "Date": "2024-08-01", "Int": 4028, "Percent": 0.648270837, "Rate": 2.501666667 }, { "Date": "2024-09-01", "Int": 3925, "Percent": 0.651018976, "Rate": 2.647047619 }, { "Date": "2024-10-01", "Int": 3923, "Percent": 0.645051944, "Rate": 2.745238095 }, { "Date": "2024-11-01", "Int": 3979, "Percent": 0.649811088, "Rate": 2.580357143 }, { "Date": "2024-12-01", "Int": 3968, "Percent": 0.646838555, "Rate": 2.3875 }, { "Date": "2025-01-01", "Int": 3928, "Percent": 0.650117084, "Rate": 2.309880952 }, { "Date": "2025-02-01", "Int": 3941, "Percent": 0.65505782, "Rate": 2.358888889 }, { "Date": "2025-03-01", "Int": 3935, "Percent": 0.65370589, "Rate": 2.463571429 }, { "Date": "2025-04-01", "Int": 3943, "Percent": 0.656875429, "Rate": 2.513928571 }, { "Date": "2025-05-01", "Int": 3938, "Percent": 0.660643272, "Rate": 2.48 }, { "Date": "2025-06-01", "Int": 3936, "Percent": 0.660328538, "Rate": 2.530714286 }, { "Date": "2025-07-01", "Int": 3931, "Percent": 0.661192777, "Rate": 2.587142857 }]
    };

    const table = document.getElementById('data');
    const tbody = table.querySelector('tbody');
    const status = document.getElementById('copy-status');
    const segButtons = document.querySelectorAll('.seg-btn');
    const copyButtons = document.querySelectorAll('.copy-col-btn');

    let currentDatasetName = 'Hospital 1';
    let currentRows = DATASETS[currentDatasetName];

    function renderRows(rows) {
        // Render without rounding; show raw values
        const html = rows.map(r => {
            return `<tr>
        <td>${r.Date}</td>
        <td>${r.Int}</td>
        <td>${r.Percent}</td>
        <td>${r.Rate}</td>
        <td></td>
      </tr>`;
        }).join('');
        tbody.innerHTML = html;
    }

    function setActiveDataset(name) {
        currentDatasetName = name;
        currentRows = DATASETS[name] || [];
        renderRows(currentRows);

        segButtons.forEach(b => b.classList.toggle('is-active', b.getAttribute('data-ds') === name));
    }

    function getColumnValuesByKey(key) {
        // Return raw underlying values; skip blanks/nulls
        const values = [];
        for (const r of currentRows) {
            const v = r[key];
            if (v === null || v === undefined || String(v).trim() === '') continue;
            values.push(String(v));
        }
        return values;
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
            setActiveDataset(ds);
        });
    });

    // Hook: copy buttons (copy a single column by key)
    copyButtons.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();

            // Clear any current selection to avoid copying the whole table
            const sel = window.getSelection && window.getSelection();
            if (sel && sel.removeAllRanges) sel.removeAllRanges();
            if (document.activeElement && document.activeElement.blur) document.activeElement.blur();

            const key = btn.getAttribute('data-col-key'); // "Int" | "Percent" | "Rate"
            const values = getColumnValuesByKey(key);
            const payload = values.join('\n');

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

    // Initial render
    renderRows(currentRows);
})();
