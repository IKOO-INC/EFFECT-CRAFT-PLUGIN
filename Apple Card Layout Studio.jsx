/*
  Apple Card Layout Studio — generates editable native card compositions for EffectCraft.
  Each generated card is a precomp containing shape and live-text layers. No footage or
  rasterized text is used. Select generated card precomps and animate them with Card Motion Studio.
*/
(function (thisObj) {
    var TITLE = "Apple Card Layout Studio";
    var ACCENTS = [[0.0, 0.48, 0.98], [0.98, 0.26, 0.38], [0.67, 0.36, 0.95], [0.12, 0.66, 0.53], [1.0, 0.55, 0.18], [0.10, 0.68, 0.84]];
    var WHITE = [0.98, 0.98, 0.99];
    var DARK = [0.055, 0.06, 0.075];

    var ui = (thisObj instanceof Panel) ? thisObj : new Window("palette", TITLE, undefined, { resizeable: true });
    ui.orientation = "column";
    ui.alignChildren = ["fill", "top"];
    ui.spacing = 7;
    ui.margins = 10;
    ui.minimumSize = [380, 650];

    var header = ui.add("panel", undefined, "APPLE CARD LAYOUT STUDIO");
    header.orientation = "column";
    header.alignChildren = ["fill", "top"];
    header.spacing = 3;
    header.margins = 9;
    header.add("statictext", undefined, "Rakit layout kartu editable langsung di composition");
    header.add("statictext", undefined, "Teks hidup · shape vector · tiap kartu bisa diedit terpisah");

    var design = ui.add("panel", undefined, "PILIH DESAIN");
    design.orientation = "column";
    design.alignChildren = ["fill", "top"];
    design.spacing = 5;
    design.margins = 9;
    function dropdownRow(parent, label, options, selected) {
        var row = parent.add("group");
        row.orientation = "row";
        row.alignChildren = ["left", "center"];
        row.add("statictext", undefined, label);
        var list = row.add("dropdownlist", undefined, options);
        list.selection = selected;
        list.alignment = ["fill", "center"];
        return list;
    }
    var cardType = dropdownRow(design, "Template", ["Message Bubble", "Calendar", "Profile", "Media Player", "Product Feature"], 0);
    var layoutType = dropdownRow(design, "Susunan", ["Kartu kipas bertumpuk", "Grid rapi"], 0);
    var themeType = dropdownRow(design, "Tema", ["Light", "Dark", "Vibrant"], 0);
    var countType = dropdownRow(design, "Jumlah kartu", ["1", "2", "3", "4", "5", "6"], 4);

    var content = ui.add("panel", undefined, "KONTEN — satu kartu per baris");
    content.orientation = "column";
    content.alignChildren = ["fill", "top"];
    content.spacing = 4;
    content.margins = 9;
    content.add("statictext", undefined, "Judul");
    var titles = content.add("edittext", undefined, "Pesan baru\nDesember 10\nProfil kreator\nNow Playing\nAplikasi favorit", { multiline: true, scrolling: true });
    titles.preferredSize = [0, 54];
    content.add("statictext", undefined, "Deskripsi / isi");
    var details = content.add("edittext", undefined, "A little note for today.\nDecember · Tuesday\nMake it yours.\nNew music for you.\nIdeas in motion.", { multiline: true, scrolling: true });
    details.preferredSize = [0, 54];
    content.add("statictext", undefined, "Label kecil / tanggal");
    var labels = content.add("edittext", undefined, "MESSAGE\n10\nCREATOR\nPLAYING\nFEATURED", { multiline: true, scrolling: true });
    labels.preferredSize = [0, 43];

    var action = ui.add("panel", undefined, "BUAT KARTU");
    action.orientation = "column";
    action.alignChildren = ["fill", "top"];
    action.margins = 9;
    var buildButton = action.add("button", undefined, "BUAT LAYOUT KARTU EDITABLE");
    buildButton.preferredSize.height = 32;
    var status = action.add("statictext", undefined, "Buka composition, atur isi kartu, lalu buat. Kartu akan dibuat di sekitar tengah frame.", { multiline: true });
    status.minimumSize.height = 36;

    function selectedText(control) { return control.selection ? control.selection.text : ""; }
    function linesFrom(text) {
        var raw = String(text || "").split(/\r\n|\n|\r/), result = [], i, value;
        for (i = 0; i < raw.length; i++) {
            value = raw[i].replace(/^\s+|\s+$/g, "");
            if (value) result.push(value);
        }
        return result;
    }
    function valueFor(list, i, fallback) { return list.length ? list[i % list.length] : fallback; }
    function wrapText(text, maxChars) {
        var words = String(text).split(/\s+/), result = "", line = "", i;
        for (i = 0; i < words.length; i++) {
            if (!words[i]) continue;
            if (line && (line + " " + words[i]).length > maxChars) {
                result += (result ? "\r" : "") + line;
                line = words[i];
            } else line += (line ? " " : "") + words[i];
        }
        if (line) result += (result ? "\r" : "") + line;
        return result;
    }
    function colorCopy(color) { return [color[0], color[1], color[2]]; }
    function shapeRect(comp, name, x, y, w, h, radius, color) {
        var layer = comp.layers.addShape();
        layer.name = name;
        var root = layer.property("ADBE Root Vectors Group");
        var group = root.addProperty("ADBE Vector Group");
        group.name = name + " Shape";
        var contents = group.property("ADBE Vectors Group");
        var rect = contents.addProperty("ADBE Vector Shape - Rect");
        rect.property("ADBE Vector Rect Size").setValue([w, h]);
        rect.property("ADBE Vector Rect Roundness").setValue(radius);
        var fill = contents.addProperty("ADBE Vector Graphic - Fill");
        fill.property("ADBE Vector Fill Color").setValue(colorCopy(color));
        layer.property("ADBE Transform Group").property("ADBE Position").setValue([x, y]);
        return layer;
    }
    function addText(comp, name, text, x, y, size, color, centered) {
        var layer = comp.layers.addText(text);
        layer.name = name;
        var source = layer.property("ADBE Text Properties").property("ADBE Text Document");
        var doc = source.value;
        doc.fontSize = size;
        doc.fillColor = colorCopy(color);
        doc.applyFill = true;
        doc.applyStroke = false;
        try { doc.justification = centered ? ParagraphJustification.CENTER_JUSTIFY : ParagraphJustification.LEFT_JUSTIFY; } catch (eJustify) {}
        source.setValue(doc);
        layer.property("ADBE Transform Group").property("ADBE Position").setValue([x, y]);
        return layer;
    }
    function addCircle(comp, name, cx, cy, diameter, color) {
        return shapeRect(comp, name, cx, cy, diameter, diameter, diameter / 2, color);
    }
    function themeColors(theme, index) {
        var accent = colorCopy(ACCENTS[index % ACCENTS.length]);
        if (theme === "Dark") return { bg: [0.105, 0.115, 0.14], fg: [0.97, 0.97, 0.99], muted: [0.68, 0.7, 0.75], accent: accent, soft: [0.19, 0.21, 0.25] };
        if (theme === "Vibrant") return { bg: colorCopy(ACCENTS[index % ACCENTS.length]), fg: [1, 1, 1], muted: [0.93, 0.94, 0.98], accent: [0.99, 0.99, 1], soft: [0.13, 0.14, 0.19] };
        return { bg: [0.965, 0.968, 0.978], fg: [0.08, 0.085, 0.11], muted: [0.39, 0.41, 0.46], accent: accent, soft: [0.91, 0.92, 0.94] };
    }
    function makeCardComp(parentComp, index, title, detail, label, type, theme, width, height) {
        var fps = parentComp.frameRate || 30;
        var duration = Math.max(parentComp.duration, 1);
        var safeName = title.replace(/[\\\/:*?"<>|]/g, " ").substring(0, 26);
        var cardComp = app.project.items.addComp("Card " + (index + 1) + " — " + safeName, width, height, parentComp.pixelAspect || 1, duration, fps);
        cardComp.bgColor = colorCopy(themeColors(theme, index).bg);
        var col = themeColors(theme, index);
        var pad = Math.round(width * 0.075);
        var titleSize = Math.max(24, Math.round(width * 0.085));
        var bodySize = Math.max(16, Math.round(width * 0.046));
        var labelSize = Math.max(12, Math.round(width * 0.032));
        var cx = width / 2, cy = height / 2;
        var body = wrapText(detail, Math.max(15, Math.floor(width / (bodySize * 0.56))));
        var titleText = wrapText(title, Math.max(12, Math.floor(width / (titleSize * 0.55))));
        shapeRect(cardComp, "Card Background", cx, cy, width, height, Math.round(width * 0.075), col.bg);

        if (type === "Message Bubble") {
            addText(cardComp, "Label — editable", label.toUpperCase(), pad, height * 0.19, labelSize, col.muted, false);
            addText(cardComp, "Title — editable", titleText, pad, height * 0.34, titleSize, col.fg, false);
            var bubbleW = width - pad * 2;
            shapeRect(cardComp, "Message Bubble Shape", cx, height * 0.70, bubbleW, height * 0.32, Math.round(width * 0.055), col.accent);
            addText(cardComp, "Message — editable", body, pad + width * 0.04, height * 0.66, bodySize, [1, 1, 1], false);
        } else if (type === "Calendar") {
            addText(cardComp, "Month / label — editable", label.toUpperCase(), pad, height * 0.19, labelSize, col.accent, false);
            addText(cardComp, "Date — editable", titleText, pad, height * 0.39, titleSize, col.fg, false);
            shapeRect(cardComp, "Calendar Accent", cx, height * 0.54, width * 0.83, Math.max(4, height * 0.012), 4, col.accent);
            addText(cardComp, "Event details — editable", body, pad, height * 0.68, bodySize, col.muted, false);
            addText(cardComp, "Calendar days", "S    M    T    W    T    F    S", pad, height * 0.87, labelSize, col.fg, false);
        } else if (type === "Profile") {
            addCircle(cardComp, "Profile Avatar", cx, height * 0.30, width * 0.25, col.accent);
            var initials = title.replace(/[^A-Za-z0-9 ]/g, "").split(/\s+/), mark = "";
            if (initials.length) mark += initials[0].charAt(0);
            if (initials.length > 1) mark += initials[1].charAt(0);
            addText(cardComp, "Avatar Initials — editable", mark.toUpperCase(), cx - width * 0.055, height * 0.33, Math.max(18, Math.round(width * 0.07)), [1, 1, 1], false);
            addText(cardComp, "Profile Name — editable", titleText, pad, height * 0.60, titleSize, col.fg, true);
            addText(cardComp, "Profile Bio — editable", body, pad, height * 0.77, bodySize, col.muted, true);
            addText(cardComp, "Profile Tag — editable", label.toUpperCase(), pad, height * 0.91, labelSize, col.accent, true);
        } else if (type === "Media Player") {
            shapeRect(cardComp, "Album Art / editable color block", cx, height * 0.39, width * 0.82, height * 0.58, Math.round(width * 0.045), col.accent);
            addCircle(cardComp, "Play Button", cx, height * 0.39, width * 0.18, [0.08, 0.09, 0.12]);
            addText(cardComp, "Play Symbol", "▶", cx - width * 0.035, height * 0.415, Math.max(18, Math.round(width * 0.06)), [1, 1, 1], false);
            addText(cardComp, "Track Title — editable", titleText, pad, height * 0.78, titleSize, col.fg, false);
            addText(cardComp, "Track Info — editable", body + "\r" + label.toUpperCase(), pad, height * 0.90, bodySize, col.muted, false);
        } else {
            shapeRect(cardComp, "Feature Color Bar", cx, height * 0.16, width * 0.84, height * 0.025, Math.round(width * 0.012), col.accent);
            addText(cardComp, "Feature Label — editable", label.toUpperCase(), pad, height * 0.32, labelSize, col.accent, false);
            addText(cardComp, "Feature Headline — editable", titleText, pad, height * 0.53, titleSize, col.fg, false);
            addText(cardComp, "Feature Description — editable", body, pad, height * 0.75, bodySize, col.muted, false);
            addCircle(cardComp, "Feature Accent", width - pad * 1.25, height - pad * 1.25, width * 0.12, col.accent);
        }
        return cardComp;
    }
    function createLayout() {
        var comp = app.project ? app.project.activeItem : null;
        if (!(comp instanceof CompItem)) {
            status.text = "Buka dan aktifkan composition terlebih dahulu.";
            return;
        }
        var count = parseInt(selectedText(countType), 10);
        if (isNaN(count) || count < 1) count = 1;
        var titleList = linesFrom(titles.text), detailList = linesFrom(details.text), labelList = linesFrom(labels.text);
        var type = selectedText(cardType), layout = selectedText(layoutType), theme = selectedText(themeType);
        var width, height, xPositions = [], yPositions = [], rotations = [], scales = [], i;
        if (layout === "Kartu kipas bertumpuk") {
            var spread = 1 + Math.max(0, count - 1) * 0.64;
            width = Math.round(Math.min(comp.width * 0.74, comp.width * 0.96 / spread));
            height = Math.round(Math.min(comp.height * 0.64, width * 0.90));
            var step = width * 0.64;
            for (i = 0; i < count; i++) {
                var offset = i - (count - 1) / 2;
                xPositions.push(comp.width / 2 + offset * step);
                yPositions.push(comp.height / 2 + Math.abs(offset) * comp.height * 0.018);
                rotations.push(offset * -3.2);
                scales.push(1 - Math.abs(offset) * 0.025);
            }
        } else {
            var columns = count <= 4 ? 2 : 3;
            var rows = Math.ceil(count / columns);
            width = Math.round(Math.min(comp.width / columns * 0.86, comp.height / rows * 0.88 / 0.90));
            width = Math.max(250, width);
            height = Math.round(Math.min(comp.height / rows * 0.88, width * 0.90));
            width = Math.round(height / 0.90);
            for (i = 0; i < count; i++) {
                var colIndex = i % columns, rowIndex = Math.floor(i / columns);
                var rowCount = Math.min(columns, count - rowIndex * columns);
                xPositions.push(comp.width / 2 + (colIndex - (rowCount - 1) / 2) * width * 1.08);
                yPositions.push(comp.height / 2 + (rowIndex - (rows - 1) / 2) * height * 1.12);
                rotations.push(0);
                scales.push(1);
            }
        }
        width = Math.max(240, width);
        height = Math.max(240, height);
        var made = 0, startTime = comp.time;
        try {
            var oldSelection = comp.selectedLayers;
            for (i = 0; i < oldSelection.length; i++) oldSelection[i].selected = false;
        } catch (eDeselect) {}
        app.beginUndoGroup("Create Editable Apple Card Layout");
        try {
            for (i = 0; i < count; i++) {
                var title = valueFor(titleList, i, "Card " + (i + 1));
                var detail = valueFor(detailList, i, "Edit this text in the card composition.");
                var label = valueFor(labelList, i, "FEATURE");
                var cardComp = makeCardComp(comp, i, title, detail, label, type, theme, width, height);
                var cardLayer = comp.layers.add(cardComp);
                cardLayer.name = "Card " + (i + 1) + " — " + title;
                try { cardLayer.startTime = startTime; } catch (eStart) {}
                try { cardLayer.inPoint = startTime; } catch (eIn) {}
                try { cardLayer.outPoint = comp.duration; } catch (eOut) {}
                var tr = cardLayer.property("ADBE Transform Group");
                try { tr.property("ADBE Anchor Point").setValue([width / 2, height / 2]); } catch (eAnchor) {}
                tr.property("ADBE Position").setValue([xPositions[i], yPositions[i]]);
                tr.property("ADBE Scale").setValue([scales[i] * 100, scales[i] * 100]);
                try { tr.property("ADBE Rotate Z").setValue(rotations[i]); } catch (eRotation) {}
                cardLayer.selected = true;
                made++;
            }
        } catch (err) {
            status.text = "Sebagian kartu mungkin sudah dibuat sebelum error: " + err.toString();
        } finally {
            app.endUndoGroup();
        }
        if (made) status.text = made + " kartu dibuat sebagai precomp editable di sekitar playhead. Double-click layer kartu untuk mengedit teks/shape. Layer kartu terpilih; gunakan Apple Card Motion Studio untuk preset animasi. Undo: Ctrl/Cmd+Z.";
        else if (!status.text) status.text = "Layout belum dibuat. Pastikan composition mendukung shape dan text layer.";
    }

    buildButton.onClick = createLayout;
    if (ui instanceof Window) {
        ui.onResizing = ui.onResize = function () { this.layout.resize(); };
        ui.center();
        ui.show();
    } else ui.layout.layout(true);
})(this);
