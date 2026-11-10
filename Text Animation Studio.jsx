/*
  Text Animation Studio — 60 clean, Apple-inspired text entrances for EffectCraft.
  Install this .jsx as a ScriptUI panel. Select one or more text layers, place
  the playhead at the desired start, choose a preset, then click Apply.
  Uses standard After Effects scripting objects supported by EffectCraft.
*/
(function (thisObj) {
    var TITLE = "Text Animation Studio";
    var PRESETS = [];
    var FINAL = [1, 0, 0, 1, 1, 0]; // time, x%, y%, scale multiplier, opacity multiplier, Z rotation

    function add(category, name, states) {
        PRESETS.push({ category: category, name: name, states: states });
    }

    // State format: [time 0..1, x offset as comp-width fraction, y as comp-height
    // fraction, scale multiplier, opacity multiplier, rotation offset in degrees].
    // Every preset settles back to the layer's original transform values.
    var F = "Fade & Reveal", S = "Slide & Drift", Z = "Scale & Pop";
    var R = "Rotate & Flip", B = "Bounce & Spring", A = "Apple Signature";

    add(F, "01 · Soft Fade", [[0, 0, 0, 1, 0, 0], FINAL]);
    add(F, "02 · Fade Up", [[0, 0, 0.055, 1, 0, 0], FINAL]);
    add(F, "03 · Fade Down", [[0, 0, -0.055, 1, 0, 0], FINAL]);
    add(F, "04 · Fade from Left", [[0, -0.07, 0, 1, 0, 0], FINAL]);
    add(F, "05 · Fade from Right", [[0, 0.07, 0, 1, 0, 0], FINAL]);
    add(F, "06 · Fade + Gentle Rise", [[0, 0, 0.09, 1, 0, 0], [0.72, 0, -0.008, 1, 0.82, 0], FINAL]);
    add(F, "07 · Fade + Settle", [[0, 0, 0.025, 0.97, 0, 0], [0.76, 0, 0, 1.012, 0.86, 0], FINAL]);
    add(F, "08 · Fade + Micro Zoom", [[0, 0, 0, 0.94, 0, 0], [0.78, 0, 0, 1.015, 0.84, 0], FINAL]);
    add(F, "09 · Fade + Tilt In", [[0, 0, 0.025, 1, 0, -5], [0.76, 0, 0, 1, 0.86, 0], FINAL]);
    add(F, "10 · Fade + Float", [[0, 0, 0.035, 0.985, 0, 0], [0.68, 0, -0.006, 1.01, 0.8, 0], FINAL]);

    add(S, "11 · Slide Up", [[0, 0, 0.12, 1, 1, 0], FINAL]);
    add(S, "12 · Slide Down", [[0, 0, -0.12, 1, 1, 0], FINAL]);
    add(S, "13 · Slide from Left", [[0, -0.16, 0, 1, 1, 0], FINAL]);
    add(S, "14 · Slide from Right", [[0, 0.16, 0, 1, 1, 0], FINAL]);
    add(S, "15 · Short Rise", [[0, 0, 0.045, 1, 1, 0], FINAL]);
    add(S, "16 · Short Drift Left", [[0, -0.055, 0, 1, 1, 0], FINAL]);
    add(S, "17 · Short Drift Right", [[0, 0.055, 0, 1, 1, 0], FINAL]);
    add(S, "18 · Diagonal Rise", [[0, -0.065, 0.075, 1, 1, 0], FINAL]);
    add(S, "19 · Diagonal from Right", [[0, 0.065, 0.075, 1, 1, 0], FINAL]);
    add(S, "20 · Float Up & Settle", [[0, 0, 0.08, 1, 1, 0], [0.72, 0, -0.009, 1, 1, 0], FINAL]);

    add(Z, "21 · Zoom In", [[0, 0, 0, 0.72, 1, 0], FINAL]);
    add(Z, "22 · Zoom from Small", [[0, 0, 0, 0.5, 1, 0], FINAL]);
    add(Z, "23 · Gentle Zoom", [[0, 0, 0, 0.88, 1, 0], FINAL]);
    add(Z, "24 · Zoom + Fade", [[0, 0, 0, 0.76, 0, 0], FINAL]);
    add(Z, "25 · Mini Pop", [[0, 0, 0, 0.94, 0, 0], [0.72, 0, 0, 1.035, 0.88, 0], FINAL]);
    add(Z, "26 · Pop from Tiny", [[0, 0, 0, 0.36, 0, 0], [0.7, 0, 0, 1.06, 0.9, 0], FINAL]);
    add(Z, "27 · Overscale Settle", [[0, 0, 0, 1.24, 0, 0], [0.72, 0, 0, 0.97, 0.86, 0], FINAL]);
    add(Z, "28 · Zoom + Rise", [[0, 0, 0.07, 0.8, 0, 0], FINAL]);
    add(Z, "29 · Zoom + Drift Left", [[0, -0.045, 0, 0.82, 0, 0], FINAL]);
    add(Z, "30 · Soft Pulse In", [[0, 0, 0, 0.9, 0, 0], [0.7, 0, 0, 1.025, 0.88, 0], FINAL]);

    add(R, "31 · Rotate In · Clockwise", [[0, 0, 0, 1, 1, -24], FINAL]);
    add(R, "32 · Rotate In · Counterclockwise", [[0, 0, 0, 1, 1, 24], FINAL]);
    add(R, "33 · Tiny Tilt Left", [[0, 0, 0, 1, 0, -8], FINAL]);
    add(R, "34 · Tiny Tilt Right", [[0, 0, 0, 1, 0, 8], FINAL]);
    add(R, "35 · Tilt + Fade", [[0, 0, 0, 1, 0, -15], FINAL]);
    add(R, "36 · Turn + Rise", [[0, 0, 0.055, 1, 0, 12], FINAL]);
    add(R, "37 · Squeeze & Expand", [[0, 0, 0, 0.06, 0, 0], [0.72, 0, 0, 1.06, 0.88, 0], FINAL]);
    add(R, "38 · Tiny Scale + Fade", [[0, 0, 0, 0.12, 0, 0], FINAL]);
    add(R, "39 · Lean + Slide", [[0, -0.06, 0.025, 1, 1, -10], FINAL]);
    add(R, "40 · Twist + Settle", [[0, 0, 0.02, 0.9, 0, 10], [0.72, 0, 0, 1.025, 0.88, -2], FINAL]);

    add(B, "41 · Soft Bounce Up", [[0, 0, 0.095, 1, 1, 0], [0.72, 0, -0.018, 1, 1, 0], [0.88, 0, 0.006, 1, 1, 0], FINAL]);
    add(B, "42 · Soft Bounce from Left", [[0, -0.1, 0, 1, 1, 0], [0.72, 0.018, 0, 1, 1, 0], [0.88, -0.006, 0, 1, 1, 0], FINAL]);
    add(B, "43 · Pop Bounce", [[0, 0, 0, 0.68, 0, 0], [0.68, 0, 0, 1.09, 0.9, 0], [0.86, 0, 0, 0.98, 1, 0], FINAL]);
    add(B, "44 · Gentle Spring", [[0, 0, 0.04, 0.92, 0, 0], [0.64, 0, -0.012, 1.045, 0.84, 0], [0.84, 0, 0.004, 0.99, 1, 0], FINAL]);
    add(B, "45 · Spring from Right", [[0, 0.1, 0, 0.96, 1, 0], [0.68, -0.014, 0, 1.02, 1, 0], [0.86, 0.004, 0, 0.995, 1, 0], FINAL]);
    add(B, "46 · Elastic Rise", [[0, 0, 0.1, 0.88, 0, 0], [0.62, 0, -0.018, 1.06, 0.82, 0], [0.83, 0, 0.008, 0.985, 1, 0], FINAL]);
    add(B, "47 · Overshoot from Left", [[0, -0.11, 0, 1, 1, 0], [0.7, 0.02, 0, 1, 1, 0], [0.87, -0.006, 0, 1, 1, 0], FINAL]);
    add(B, "48 · Overshoot from Right", [[0, 0.11, 0, 1, 1, 0], [0.7, -0.02, 0, 1, 1, 0], [0.87, 0.006, 0, 1, 1, 0], FINAL]);
    add(B, "49 · Bounce + Fade", [[0, 0, 0.07, 0.94, 0, 0], [0.7, 0, -0.012, 1.04, 0.88, 0], [0.87, 0, 0.004, 0.99, 1, 0], FINAL]);
    add(B, "50 · Floaty Spring", [[0, 0, 0.06, 0.97, 0, 0], [0.65, 0, -0.01, 1.02, 0.84, 0], [0.84, 0, 0.003, 0.995, 1, 0], FINAL]);

    add(A, "51 · Signature · Quiet Rise", [[0, 0, 0.035, 0.985, 0, 0], [0.78, 0, -0.003, 1.008, 0.9, 0], FINAL]);
    add(A, "52 · Signature · Airy Drift", [[0, 0.025, 0.025, 0.97, 0, 0], [0.76, -0.004, 0, 1.01, 0.88, 0], FINAL]);
    add(A, "53 · Signature · Focus In", [[0, 0, 0, 0.92, 0, 0], [0.7, 0, 0, 1.018, 0.88, 0], FINAL]);
    add(A, "54 · Signature · Rise & Breathe", [[0, 0, 0.065, 0.97, 0, 0], [0.68, 0, -0.006, 1.018, 0.82, 0], FINAL]);
    add(A, "55 · Signature · Soft Arrival", [[0, -0.035, 0.018, 0.985, 0, -2], [0.78, 0.002, 0, 1.01, 0.9, 0], FINAL]);
    add(A, "56 · Signature · Clean Slide", [[0, 0.045, 0.018, 1, 0, 0], [0.74, -0.003, 0, 1.008, 0.86, 0], FINAL]);
    add(A, "57 · Signature · Minimal Pop", [[0, 0, 0, 0.95, 0, 0], [0.72, 0, 0, 1.02, 0.88, 0], FINAL]);
    add(A, "58 · Signature · Upward Bloom", [[0, 0, 0.07, 0.9, 0, 0], [0.72, 0, -0.004, 1.02, 0.87, 0], FINAL]);
    add(A, "59 · Signature · Modern Tilt", [[0, 0, 0.025, 0.96, 0, 4], [0.74, 0, 0, 1.012, 0.86, -1], FINAL]);
    add(A, "60 · Signature · Word-by-Word Drop", [[0, 0, 0, 1, 0, 0], FINAL]);
    PRESETS[PRESETS.length - 1].wordDrop = true;

    var ui = (thisObj instanceof Panel) ? thisObj : new Window("palette", TITLE, undefined, { resizeable: true });
    ui.orientation = "column";
    ui.alignChildren = ["fill", "top"];
    ui.spacing = 8;
    ui.margins = 12;
    ui.minimumSize = [350, 620];

    var headerCard = ui.add("panel", undefined, "TEXT ANIMATION STUDIO");
    headerCard.orientation = "column";
    headerCard.alignChildren = ["fill", "top"];
    headerCard.margins = 10;
    var intro = headerCard.add("statictext", undefined, "60 preset motion yang halus · terinspirasi Apple");

    var previewCard = ui.add("panel", undefined, "LIVE PREVIEW");
    previewCard.orientation = "column";
    previewCard.alignChildren = ["fill", "top"];
    previewCard.spacing = 6;
    previewCard.margins = 10;
    var previewCanvas = previewCard.add("panel", undefined, "");
    previewCanvas.preferredSize = [320, 112];
    previewCanvas.minimumSize.height = 90;
    var previewInputRow = previewCard.add("group");
    previewInputRow.orientation = "row";
    previewInputRow.alignChildren = ["fill", "center"];
    previewInputRow.add("statictext", undefined, "Teks");
    var previewTextInput = previewInputRow.add("edittext", undefined, "Think Different");
    previewTextInput.characters = 18;
    var previewControlRow = previewCard.add("group");
    previewControlRow.orientation = "row";
    previewControlRow.alignChildren = ["left", "center"];
    var previewToggle = previewControlRow.add("checkbox", undefined, "Preview ON");
    previewToggle.value = true;
    previewControlRow.add("statictext", undefined, "Scrub");
    var previewProgress = previewControlRow.add("slider", undefined, 55, 0, 100);
    previewProgress.alignment = ["fill", "center"];

    var presetCard = ui.add("panel", undefined, "PILIH ANIMASI");
    presetCard.orientation = "column";
    presetCard.alignChildren = ["fill", "top"];
    presetCard.spacing = 6;
    presetCard.margins = 10;
    var categoryRow = presetCard.add("group");
    categoryRow.orientation = "row";
    categoryRow.alignChildren = ["left", "center"];
    categoryRow.add("statictext", undefined, "Kategori");
    var category = categoryRow.add("dropdownlist", undefined, ["Semua 60", F, S, Z, R, B, A]);
    category.selection = 0;
    category.alignment = ["fill", "center"];
    var search = presetCard.add("edittext", undefined, "");
    search.helpTip = "Ketik untuk mencari preset berdasarkan nama";
    search.minimumSize.height = 25;
    var list = presetCard.add("listbox", undefined, [], { multiselect: false });
    list.preferredSize = [320, 175];
    list.minimumSize.height = 115;
    var detail = presetCard.add("statictext", undefined, "Pilih preset untuk melihat deskripsi.", { multiline: true });
    detail.minimumSize.height = 30;

    var applyCard = ui.add("panel", undefined, "PENERAPAN");
    applyCard.orientation = "column";
    applyCard.alignChildren = ["fill", "top"];
    applyCard.spacing = 6;
    applyCard.margins = 10;
    var durationRow = applyCard.add("group");
    durationRow.orientation = "row";
    durationRow.alignChildren = ["left", "center"];
    durationRow.add("statictext", undefined, "Durasi animasi (detik)");
    var durationInput = durationRow.add("edittext", undefined, "0.8");
    durationInput.characters = 6;
    durationInput.helpTip = "Durasi animasi, dari 0,1 hingga 20 detik";
    var applyButton = applyCard.add("button", undefined, "Terapkan ke Text Layer Terpilih");
    applyButton.preferredSize.height = 34;
    var status = applyCard.add("statictext", undefined, "Pilih text layer, lalu tentukan waktu mulai lewat playhead.", { multiline: true });
    status.minimumSize.height = 34;

    function getSelectedPreset() {
        return list.selection ? PRESETS[list.selection.presetIndex] : null;
    }

    function previewState(preset, progress) {
        if (!preset || preset.wordDrop) return FINAL;
        var t = progress / 100;
        var states = preset.states;
        var i;
        if (t <= states[0][0]) return states[0];
        for (i = 0; i < states.length - 1; i++) {
            if (t <= states[i + 1][0]) {
                var a = states[i], b = states[i + 1];
                var span = b[0] - a[0];
                var f = span <= 0 ? 1 : (t - a[0]) / span;
                var state = [], j;
                for (j = 0; j < 6; j++) state.push(a[j] + (b[j] - a[j]) * f);
                return state;
            }
        }
        return states[states.length - 1];
    }

    function drawPreview() {
        try {
            var g = previewCanvas.graphics;
            var w = previewCanvas.size.width;
            var h = previewCanvas.size.height;
            var bg = g.newBrush(g.BrushType.SOLID_COLOR, [0.075, 0.09, 0.12, 1]);
            var accent = g.newBrush(g.BrushType.SOLID_COLOR, [0.22, 0.62, 0.98, 1]);
            g.fillRect(bg, 0, 0, w, h);
            var progress = previewToggle.value ? previewProgress.value : 100;
            var preset = getSelectedPreset();
            var label = String(previewTextInput.text || "YOUR TITLE");
            var pen, font, x, y, words, wordCount, settled, frac, word, wi, wordWidth, allWidth;
            if (preset && preset.wordDrop && previewToggle.value) {
                words = label.split(/\s+/);
                wordCount = words.length;
                if (!wordCount) wordCount = 1;
                var exact = progress * wordCount / 100;
                settled = Math.floor(exact);
                frac = exact - settled;
                font = g.newFont("Arial", "BOLD", 18);
                allWidth = 0;
                for (wi = 0; wi < words.length; wi++) allWidth += Math.max(12, words[wi].length * 10);
                allWidth += Math.max(0, words.length - 1) * 7;
                x = Math.max(10, (w - allWidth) / 2);
                y = h / 2 - 8;
                for (wi = 0; wi < words.length; wi++) {
                    var amount = wi < settled ? 1 : (wi === settled ? frac : 0);
                    var lift = (1 - amount) * 28;
                    var shade = Math.max(0.25, amount);
                    pen = g.newPen(g.PenType.SOLID_COLOR, [0.94 * shade, 0.96 * shade, 1 * shade, 1], 1);
                    word = words[wi];
                    g.drawString(word, pen, x, y - lift, font);
                    wordWidth = Math.max(12, word.length * 10);
                    x += wordWidth + 7;
                }
            } else {
                var state = previewToggle.value ? previewState(preset, progress) : FINAL;
                var alpha = Math.max(0, Math.min(1, state[4]));
                var size = Math.max(9, Math.min(34, 21 * state[3]));
                font = g.newFont("Arial", "BOLD", size);
                pen = g.newPen(g.PenType.SOLID_COLOR, [0.94 * alpha, 0.96 * alpha, 1 * alpha, 1], 1);
                var approxWidth = label.length * size * 0.56;
                x = Math.max(8, (w - approxWidth) / 2 + state[1] * w);
                y = h / 2 - 7 + state[2] * h;
                if (state[5] !== 0) x += state[5] * 0.12;
                g.drawString(label, pen, x, y, font);
            }
            g.fillRect(accent, 8, h - 7, Math.max(2, (w - 16) * progress / 100), 2);
        } catch (drawError) {
            // If the host lacks a ScriptUI graphics method, the preset controls remain usable.
        }
    }

    function redrawPreview() {
        try { previewCanvas.onDraw.call(previewCanvas); } catch (e) {}
        try { previewCanvas.notify("onDraw"); } catch (e2) {}
        try { if (ui.update) ui.update(); } catch (e3) {}
    }

    previewCanvas.onDraw = drawPreview;
    previewToggle.onClick = redrawPreview;
    previewProgress.onChanging = redrawPreview;
    previewProgress.onChange = redrawPreview;
    previewTextInput.onChanging = redrawPreview;

    function refreshList() {
        var selectedCategory = category.selection ? category.selection.text : "Semua 60";
        var query = String(search.text || "").toLowerCase();
        list.removeAll();
        var first = null;
        var i;
        for (i = 0; i < PRESETS.length; i++) {
            var preset = PRESETS[i];
            if (selectedCategory !== "Semua 60" && preset.category !== selectedCategory) continue;
            if (query && preset.name.toLowerCase().indexOf(query) < 0 && preset.category.toLowerCase().indexOf(query) < 0) continue;
            var item = list.add("item", preset.name);
            item.presetIndex = i;
            if (!first) first = item;
        }
        if (first) {
            list.selection = first;
            showDetail();
        } else {
            detail.text = "Tidak ada preset yang cocok dengan filter ini.";
            redrawPreview();
        }
    }

    function showDetail() {
        var p = getSelectedPreset();
        if (!p) return;
        detail.text = p.wordDrop ? "Animasi per kata: tiap kata turun satu per satu, dengan fade lembut." : p.category + "  ·  Entrance dengan easing halus.";
        previewProgress.value = 55;
        redrawPreview();
    }

    function getDuration() {
        var d = parseFloat(durationInput.text);
        if (isNaN(d)) d = 0.8;
        if (d < 0.1) d = 0.1;
        if (d > 20) d = 20;
        durationInput.text = String(d);
        return d;
    }

    function copyScaledValue(base, multiplier) {
        if (base instanceof Array) {
            var out = [];
            var i;
            for (i = 0; i < base.length; i++) out.push(base[i] * multiplier);
            return out;
        }
        return base * multiplier;
    }

    function keyEase(prop, keyIndex) {
        try {
            var dim = 1;
            var v = prop.value;
            if (v instanceof Array) dim = v.length;
            var ins = [], outs = [], i;
            for (i = 0; i < dim; i++) {
                ins.push(new KeyframeEase(0, 72));
                outs.push(new KeyframeEase(0, 72));
            }
            prop.setTemporalEaseAtKey(keyIndex, ins, outs);
            prop.setInterpolationTypeAtKey(keyIndex, KeyframeInterpolationType.BEZIER, KeyframeInterpolationType.BEZIER);
        } catch (e) {}
    }

    function animateProperty(prop, base, states, valueForState, startTime, duration) {
        if (!prop || prop.expressionEnabled) return false;
        var keyIndices = [];
        var i, state, index, value;
        for (i = 0; i < states.length; i++) {
            state = states[i];
            value = valueForState(base, state);
            var t = startTime + state[0] * duration;
            prop.setValueAtTime(t, value);
            index = prop.nearestKeyIndex(t);
            keyIndices.push(index);
        }
        for (i = 0; i < keyIndices.length; i++) keyEase(prop, keyIndices[i]);
        return true;
    }

    function transformProperty(transform, matchName) {
        try { return transform.property(matchName); } catch (e) { return null; }
    }

    function animateLayer(layer, comp, preset, startTime, duration) {
        var tr = transformProperty(layer, "ADBE Transform Group");
        if (!tr) return false;
        var pos = transformProperty(tr, "ADBE Position");
        var scale = transformProperty(tr, "ADBE Scale");
        var opacity = transformProperty(tr, "ADBE Opacity");
        var rotation = transformProperty(tr, "ADBE Rotate Z") || transformProperty(tr, "ADBE Rotation");
        var changed = false, i;

        if (pos && !pos.dimensionsSeparated) {
            var basePos = pos.valueAtTime(startTime, false);
            changed = animateProperty(pos, basePos, preset.states, function (base, state) {
                var v = [], j;
                for (j = 0; j < base.length; j++) v.push(base[j]);
                if (v.length > 0) v[0] += state[1] * comp.width;
                if (v.length > 1) v[1] += state[2] * comp.height;
                return v;
            }, startTime, duration) || changed;
        } else if (pos && pos.dimensionsSeparated) {
            // Animate separated X/Y dimensions when the host exposes their followers.
            try {
                for (i = 0; i < 2; i++) {
                    var follower = pos.getSeparationFollower(i);
                    if (follower) {
                        var baseAxis = follower.valueAtTime(startTime, false);
                        var axis = i;
                        changed = animateProperty(follower, baseAxis, preset.states, function (base, state) {
                            return base + (axis === 0 ? state[1] * comp.width : state[2] * comp.height);
                        }, startTime, duration) || changed;
                    }
                }
            } catch (eSep) {}
        }
        if (scale) {
            var baseScale = scale.valueAtTime(startTime, false);
            changed = animateProperty(scale, baseScale, preset.states, function (base, state) {
                return copyScaledValue(base, state[3]);
            }, startTime, duration) || changed;
        }
        if (opacity) {
            var baseOpacity = opacity.valueAtTime(startTime, false);
            changed = animateProperty(opacity, baseOpacity, preset.states, function (base, state) {
                return base * state[4];
            }, startTime, duration) || changed;
        }
        if (rotation) {
            var baseRotation = rotation.valueAtTime(startTime, false);
            changed = animateProperty(rotation, baseRotation, preset.states, function (base, state) {
                return base + state[5];
            }, startTime, duration) || changed;
        }
        return changed;
    }

    function propertyAny(group, aliases) {
        var i, found;
        if (!group) return null;
        for (i = 0; i < aliases.length; i++) {
            try { found = group.property(aliases[i]); } catch (e) { found = null; }
            if (found) return found;
        }
        return null;
    }

    function addPropertyAny(group, aliases) {
        var i, found;
        for (i = 0; i < aliases.length; i++) {
            try { found = group.addProperty(aliases[i]); } catch (e) { found = null; }
            if (found) return found;
        }
        return null;
    }

    function animateWordDrop(layer, startTime, duration) {
        var textProps = transformProperty(layer, "ADBE Text Properties");
        var animators = propertyAny(textProps, ["ADBE Text Animators", "Text Animators"]);
        if (!animators) return false;
        var animator = null;
        try {
            animator = animators.addProperty("ADBE Text Animator");
            if (!animator) return false;
            var animatorProps = propertyAny(animator, ["ADBE Text Animator Properties", "Properties"]);
            var selectors = propertyAny(animator, ["ADBE Text Selectors", "Selectors"]);
            if (!animatorProps || !selectors) throw new Error("Text Animator groups are unavailable");

            var position = addPropertyAny(animatorProps, ["ADBE Text Position 3D", "position"]);
            var opacity = addPropertyAny(animatorProps, ["ADBE Text Opacity", "opacity"]);
            if (!position || !opacity) throw new Error("Text Position/Opacity animator properties are unavailable");
            position.setValue([0, -64, 0]);
            opacity.setValue(0);

            // A scripted text animator may ship with a default range selector.
            // Reuse it when present to avoid stacking a second, full-range selector.
            var selector = selectors.numProperties > 0 ? selectors.property(1) : addPropertyAny(selectors, ["ADBE Text Selector", "range"]);
            if (!selector) throw new Error("Range selector is unavailable");
            var advanced = propertyAny(selector, ["advanced", "ADBE Text Range Advanced"]);
            var basedOn = propertyAny(advanced, ["basedOn", "ADBE Text Range Type2"]);
            var start = propertyAny(selector, ["start", "ADBE Text Percent Start"]);
            var end = propertyAny(selector, ["end", "ADBE Text Percent End"]);
            var offset = propertyAny(selector, ["offset", "ADBE Text Percent Offset"]);
            if (!basedOn || !start || !end) throw new Error("Word-based range selector is unavailable");
            basedOn.setValue(3); // Words
            end.setValue(100);
            if (offset) offset.setValue(0);
            start.setValueAtTime(startTime, 0);
            start.setValueAtTime(startTime + duration, 100);
            keyEase(start, start.nearestKeyIndex(startTime));
            keyEase(start, start.nearestKeyIndex(startTime + duration));
            try { animator.name = "Text Animation Studio · Word Drop"; } catch (nameError) {}
            return true;
        } catch (e) {
            try { if (animator) animator.remove(); } catch (removeError) {}
            return false;
        }
    }

    function applyPreset() {
        if (!list.selection) {
            status.text = "Pilih salah satu preset terlebih dahulu.";
            return;
        }
        var comp = app.project ? app.project.activeItem : null;
        if (!(comp instanceof CompItem)) {
            status.text = "Buka composition dan pilih satu atau lebih text layer.";
            return;
        }
        var selected = comp.selectedLayers;
        if (!selected || selected.length === 0) {
            status.text = "Pilih text layer di timeline terlebih dahulu.";
            return;
        }
        var preset = PRESETS[list.selection.presetIndex];
        var duration = getDuration();
        var startTime = comp.time;
        var applied = 0, skipped = 0, i, layer, textProps;
        app.beginUndoGroup("Text Animation · " + preset.name);
        try {
            for (i = 0; i < selected.length; i++) {
                layer = selected[i];
                textProps = transformProperty(layer, "ADBE Text Properties");
                if (!textProps) { skipped++; continue; }
                try {
                    var didApply = preset.wordDrop ? animateWordDrop(layer, startTime, duration) : animateLayer(layer, comp, preset, startTime, duration);
                    if (didApply) applied++;
                    else skipped++;
                } catch (layerError) { skipped++; }
            }
        } finally {
            app.endUndoGroup();
        }
        if (applied > 0) {
            status.text = "Preset “" + preset.name + "” diterapkan ke " + applied + " text layer." + (skipped ? " " + skipped + " layer non-teks/tidak didukung dilewati." : "") + " Undo: Ctrl/Cmd+Z.";
        } else {
            status.text = preset.wordDrop ? "Word-by-Word Drop gagal diterapkan. Pastikan EffectCraft mendukung Text Animator dan range selector berbasis kata." : "Tidak ada text layer yang berhasil dianimasikan. Periksa pilihan layer dan expression pada properti transform.";
        }
    }

    category.onChange = refreshList;
    search.onChanging = refreshList;
    list.onChange = showDetail;
    list.onDoubleClick = applyPreset;
    applyButton.onClick = applyPreset;
    refreshList();

    if (ui instanceof Window) {
        ui.onResizing = ui.onResize = function () { this.layout.resize(); };
        ui.center();
        ui.show();
    } else {
        ui.layout.layout(true);
    }
})(this);
