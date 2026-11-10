/*
  Curve Studio — a temporal easing editor and preset library for EffectCraft.
  Select keyframes, tune the incoming/outgoing curve, then apply in one undo step.
*/
(function (thisObj) {
    var TITLE = "Curve Studio";
    var PRESETS = [
        { name: "Linear", outInfluence: 33, outSpeed: 1.00, inInfluence: 33, inSpeed: 1.00, note: "Even motion" },
        { name: "Soft S", outInfluence: 48, outSpeed: 0.00, inInfluence: 48, inSpeed: 0.00, note: "Slow in · slow out" },
        { name: "Ease In", outInfluence: 72, outSpeed: 0.00, inInfluence: 24, inSpeed: 1.65, note: "Build momentum" },
        { name: "Ease Out", outInfluence: 24, outSpeed: 1.65, inInfluence: 72, inSpeed: 0.00, note: "Soft landing" },
        { name: "Ease In-Out", outInfluence: 45, outSpeed: 0.05, inInfluence: 45, inSpeed: 0.05, note: "Balanced, polished" },
        { name: "Snappy", outInfluence: 18, outSpeed: 2.40, inInfluence: 38, inSpeed: 0.08, note: "Quick response" },
        { name: "Gentle", outInfluence: 44, outSpeed: 0.35, inInfluence: 44, inSpeed: 0.35, note: "Quiet, elegant" },
        { name: "Overshoot", outInfluence: 34, outSpeed: 4.00, inInfluence: 34, inSpeed: 4.00, note: "Expressive rebound" }
    ];

    var ui = (thisObj instanceof Panel) ? thisObj : new Window("palette", TITLE, undefined, { resizeable: true });
    ui.orientation = "column";
    ui.alignChildren = ["fill", "top"];
    ui.spacing = 8;
    ui.margins = 12;
    ui.minimumSize = [350, 720];

    function glowSurface(control, state, accentColor) {
        control.onDraw = function () {
            try {
                var g = this.graphics, w = this.size.width, h = this.size.height;
                var active = state.active;
                var bg = g.newBrush(g.BrushType.SOLID_COLOR, [0.075, 0.085, 0.12, 1]);
                var glow = g.newPen(g.PenType.SOLID_COLOR, active ? [0.36, 0.48, 1, 0.9] : [0.22, 0.28, 0.5, 0.65], active ? 2 : 1);
                var accent = g.newPen(g.PenType.SOLID_COLOR, accentColor || [0.45, 0.34, 1, 0.95], active ? 3 : 2);
                try { g.fillRoundRect(bg, 0, 0, w, h, 10, 10); }
                catch (roundFillError) { g.fillRect(bg, 0, 0, w, h); }
                try { g.drawRoundRect(glow, 0.5, 0.5, w - 1, h - 1, 10, 10); }
                catch (roundBorderError) { g.drawRect(glow, 0.5, 0.5, w - 1, h - 1); }
                g.newPath();
                g.moveTo(8, 14);
                g.lineTo(8, h - 14);
                g.strokePath(accent);
            } catch (e) {}
        };
    }

    var header = ui.add("panel", undefined, "CURVE STUDIO");
    header.orientation = "column";
    header.alignChildren = ["fill", "top"];
    header.spacing = 3;
    header.margins = 10;
    header.add("statictext", undefined, "Shape your motion");
    header.add("statictext", undefined, "Glow curve editor  ·  8 easing presets  ·  keyframe-ready");

    var graphCard = ui.add("panel", undefined, "CUSTOM CURVE");
    graphCard.orientation = "column";
    graphCard.alignChildren = ["fill", "top"];
    graphCard.margins = 9;
    var graph = graphCard.add("group");
    graph.preferredSize = [320, 178];
    graph.minimumSize.height = 150;

    var values = { outInfluence: 33, outSpeed: 1.00, inInfluence: 33, inSpeed: 1.00 };
    var presetCards = [];
    var loadingPreset = false;

    function curvePoint(t) {
        var x1 = values.outInfluence / 100;
        var y1 = values.outSpeed * x1;
        var x2 = 1 - values.inInfluence / 100;
        var y2 = 1 - values.inSpeed * (values.inInfluence / 100);
        var u = 1 - t;
        var x = 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t;
        var y = 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t;
        return [x, y];
    }

    function drawCurve() {
        try {
            var g = graph.graphics, w = graph.size.width, h = graph.size.height;
            var bg = g.newBrush(g.BrushType.SOLID_COLOR, [0.035, 0.045, 0.075, 1]);
            var gridPen = g.newPen(g.PenType.SOLID_COLOR, [0.24, 0.27, 0.38, 0.75], 1);
            var glowPen = g.newPen(g.PenType.SOLID_COLOR, [0.3, 0.24, 1, 0.34], 7);
            var midPen = g.newPen(g.PenType.SOLID_COLOR, [0.43, 0.38, 1, 0.7], 4);
            var curvePen = g.newPen(g.PenType.SOLID_COLOR, [0.64, 0.78, 1, 1], 2);
            var handlePen = g.newPen(g.PenType.SOLID_COLOR, [0.29, 0.74, 1, 0.9], 1);
            var dotBrush = g.newBrush(g.BrushType.SOLID_COLOR, [0.56, 0.86, 1, 1]);
            try { g.fillRoundRect(bg, 0, 0, w, h, 8, 8); }
            catch (fillError) { g.fillRect(bg, 0, 0, w, h); }
            var left = 22, top = 12, gw = Math.max(40, w - 34), gh = Math.max(40, h - 26);
            var i, x, y, p, x1, y1, x2, y2;
            g.newPath();
            for (i = 0; i <= 4; i++) {
                x = left + gw * i / 4;
                y = top + gh * i / 4;
                g.moveTo(x, top);
                g.lineTo(x, top + gh);
                g.moveTo(left, y);
                g.lineTo(left + gw, y);
            }
            g.strokePath(gridPen);
            x1 = left + gw * values.outInfluence / 100;
            y1 = top + gh * (1 - values.outSpeed * values.outInfluence / 100);
            x2 = left + gw * (1 - values.inInfluence / 100);
            y2 = top + gh * (values.inSpeed * values.inInfluence / 100);
            g.newPath();
            g.moveTo(left, top + gh);
            g.lineTo(x1, y1);
            g.moveTo(left + gw, top);
            g.lineTo(x2, y2);
            g.strokePath(handlePen);
            var curvePenSet = [glowPen, midPen, curvePen];
            var ci, last, px, py;
            for (ci = 0; ci < curvePenSet.length; ci++) {
                last = curvePoint(0);
                g.newPath();
                g.moveTo(left + gw * last[0], top + gh * (1 - last[1]));
                for (i = 1; i <= 36; i++) {
                    p = curvePoint(i / 36);
                    px = left + gw * p[0];
                    py = top + gh * (1 - p[1]);
                    g.lineTo(px, py);
                }
                g.strokePath(curvePenSet[ci]);
            }
            var handleSize = 7;
            g.fillRect(dotBrush, x1 - handleSize / 2, y1 - handleSize / 2, handleSize, handleSize);
            g.fillRect(dotBrush, x2 - handleSize / 2, y2 - handleSize / 2, handleSize, handleSize);
            g.fillRect(dotBrush, left - 3, top + gh - 3, 6, 6);
            g.fillRect(dotBrush, left + gw - 3, top - 3, 6, 6);
        } catch (e) {
            // The numeric controls and Apply command still work on hosts with limited ScriptUI drawing.
        }
    }
    graph.onDraw = drawCurve;

    function redrawGraph() {
        try { graph.notify("onDraw"); } catch (e) {}
        try { graph.onDraw.call(graph); } catch (e2) {}
        try { if (ui.update) ui.update(); } catch (e3) {}
    }

    var controlsCard = ui.add("panel", undefined, "CURVE CONTROLS");
    controlsCard.orientation = "column";
    controlsCard.alignChildren = ["fill", "top"];
    controlsCard.spacing = 5;
    controlsCard.margins = 10;
    var params = {};

    function markCustomCurve() {
        if (loadingPreset) return;
        presetDropdown.selection = null;
        var i;
        for (i = 0; i < presetCards.length; i++) {
            presetCards[i].active = false;
            try { presetCards[i].panel.onDraw.call(presetCards[i].panel); } catch (e) {}
        }
        status.text = "Custom curve · ubah influence/speed lalu Apply Curve.";
    }

    function makeParam(parent, key, title, min, max, initial, scale, decimals) {
        var row = parent.add("group");
        row.orientation = "row";
        row.alignChildren = ["left", "center"];
        var label = row.add("statictext", undefined, title);
        label.preferredSize.width = 112;
        var slider = row.add("slider", undefined, initial * scale, min * scale, max * scale);
        slider.alignment = ["fill", "center"];
        var input = row.add("edittext", undefined, Number(initial).toFixed(decimals));
        input.characters = 5;
        params[key] = { slider: slider, input: input, scale: scale, min: min, max: max, decimals: decimals };
        slider.onChanging = function () {
            values[key] = slider.value / scale;
            input.text = values[key].toFixed(decimals);
            markCustomCurve();
            redrawGraph();
        };
        input.onChange = function () {
            var number = parseFloat(String(input.text).replace(",", "."));
            if (isNaN(number)) number = values[key];
            if (number < min) number = min;
            if (number > max) number = max;
            values[key] = number;
            slider.value = number * scale;
            input.text = number.toFixed(decimals);
            markCustomCurve();
            redrawGraph();
        };
    }

    makeParam(controlsCard, "outInfluence", "OUT · Influence %", 1, 100, 33, 1, 0);
    makeParam(controlsCard, "outSpeed", "OUT · Speed ×", 0, 4, 1, 100, 2);
    makeParam(controlsCard, "inInfluence", "IN · Influence %", 1, 100, 33, 1, 0);
    makeParam(controlsCard, "inSpeed", "IN · Speed ×", 0, 4, 1, 100, 2);

    var presetCard = ui.add("panel", undefined, "CURVE PRESETS");
    presetCard.orientation = "column";
    presetCard.alignChildren = ["fill", "top"];
    presetCard.spacing = 5;
    presetCard.margins = 10;
    var presetSelectRow = presetCard.add("group");
    presetSelectRow.orientation = "row";
    presetSelectRow.alignChildren = ["left", "center"];
    presetSelectRow.add("statictext", undefined, "Pilih preset");
    var presetDropdown = presetSelectRow.add("dropdownlist", undefined, []);
    var presetIndex;
    for (presetIndex = 0; presetIndex < PRESETS.length; presetIndex++) presetDropdown.add("item", PRESETS[presetIndex].name);
    presetDropdown.selection = 4;
    presetDropdown.alignment = ["fill", "center"];

    var presetGrid = presetCard.add("group");
    presetGrid.orientation = "column";
    presetGrid.alignChildren = ["fill", "top"];
    presetGrid.spacing = 5;
    var presetIndex2;
    for (var presetRow = 0; presetRow < 4; presetRow++) {
        var row = presetGrid.add("group");
        row.orientation = "row";
        row.alignChildren = ["fill", "top"];
        row.spacing = 5;
        for (var presetCol = 0; presetCol < 2; presetCol++) {
            presetIndex2 = presetRow * 2 + presetCol;
            var presetPanel = row.add("panel", undefined, "");
            presetPanel.orientation = "column";
            presetPanel.alignChildren = ["fill", "center"];
            presetPanel.margins = 5;
            presetPanel.preferredSize = [155, 48];
            var presetButton = presetPanel.add("button", undefined, PRESETS[presetIndex2].name + "  ·  " + PRESETS[presetIndex2].note);
            presetButton.preferredSize.height = 28;
            var state = { panel: presetPanel, index: presetIndex2, active: presetIndex2 === 4 };
            glowSurface(presetPanel, state, [0.39, 0.29, 1, 0.95]);
            presetCards.push(state);
            presetButton.onClick = (function (idx) {
                return function () { loadPreset(idx); };
            })(presetIndex2);
        }
    }

    var applyCard = ui.add("panel", undefined, "APPLY TO KEYFRAMES");
    applyCard.orientation = "column";
    applyCard.alignChildren = ["fill", "top"];
    applyCard.spacing = 5;
    applyCard.margins = 10;
    var applyModeRow = applyCard.add("group");
    applyModeRow.orientation = "row";
    applyModeRow.alignChildren = ["left", "center"];
    applyModeRow.add("statictext", undefined, "Terapkan sisi");
    var applyMode = applyModeRow.add("dropdownlist", undefined, ["In & Out", "In only", "Out only"]);
    applyMode.selection = 0;
    var applyButton = applyCard.add("button", undefined, "APPLY CURVE  ·  SELECTED KEYFRAMES");
    applyButton.preferredSize.height = 34;
    var status = applyCard.add("statictext", undefined, "Pilih keyframe pada timeline, atur curve, lalu Apply.", { multiline: true });
    status.minimumSize.height = 34;

    function loadPreset(index) {
        if (index < 0 || index >= PRESETS.length) return;
        var preset = PRESETS[index];
        loadingPreset = true;
        values.outInfluence = preset.outInfluence;
        values.outSpeed = preset.outSpeed;
        values.inInfluence = preset.inInfluence;
        values.inSpeed = preset.inSpeed;
        presetDropdown.selection = index;
        var i;
        for (i = 0; i < presetCards.length; i++) {
            presetCards[i].active = presetCards[i].index === index;
            try { presetCards[i].panel.onDraw.call(presetCards[i].panel); } catch (redrawError) {}
        }
        params.outInfluence.slider.value = values.outInfluence;
        params.outInfluence.input.text = values.outInfluence.toFixed(0);
        params.outSpeed.slider.value = values.outSpeed * 100;
        params.outSpeed.input.text = values.outSpeed.toFixed(2);
        params.inInfluence.slider.value = values.inInfluence;
        params.inInfluence.input.text = values.inInfluence.toFixed(0);
        params.inSpeed.slider.value = values.inSpeed * 100;
        params.inSpeed.input.text = values.inSpeed.toFixed(2);
        loadingPreset = false;
        drawCurve();
        status.text = "Preset “" + preset.name + "” dimuat. Pilih keyframe, lalu Apply Curve.";
        redrawGraph();
    }

    function valueArray(value) {
        if (value instanceof Array) return value;
        return [value];
    }

    function copyEases(eases, dimensions) {
        var out = [], i, source;
        for (i = 0; i < dimensions; i++) {
            source = (eases && eases.length) ? eases[Math.min(i, eases.length - 1)] : null;
            if (source) out.push(new KeyframeEase(source.speed, source.influence));
            else out.push(new KeyframeEase(0, 33.333));
        }
        return out;
    }

    function layerOf(prop) {
        try { return prop.propertyGroup(prop.propertyDepth); } catch (e) { return null; }
    }

    function pathLength(start, outTangent, inTangent, end) {
        var dimensions = Math.max(start.length, end.length);
        var points = [], length = 0, previous = null, d, step, t, u, point, sum;
        for (d = 0; d < dimensions; d++) {
            var a = start[d] || 0;
            var b = end[d] || 0;
            points.push([a, a + ((outTangent && outTangent[d]) || 0), b + ((inTangent && inTangent[d]) || 0), b]);
        }
        for (step = 0; step <= 64; step++) {
            t = step / 64;
            u = 1 - t;
            point = [];
            for (d = 0; d < dimensions; d++) {
                point.push(u * u * u * points[d][0] + 3 * u * u * t * points[d][1] + 3 * u * t * t * points[d][2] + t * t * t * points[d][3]);
            }
            if (previous) {
                sum = 0;
                for (d = 0; d < dimensions; d++) sum += (point[d] - previous[d]) * (point[d] - previous[d]);
                length += Math.sqrt(sum);
            }
            previous = point;
        }
        return length;
    }

    // Segment average speed is measured in the property's own units and layer time.
    function segmentSpeeds(prop, fromKey, dimensions) {
        var layer = layerOf(prop);
        var stretch = layer && layer.stretch ? layer.stretch : 100;
        var duration = (prop.keyTime(fromKey + 1) - prop.keyTime(fromKey)) * 100 / stretch;
        var from = prop.keyValue(fromKey);
        var to = prop.keyValue(fromKey + 1);
        var fromArray = valueArray(from), toArray = valueArray(to);
        var result = [], i, type, speed;
        if (!(duration > 0) || !isFinite(duration)) return null;
        try { type = prop.propertyValueType; } catch (e) { type = null; }
        if (typeof PropertyValueType !== "undefined" &&
            (type === PropertyValueType.TwoD_SPATIAL || type === PropertyValueType.ThreeD_SPATIAL)) {
            try {
                speed = pathLength(fromArray, prop.keyOutSpatialTangent(fromKey), prop.keyInSpatialTangent(fromKey + 1), toArray) / duration;
            } catch (spatialError) {
                speed = 0;
            }
            for (i = 0; i < dimensions; i++) result.push(speed);
        } else if (typeof from === "number" && typeof to === "number") {
            result.push((to - from) / duration);
        } else if (from instanceof Array && to instanceof Array && from.length === to.length) {
            for (i = 0; i < dimensions; i++) result.push(((to[Math.min(i, to.length - 1)] || 0) - (from[Math.min(i, from.length - 1)] || 0)) / duration);
        } else {
            // Shape and other non-numeric values ease their normalized progress.
            for (i = 0; i < dimensions; i++) result.push(1 / duration);
        }
        return result;
    }

    function makeEaseArray(speeds, influence, dimensions, multiplier) {
        var out = [], i;
        for (i = 0; i < dimensions; i++) out.push(new KeyframeEase((speeds[Math.min(i, speeds.length - 1)] || 0) * multiplier, influence));
        return out;
    }

    function applyCurveToProperty(prop, mode) {
        var selectedKeys;
        try {
            if (typeof PropertyType !== "undefined" && prop.propertyType !== PropertyType.PROPERTY) return { eased: 0, roving: 0 };
            if (prop.numKeys < 2 || (prop.isInterpolationTypeValid && !prop.isInterpolationTypeValid(KeyframeInterpolationType.BEZIER))) return { eased: 0, roving: 0 };
            selectedKeys = prop.selectedKeys;
        } catch (e) { return { eased: 0, roving: 0 }; }
        if (!selectedKeys || !selectedKeys.length) return { eased: 0, roving: 0 };
        var count = 0, roving = 0, i, key, value, dimensions, inEases, outEases, inType, outType, speeds, didSide;
        for (i = 0; i < selectedKeys.length; i++) {
            key = selectedKeys[i];
            try {
                if (prop.keyRoving && prop.keyRoving(key)) { roving++; continue; }
                value = valueArray(prop.keyValue(key));
                dimensions = value.length;
                inEases = copyEases(prop.keyInTemporalEase(key), dimensions);
                outEases = copyEases(prop.keyOutTemporalEase(key), dimensions);
                inType = prop.keyInInterpolationType(key);
                outType = prop.keyOutInterpolationType(key);
                didSide = false;
                if (mode !== "Out only" && key > 1) {
                    speeds = segmentSpeeds(prop, key - 1, dimensions);
                    if (speeds) {
                        inEases = makeEaseArray(speeds, values.inInfluence, dimensions, values.inSpeed);
                        inType = KeyframeInterpolationType.BEZIER;
                        didSide = true;
                    }
                }
                if (mode !== "In only" && key < prop.numKeys) {
                    speeds = segmentSpeeds(prop, key, dimensions);
                    if (speeds) {
                        outEases = makeEaseArray(speeds, values.outInfluence, dimensions, values.outSpeed);
                        outType = KeyframeInterpolationType.BEZIER;
                        didSide = true;
                    }
                }
                if (!didSide) continue;
                // Break linked/continuous handles before applying different In and Out curves.
                try { if (prop.keyTemporalContinuous(key)) prop.setTemporalContinuousAtKey(key, false); } catch (continuousError) {}
                prop.setTemporalEaseAtKey(key, inEases, outEases);
                prop.setInterpolationTypeAtKey(key, inType, outType);
                count++;
            } catch (keyError) {}
        }
        return { eased: count, roving: roving };
    }

    function applyCurve() {
        var comp = app.project ? app.project.activeItem : null;
        if (!(comp instanceof CompItem)) {
            status.text = "Buka composition dan pilih keyframe terlebih dahulu.";
            return;
        }
        var props = comp.selectedProperties;
        if (!props || !props.length) {
            status.text = "Pilih properti/keyframe di timeline yang ingin diberi curve.";
            return;
        }
        var mode = applyMode.selection ? applyMode.selection.text : "In & Out";
        var changed = 0, roving = 0, i, result;
        app.beginUndoGroup("Curve Studio · Apply Easing");
        try {
            for (i = 0; i < props.length; i++) {
                result = applyCurveToProperty(props[i], mode);
                changed += result.eased;
                roving += result.roving;
            }
        } finally {
            app.endUndoGroup();
        }
        if (changed) status.text = "Kurva halus diterapkan pada " + changed + " keyframe terpilih." + (roving ? " " + roving + " roving keyframe dilewati." : "") + " Undo: Ctrl/Cmd+Z.";
        else status.text = roving ? "Keyframe terpilih roving dan tidak dapat di-ease. Matikan Roving lalu coba lagi." : "Pilih keyframe pada properti yang mendukung Bezier.";
    }

    presetDropdown.onChange = function () {
        if (!presetDropdown.selection) return;
        var i;
        for (i = 0; i < PRESETS.length; i++) if (PRESETS[i].name === presetDropdown.selection.text) { loadPreset(i); break; }
    };
    applyButton.onClick = applyCurve;
    graph.onDraw = drawCurve;
    loadPreset(4);

    if (ui instanceof Window) {
        ui.onResizing = ui.onResize = function () { this.layout.resize(); };
        ui.center();
        ui.show();
    } else {
        ui.layout.layout(true);
    }
})(this);
