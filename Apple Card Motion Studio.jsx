/*
  Apple Card Motion Studio — editable card-layer motion presets for EffectCraft.
  Select card artwork/text layers in a composition, choose a motion preset, then apply.
  This panel animates native layer transforms only; it does not flatten or replace content.
*/
(function (thisObj) {
    var TITLE = "Apple Card Motion Studio";
    var PRESETS = [];
    var END = [1, 0, 0, 1, 1, 0]; // normalized time, x%, y%, scale, opacity, Z rotation

    function add(category, name, description, states) {
        PRESETS.push({ category: category, name: name, description: description, states: states });
    }

    // Apple-inspired motion: quick, controlled entries, restrained overshoot, clean settles.
    // Translation offsets are relative to comp dimensions; all presets settle at the original transform.
    var C = "Slide & Reveal", P = "Scale & Settle", D = "Stack & Cascade", F = "Float & Tilt", G = "Apple Signature", X = "Exit / Dismiss";
    add(C, "01 · Clean Rise", "Naik halus · rapi", [[0, 0, 0.07, 0.99, 0, 0], [0.76, 0, -0.004, 1.006, 0.9, 0], END]);
    add(C, "02 · Glide from Left", "Geser pendek dari kiri", [[0, -0.12, 0, 0.99, 0, 0], [0.78, 0.004, 0, 1.006, 0.9, 0], END]);
    add(C, "03 · Glide from Right", "Geser pendek dari kanan", [[0, 0.12, 0, 0.99, 0, 0], [0.78, -0.004, 0, 1.006, 0.9, 0], END]);
    add(C, "04 · Soft Reveal", "Fade + naik sedikit", [[0, 0, 0.045, 1, 0, 0], [0.78, 0, 0, 1.008, 0.88, 0], END]);
    add(P, "05 · Focus In", "Zoom masuk · tanpa hentakan", [[0, 0, 0, 0.9, 0, 0], [0.78, 0, 0, 1.008, 0.9, 0], END]);
    add(P, "06 · Soft Pop", "Pop kecil · overshoot terkendali", [[0, 0, 0, 0.94, 0, 0], [0.7, 0, 0, 1.022, 0.9, 0], [0.88, 0, 0, 0.998, 1, 0], END]);
    add(P, "07 · Expand & Land", "Kartu membesar tipis lalu settle", [[0, 0, 0.015, 1.06, 0, 0], [0.72, 0, 0, 0.994, 0.9, 0], END]);
    add(D, "08 · Card Cascade", "Kartu masuk berurutan", [[0, 0, 0.11, 0.94, 0, 0], [0.72, 0, -0.01, 1.018, 0.88, 0], [0.88, 0, 0.003, 0.997, 1, 0], END]);
    add(D, "09 · Layered Stack", "Tumpukan kartu · masuk dari samping", [[0, 0.10, 0.025, 0.95, 0, 3], [0.72, -0.008, 0, 1.018, 0.9, -0.5], [0.9, 0, 0, 0.999, 1, 0], END]);
    add(D, "10 · Fan In", "Kartu berputar ringan saat masuk", [[0, -0.08, 0.055, 0.94, 0, -4], [0.72, 0.006, -0.006, 1.018, 0.9, 0.8], [0.9, 0, 0, 0.999, 1, 0], END]);
    add(F, "11 · Airy Drift", "Melayang dari kanan", [[0, 0.055, 0.035, 0.97, 0, 2.5], [0.76, -0.004, 0, 1.01, 0.9, -0.3], END]);
    add(F, "12 · Gentle Tilt", "Miring tipis lalu tegak", [[0, 0, 0.035, 0.98, 0, -3.5], [0.72, 0, 0, 1.012, 0.9, 0.6], [0.9, 0, 0, 0.999, 1, 0], END]);

    // Short, restrained signatures: default duration is ~10 frames at 30 fps.
    add(G, "13 · Quiet Arrival", "Angkat tipis · settle hampir tanpa overshoot", [[0, 0, 0.035, 0.99, 0, 0], [0.78, 0, -0.002, 1.004, 0.9, 0], END]);
    add(G, "14 · Soft Focus", "Fade + zoom sangat lembut", [[0, 0, 0.012, 0.965, 0, 0], [0.76, 0, 0, 1.008, 0.9, 0], END]);
    add(G, "15 · Precision Lift", "Naik pendek · berhenti bersih", [[0, 0, 0.055, 1, 0, 0], [0.82, 0, 0, 1.004, 0.92, 0], END]);
    add(G, "16 · Airy Settle", "Drift diagonal · gerak ringan", [[0, -0.025, 0.02, 0.985, 0, 0], [0.8, 0.002, 0, 1.006, 0.9, 0], END]);
    add(G, "17 · Minimal Slide", "Geser pendek · fade cepat", [[0, 0.04, 0, 1, 0, 0], [0.74, -0.002, 0, 1.004, 0.9, 0], END]);

    add(C, "18 · Maskless Rise", "Kartu naik dari bawah · tanpa mask", [[0, 0, 0.075, 1, 0, 0], [0.76, 0, 0, 1.006, 0.9, 0], END]);
    add(C, "19 · Short Cross-Slide", "Cross-slide kecil dari kiri", [[0, -0.095, 0, 0.99, 0, 0], [0.76, 0.003, 0, 1.006, 0.9, 0], END]);
    add(C, "20 · Gentle Drift Down", "Turun pendek · fade-in halus", [[0, 0, -0.045, 0.99, 0, 0], [0.78, 0, 0.002, 1.005, 0.9, 0], END]);

    add(P, "21 · Soft Zoom", "Scale 96% ke 100% · clean", [[0, 0, 0, 0.96, 0, 0], [0.78, 0, 0, 1.006, 0.9, 0], END]);
    add(P, "22 · Focus Pull", "Sedikit out-of-focus feel lewat scale + opacity", [[0, 0, 0, 0.92, 0, 0], [0.74, 0, 0, 1.01, 0.92, 0], END]);
    add(P, "23 · Scale Up to Place", "Muncul kecil · mendarat tanpa pop besar", [[0, 0, 0, 0.9, 0, 0], [0.76, 0, 0, 1.012, 0.92, 0], END]);

    add(D, "24 · Fan Cascade", "Fan ringan · stagger cocok untuk deck", [[0, 0.065, 0.035, 0.975, 0, 2.5], [0.72, -0.004, 0, 1.014, 0.88, -0.4], [0.9, 0, 0, 1, 1, 0], END]);
    add(D, "25 · Deck Reveal", "Kartu belakang ke depan · overlap halus", [[0, -0.07, 0.025, 0.96, 0, -2.5], [0.7, 0.006, 0, 1.018, 0.9, 0.5], [0.9, 0, 0, 1, 1, 0], END]);

    add(F, "26 · Edge Tilt", "Tilt kecil · tegak kembali", [[0, 0.025, 0.025, 0.99, 0, 3], [0.75, -0.002, 0, 1.006, 0.9, -0.3], END]);
    add(F, "27 · Hover Land", "Melayang turun sedikit ke posisi akhir", [[0, 0, -0.055, 0.985, 0, 0], [0.78, 0, 0.002, 1.006, 0.92, 0], END]);

    add(X, "28 · Dismiss · Fade", "Keluar dengan fade singkat", [[0, 0, 0, 1, 1, 0], [0.68, 0, 0, 0.995, 0.52, 0], [1, 0, 0, 0.99, 0, 0]]);
    add(X, "29 · Dismiss · Up", "Geser naik + fade", [[0, 0, 0, 1, 1, 0], [1, 0, -0.075, 0.985, 0, 0]]);
    add(X, "30 · Dismiss · Left", "Keluar ke kiri · fade halus", [[0, 0, 0, 1, 1, 0], [0.82, -0.065, 0, 0.99, 0.25, 0], [1, -0.09, 0, 0.98, 0, 0]]);

    var ui = (thisObj instanceof Panel) ? thisObj : new Window("palette", TITLE, undefined, { resizeable: true });
    ui.orientation = "column";
    ui.alignChildren = ["fill", "top"];
    ui.spacing = 8;
    ui.margins = 12;
    ui.minimumSize = [360, 560];

    var header = ui.add("panel", undefined, "APPLE-STYLE CARD MOTION");
    header.orientation = "column";
    header.alignChildren = ["fill", "top"];
    header.spacing = 4;
    header.margins = 10;
    header.add("statictext", undefined, "30 motion preset Apple-inspired · entry & exit");
    header.add("statictext", undefined, "Teks dan artwork tetap editable · tanpa flatten / render ulang");

    var browse = ui.add("panel", undefined, "CARI PRESET");
    browse.orientation = "column";
    browse.alignChildren = ["fill", "top"];
    browse.spacing = 6;
    browse.margins = 10;
    var categoryRow = browse.add("group");
    categoryRow.orientation = "row";
    categoryRow.alignChildren = ["left", "center"];
    categoryRow.add("statictext", undefined, "Kategori");
    var category = categoryRow.add("dropdownlist", undefined, ["Semua 30", C, P, D, F, G, X]);
    category.selection = 0;
    category.alignment = ["fill", "center"];
    var search = browse.add("edittext", undefined, "");
    search.helpTip = "Cari nama atau jenis gerak kartu";
    search.minimumSize.height = 25;
    var resultText = browse.add("statictext", undefined, "30 preset gerak kartu");

    var catalog = ui.add("panel", undefined, "MOTION PRESETS");
    catalog.orientation = "column";
    catalog.alignChildren = ["fill", "top"];
    catalog.spacing = 7;
    catalog.margins = 10;
    var grid = catalog.add("group");
    grid.orientation = "column";
    grid.alignChildren = ["fill", "top"];
    grid.spacing = 7;
    var cards = [];

    function styleCard(panel) {
        panel.onDraw = function () {
            try {
                var g = this.graphics;
                var b = g.newBrush(g.BrushType.SOLID_COLOR, [0.13, 0.14, 0.17, 1]);
                try { g.fillRoundRect(b, 0, 0, this.size.width, this.size.height, 9, 9); }
                catch (eRound) { g.fillRect(b, 0, 0, this.size.width, this.size.height); }
            } catch (eDraw) {}
        };
    }
    var r, c;
    for (r = 0; r < 3; r++) {
        var row = grid.add("group");
        row.orientation = "row";
        row.alignChildren = ["fill", "top"];
        row.spacing = 7;
        for (c = 0; c < 2; c++) {
            var panel = row.add("panel", undefined, "");
            panel.orientation = "column";
            panel.alignChildren = ["fill", "top"];
            panel.spacing = 3;
            panel.margins = 8;
            panel.preferredSize = [158, 112];
            styleCard(panel);
            var title = panel.add("statictext", undefined, "Preset name", { multiline: true });
            title.minimumSize.height = 32;
            var desc = panel.add("statictext", undefined, "Card motion");
            var button = panel.add("button", undefined, "Terapkan ke layer");
            button.preferredSize.height = 25;
            cards.push({ panel: panel, title: title, desc: desc, button: button, presetIndex: -1 });
        }
    }
    var pageRow = catalog.add("group");
    pageRow.orientation = "row";
    pageRow.alignChildren = ["center", "center"];
    pageRow.alignment = ["center", "top"];
    var prev = pageRow.add("button", undefined, "‹ Kembali");
    var pageLabel = pageRow.add("statictext", undefined, "1 / 2");
    var next = pageRow.add("button", undefined, "Lanjut ›");

    var settings = ui.add("panel", undefined, "TIMING & URUTAN");
    settings.orientation = "column";
    settings.alignChildren = ["fill", "top"];
    settings.spacing = 6;
    settings.margins = 10;
    var timingRow = settings.add("group");
    timingRow.orientation = "row";
    timingRow.alignChildren = ["left", "center"];
    timingRow.add("statictext", undefined, "Durasi");
    var durationInput = timingRow.add("edittext", undefined, "0.32");
    durationInput.characters = 6;
    timingRow.add("statictext", undefined, "detik");
    timingRow.add("statictext", undefined, "  Jarak stagger");
    var staggerInput = timingRow.add("edittext", undefined, "0.08");
    staggerInput.characters = 6;
    timingRow.add("statictext", undefined, "detik");
    var orderRow = settings.add("group");
    orderRow.orientation = "row";
    orderRow.alignChildren = ["left", "center"];
    orderRow.add("statictext", undefined, "Urutan layer");
    var order = orderRow.add("dropdownlist", undefined, ["Urutan timeline", "Terbalik"]);
    order.selection = 0;
    order.alignment = ["fill", "center"];

    var statusCard = ui.add("panel", undefined, "STATUS");
    statusCard.orientation = "column";
    statusCard.alignChildren = ["fill", "top"];
    statusCard.margins = 10;
    var status = statusCard.add("statictext", undefined, "Pilih satu atau beberapa layer kartu, lalu klik preset.", { multiline: true });
    status.minimumSize.height = 34;

    var pageSize = 6, currentPage = 0, filtered = [];
    function refresh() {
        var cat = category.selection ? category.selection.text : "Semua 30";
        var q = String(search.text || "").toLowerCase();
        filtered = [];
        var i;
        for (i = 0; i < PRESETS.length; i++) {
            if (cat !== "Semua 30" && PRESETS[i].category !== cat) continue;
            if (q && PRESETS[i].name.toLowerCase().indexOf(q) < 0 && PRESETS[i].description.toLowerCase().indexOf(q) < 0 && PRESETS[i].category.toLowerCase().indexOf(q) < 0) continue;
            filtered.push(i);
        }
        var pages = Math.max(1, Math.ceil(filtered.length / pageSize));
        if (currentPage >= pages) currentPage = pages - 1;
        var start = currentPage * pageSize;
        for (i = 0; i < cards.length; i++) {
            var card = cards[i], at = start + i;
            if (at < filtered.length) {
                var ix = filtered[at], preset = PRESETS[ix];
                card.panel.visible = true;
                card.presetIndex = ix;
                card.title.text = preset.name.replace(/^\d+\s*·\s*/, "");
                card.desc.text = preset.description + " · stagger";
                card.button.onClick = (function (p) { return function () { applyPreset(p); }; })(ix);
            } else {
                card.panel.visible = false;
                card.presetIndex = -1;
            }
        }
        resultText.text = filtered.length + " preset tersedia · layer tetap editable";
        pageLabel.text = filtered.length ? (start + 1) + "–" + Math.min(start + pageSize, filtered.length) + " / " + filtered.length : "0 preset";
        prev.enabled = currentPage > 0;
        next.enabled = currentPage < pages - 1;
        if (!filtered.length) status.text = "Preset tidak ditemukan. Coba kata pencarian lain.";
    }

    function numberValue(input, fallback, min, max) {
        var n = parseFloat(input.text);
        if (isNaN(n)) n = fallback;
        if (n < min) n = min;
        if (n > max) n = max;
        input.text = String(n);
        return n;
    }
    function prop(group, matchName) {
        try { return group.property(matchName); } catch (e) { return null; }
    }
    function easeKey(property, key) {
        try {
            var value = property.value, dims = (value instanceof Array) ? value.length : 1;
            var incoming = [], outgoing = [], j;
            for (j = 0; j < dims; j++) {
                incoming.push(new KeyframeEase(0, 76));
                outgoing.push(new KeyframeEase(0, 76));
            }
            property.setTemporalEaseAtKey(key, incoming, outgoing);
            property.setInterpolationTypeAtKey(key, KeyframeInterpolationType.BEZIER, KeyframeInterpolationType.BEZIER);
        } catch (e) {}
    }
    function scaled(value, multiplier) {
        if (value instanceof Array) {
            var result = [], j;
            for (j = 0; j < value.length; j++) result.push(value[j] * multiplier);
            return result;
        }
        return value * multiplier;
    }
    function keyProperty(property, base, states, valueForState, start, duration) {
        if (!property || property.expressionEnabled) return false;
        var keys = [], i, t;
        for (i = 0; i < states.length; i++) {
            t = start + states[i][0] * duration;
            property.setValueAtTime(t, valueForState(base, states[i]));
            keys.push(property.nearestKeyIndex(t));
        }
        for (i = 0; i < keys.length; i++) easeKey(property, keys[i]);
        return true;
    }
    function animateLayer(layer, comp, preset, start, duration) {
        var transform = prop(layer, "ADBE Transform Group");
        if (!transform) return false;
        var position = prop(transform, "ADBE Position");
        var scale = prop(transform, "ADBE Scale");
        var opacity = prop(transform, "ADBE Opacity");
        var rotation = prop(transform, "ADBE Rotate Z") || prop(transform, "ADBE Rotation");
        var didApply = false, i;
        if (position && !position.dimensionsSeparated) {
            var basePosition = position.valueAtTime(start, false);
            didApply = keyProperty(position, basePosition, preset.states, function (base, state) {
                var v = [], j;
                for (j = 0; j < base.length; j++) v.push(base[j]);
                if (v.length > 0) v[0] += state[1] * comp.width;
                if (v.length > 1) v[1] += state[2] * comp.height;
                return v;
            }, start, duration) || didApply;
        } else if (position && position.dimensionsSeparated) {
            try {
                for (i = 0; i < 2; i++) {
                    var axis = position.getSeparationFollower(i);
                    if (axis) {
                        var axisIndex = i, baseAxis = axis.valueAtTime(start, false);
                        didApply = keyProperty(axis, baseAxis, preset.states, function (base, state) {
                            return base + (axisIndex === 0 ? state[1] * comp.width : state[2] * comp.height);
                        }, start, duration) || didApply;
                    }
                }
            } catch (eSeparated) {}
        }
        if (scale) {
            var baseScale = scale.valueAtTime(start, false);
            didApply = keyProperty(scale, baseScale, preset.states, function (base, state) { return scaled(base, state[3]); }, start, duration) || didApply;
        }
        if (opacity) {
            var baseOpacity = opacity.valueAtTime(start, false);
            didApply = keyProperty(opacity, baseOpacity, preset.states, function (base, state) { return base * state[4]; }, start, duration) || didApply;
        }
        if (rotation) {
            var baseRotation = rotation.valueAtTime(start, false);
            didApply = keyProperty(rotation, baseRotation, preset.states, function (base, state) { return base + state[5]; }, start, duration) || didApply;
        }
        return didApply;
    }
    function applyPreset(index) {
        var preset = PRESETS[index];
        var comp = app.project ? app.project.activeItem : null;
        if (!(comp instanceof CompItem)) {
            status.text = "Buka composition terlebih dahulu.";
            return;
        }
        var selected = comp.selectedLayers;
        if (!selected || !selected.length) {
            status.text = "Pilih layer kartu, teks, shape, atau artwork di timeline.";
            return;
        }
        var duration = numberValue(durationInput, 0.32, 0.1, 10);
        var stagger = numberValue(staggerInput, 0.08, 0, 2);
        var startTime = comp.time, applied = 0, skipped = 0, i, layer, offset, layerStart;
        app.beginUndoGroup("Card Motion · " + preset.name);
        try {
            for (i = 0; i < selected.length; i++) {
                layer = selected[i];
                offset = (order.selection && order.selection.index === 1) ? (selected.length - 1 - i) : i;
                layerStart = startTime + offset * stagger;
                try {
                    if (animateLayer(layer, comp, preset, layerStart, duration)) applied++;
                    else skipped++;
                } catch (layerError) { skipped++; }
            }
        } finally {
            app.endUndoGroup();
        }
        if (applied) status.text = "“" + preset.name + "” diterapkan ke " + applied + " layer mulai dari playhead. Stagger " + stagger + " dtk; teks dan isi layer tidak diubah." + (skipped ? " " + skipped + " layer dilewati." : "") + " Undo: Ctrl/Cmd+Z.";
        else status.text = "Tidak ada layer yang berhasil dianimasikan. Periksa layer terpilih dan expression pada transform.";
    }

    category.onChange = function () { currentPage = 0; refresh(); };
    search.onChanging = function () { currentPage = 0; refresh(); };
    prev.onClick = function () { if (currentPage > 0) currentPage--; refresh(); };
    next.onClick = function () { currentPage++; refresh(); };
    refresh();

    if (ui instanceof Window) {
        ui.onResizing = ui.onResize = function () { this.layout.resize(); };
        ui.center();
        ui.show();
    } else {
        ui.layout.layout(true);
    }
})(this);
