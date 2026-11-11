/*
    fyy apple style — NON-FINAL prototype; do not present as a Figma asset importer.
    This draft hand-reconstructs Action Sheet from inspected values and does not read
    Action Sheet.fig or Action Sheet.svg. It is intentionally disabled until replaced
    by a source-driven importer, per the user's no-manual-substitutes requirement.
*/
(function (thisObj) {
    var TITLE = "fyy apple style";
    var SOURCE_NAME = "Action Sheet";
    var W = 300, H = 296;
    var ui = (thisObj instanceof Panel) ? thisObj : new Window("palette", TITLE, undefined, { resizeable: true });
    ui.orientation = "column";
    ui.alignChildren = ["fill", "top"];
    ui.spacing = 8;
    ui.margins = 11;
    ui.minimumSize = [310, 310];

    var heading = ui.add("panel", undefined, "FYY APPLE STYLE · DRAFT NONFINAL");
    heading.orientation = "column";
    heading.alignChildren = ["fill", "top"];
    heading.spacing = 3;
    heading.margins = 9;
    heading.add("statictext", undefined, "Importer aset sumber belum diimplementasikan");
    heading.add("statictext", undefined, "Draft ini bukan render Action Sheet.fig / SVG");

    var pickerPanel = ui.add("panel", undefined, "PILIH KOMPONEN");
    pickerPanel.orientation = "column";
    pickerPanel.alignChildren = ["fill", "top"];
    pickerPanel.spacing = 5;
    pickerPanel.margins = 9;
    var componentList = pickerPanel.add("dropdownlist", undefined, ["Action Sheet · 300 × 296 · Figma"]);
    componentList.selection = 0;
    var sourceInfo = pickerPanel.add("statictext", undefined, "PERINGATAN: komponen ini masih berupa rekonstruksi hard-code, bukan aset sumber.");
    sourceInfo.characters = 42;

    var timingPanel = ui.add("panel", undefined, "MOTION OTOMATIS");
    timingPanel.orientation = "row";
    timingPanel.alignChildren = ["left", "center"];
    timingPanel.spacing = 7;
    timingPanel.margins = 9;
    timingPanel.add("statictext", undefined, "Durasi masuk");
    var durationInput = timingPanel.add("edittext", undefined, "0.36");
    durationInput.characters = 5;
    timingPanel.add("statictext", undefined, "d • stagger tombol 0.06 d");

    var installButton = ui.add("button", undefined, "IMPORTER SUMBER BELUM TERSEDIA");
    installButton.preferredSize.height = 34;
    var status = ui.add("statictext", undefined, "Pemasangan dinonaktifkan sampai importer memakai aset Figma/SVG yang sebenarnya.", { multiline: true });
    installButton.enabled = false;
    status.characters = 44;

    function rgb(c) { return [c[0], c[1], c[2]]; }
    function setOpacity(layer, value) {
        try { layer.property("ADBE Transform Group").property("ADBE Opacity").setValue(value); } catch (e) {}
    }
    function setLayerPosition(layer, x, y) {
        try { layer.property("ADBE Transform Group").property("ADBE Position").setValue([x, y]); } catch (e) {}
    }
    function addRect(comp, name, x, y, w, h, radius, color, opacity) {
        var layer = comp.layers.addShape();
        layer.name = name;
        var root = layer.property("ADBE Root Vectors Group");
        var group = root.addProperty("ADBE Vector Group");
        group.name = name + " · Figma shape";
        var contents = group.property("ADBE Vectors Group");
        var shape = contents.addProperty("ADBE Vector Shape - Rect");
        shape.property("ADBE Vector Rect Size").setValue([w, h]);
        shape.property("ADBE Vector Rect Roundness").setValue(Math.min(radius, Math.min(w, h) / 2));
        var fill = contents.addProperty("ADBE Vector Graphic - Fill");
        fill.property("ADBE Vector Fill Color").setValue(rgb(color));
        fill.property("ADBE Vector Fill Opacity").setValue(opacity);
        setLayerPosition(layer, x + w / 2, y + h / 2);
        return layer;
    }
    function addText(comp, name, text, x, baselineY, size, color, weight, opacity, justification) {
        var layer = comp.layers.addText(text);
        layer.name = name;
        var source = layer.property("ADBE Text Properties").property("ADBE Text Document");
        var doc = source.value;
        doc.fontSize = size;
        doc.fillColor = rgb(color);
        doc.applyFill = true;
        doc.applyStroke = false;
        try { doc.font = weight === "semibold" ? "SFPro-Semibold" : "SFPro-Regular"; } catch (eFont) {}
        try { doc.fauxBold = weight === "semibold"; } catch (eBold) {}
        try { doc.autoLeading = false; doc.leading = 22; } catch (eLeading) {}
        try { doc.justification = justification === "center" ? ParagraphJustification.CENTER_JUSTIFY : ParagraphJustification.LEFT_JUSTIFY; } catch (eJustify) {}
        source.setValue(doc);
        setLayerPosition(layer, x, baselineY);
        setOpacity(layer, opacity);
        return layer;
    }
    function addSoftShadow(layer) {
        try {
            var effects = layer.property("ADBE Effect Parade");
            var shadow = effects.addProperty("ADBE Drop Shadow");
            if (!shadow) return;
            try { shadow.property(1).setValue([0, 0, 0]); } catch (eColor) {}
            try { shadow.property(2).setValue(25); } catch (eOpacity) {}
            try { shadow.property(3).setValue(90); } catch (eDirection) {}
            try { shadow.property(4).setValue(8); } catch (eDistance) {}
            try { shadow.property(5).setValue(48); } catch (eSoftness) {}
        } catch (eShadow) {}
    }
    function keyEase(prop, keyIndex) {
        try {
            var easeIn = new KeyframeEase(0, 72), easeOut = new KeyframeEase(0, 72), dims = 1, arrIn = [], arrOut = [], i;
            try { dims = prop.value instanceof Array ? prop.value.length : 1; } catch (eDim) { dims = 1; }
            for (i = 0; i < dims; i++) { arrIn.push(easeIn); arrOut.push(easeOut); }
            prop.setTemporalEaseAtKey(keyIndex, arrIn, arrOut);
            prop.setInterpolationTypeAtKey(keyIndex, KeyframeInterpolationType.BEZIER, KeyframeInterpolationType.BEZIER);
        } catch (eEase) {}
    }
    function animateLayer(layer, start, duration, delay, lift) {
        var tr = layer.property("ADBE Transform Group");
        var pos = tr.property("ADBE Position"), opacity = tr.property("ADBE Opacity");
        var base = pos.valueAtTime(start + delay, false), t0 = start + delay, t1 = t0 + duration;
        pos.setValueAtTime(t0, [base[0], base[1] + lift]);
        pos.setValueAtTime(t1, base);
        opacity.setValueAtTime(t0, 0);
        opacity.setValueAtTime(t1, 100);
        keyEase(pos, pos.nearestKeyIndex(t0)); keyEase(pos, pos.nearestKeyIndex(t1));
        keyEase(opacity, opacity.nearestKeyIndex(t0)); keyEase(opacity, opacity.nearestKeyIndex(t1));
    }
    function buildActionSheet(parentComp, duration) {
        var fps = parentComp.frameRate || 30;
        var comp = app.project.items.addComp("FYY · Action Sheet · Figma", W, H, parentComp.pixelAspect || 1, Math.max(parentComp.duration, 3), fps);
        comp.bgColor = [0, 0, 0];
        var layers = [], row, surface, tint, glass, title, detail, button, label, i;

        // Main surface: Figma source uses a 300×296 rounded material, 34 px corners.
        // Geometry, fill values, and copy below are extracted from the supplied .fig source.
        surface = addRect(comp, "Figma · Action Sheet · Fill + Shadow", 0, 0, W, H, 34, [1, 1, 1], 70);
        addSoftShadow(surface);
        layers.push({ layer: surface, delay: 0, lift: 8 });
        tint = addRect(comp, "Figma · Action Sheet · Neutral tint", 1, 1, W - 2, H - 2, 33, [0.749020, 0.749020, 0.749020], 10);
        layers.push({ layer: tint, delay: 0.01, lift: 7 });
        glass = addRect(comp, "Figma · Action Sheet · Glass material layer", 1, 1, W - 2, H - 2, 33, [1, 1, 1], 15);
        layers.push({ layer: glass, delay: 0.03, lift: 6 });

        // Figma component: 14 px outer inset; 272 px content width.
        // Title and body use the source SF Pro type settings (17/22 px).
        title = addText(comp, "Figma text · Title (editable)", "A Short Title Is Best", 22, 39, 17, [0, 0, 0], "semibold", 100, "left");
        layers.push({ layer: title, delay: 0.07, lift: 5 });
        detail = addText(comp, "Figma text · Description (editable)", "A message should be a short,\ncomplete sentence.", 22, 71, 17, [0, 0, 0], "regular", 100, "left");
        layers.push({ layer: detail, delay: 0.11, lift: 5 });

        // Figma button variants: 272×48, 100 px radius, #787880 at 16% opacity.
        // Labels are native text layers and can be edited inside the generated comp.
        var labels = ["Destructive", "Action 2", "Action 3"];
        var yPositions = [122, 178, 234];
        for (i = 0; i < 3; i++) {
            row = addRect(comp, "Figma button " + (i + 1) + " · surface", 14, yPositions[i], 272, 48, 100, [0.470588, 0.470588, 0.501961], 16);
            layers.push({ layer: row, delay: 0.16 + i * 0.06, lift: 6 });
            var textColor = i === 0 ? [1, 0.219608, 0.235294] : [0, 0, 0];
            var textOpacity = i === 0 ? 100 : 67;
            label = addText(comp, "Figma button " + (i + 1) + " · label (editable)", labels[i], 150, yPositions[i] + 30, 17, textColor, "semibold", textOpacity, "center");
            layers.push({ layer: label, delay: 0.19 + i * 0.06, lift: 5 });
        }

        for (i = 0; i < layers.length; i++) animateLayer(layers[i].layer, 0, duration, layers[i].delay, layers[i].lift);
        return comp;
    }
    function install() {
        var parentComp = app.project ? app.project.activeItem : null;
        if (!(parentComp instanceof CompItem)) {
            status.text = "Buka composition utama dan aktifkan sebelum memasang komponen.";
            return;
        }
        var duration = parseFloat(durationInput.text);
        if (isNaN(duration) || duration < 0.12 || duration > 2) duration = 0.36;
        app.beginUndoGroup("fyy apple style · Action Sheet");
        try {
            var assetComp = buildActionSheet(parentComp, duration);
            var layer = parentComp.layers.add(assetComp);
            layer.name = "FYY · Action Sheet · Figma + Motion";
            var scale = Math.min(parentComp.width * 0.56 / W, parentComp.height * 0.60 / H) * 100;
            layer.property("ADBE Transform Group").property("ADBE Scale").setValue([scale, scale]);
            layer.property("ADBE Transform Group").property("ADBE Position").setValue([parentComp.width / 2, parentComp.height / 2]);
            layer.startTime = parentComp.time;
            layer.inPoint = parentComp.time;
            layer.outPoint = Math.min(parentComp.duration, parentComp.time + assetComp.duration);
            parentComp.selectedLayers = [layer];
            status.text = "Action Sheet dari Figma terpasang dengan motion. Buka precomp untuk mengedit shape/teks. Undo: Ctrl/Cmd+Z.";
        } catch (eBuild) {
            status.text = "Gagal memasang: " + eBuild.toString();
        } finally {
            app.endUndoGroup();
        }
    }
    installButton.onClick = install;
    if (ui instanceof Window) {
        ui.onResizing = ui.onResize = function () { this.layout.resize(); };
        ui.center();
        ui.show();
    } else {
        ui.layout.layout(true);
    }
})(this);
