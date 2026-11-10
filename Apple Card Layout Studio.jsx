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
    var cardType = dropdownRow(design, "Template", ["Notification / Lock Screen", "Settings / Dark UI", "Widget / Dashboard", "Media Player", "App Store Feature", "Message Thread"], 0);
    var layoutType = dropdownRow(design, "Susunan", ["Kartu kipas bertumpuk", "Grid rapi"], 1);
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
        var accents = [[0.0, 0.48, 0.98], [0.96, 0.23, 0.34], [0.62, 0.32, 0.91], [0.08, 0.61, 0.47], [1.0, 0.56, 0.12], [0.06, 0.62, 0.82]];
        var accent = colorCopy(accents[index % accents.length]);
        if (theme === "Dark") return { bg: [0.055, 0.065, 0.09], fg: [0.96, 0.97, 0.99], muted: [0.61, 0.65, 0.72], accent: [0.12, 0.55, 1.0], surface: [0.105, 0.12, 0.16], line: [0.18, 0.20, 0.25], tint: [0.14, 0.20, 0.29] };
        if (theme === "Vibrant") return { bg: [0.965, 0.972, 0.99], fg: [0.08, 0.09, 0.13], muted: [0.39, 0.43, 0.50], accent: accent, surface: [1, 1, 1], line: [0.87, 0.89, 0.92], tint: [0.91, 0.94, 0.99] };
        return { bg: [0.965, 0.968, 0.978], fg: [0.09, 0.095, 0.11], muted: [0.43, 0.44, 0.47], accent: [0.0, 0.43, 0.94], surface: [1, 1, 1], line: [0.87, 0.88, 0.90], tint: [0.93, 0.95, 0.98] };
    }
    function makeCardComp(parentComp, index, title, detail, label, type, theme, width, height) {
        var fps = parentComp.frameRate || 30;
        var duration = Math.max(parentComp.duration, 1);
        var safeName = title.replace(/[\\\/:*?"<>|]/g, " ").substring(0, 26);
        var cardComp = app.project.items.addComp("Card " + (index + 1) + " — " + safeName, width, height, parentComp.pixelAspect || 1, duration, fps);
        var col = themeColors(theme, index);
        cardComp.bgColor = colorCopy(col.bg);
        var pad = Math.round(width * 0.075);
        var titleSize = Math.max(23, Math.round(width * 0.073));
        var bodySize = Math.max(15, Math.round(width * 0.041));
        var smallSize = Math.max(11, Math.round(width * 0.029));
        var cx = width / 2, cy = height / 2;
        var maxBody = Math.max(17, Math.floor((width - 2 * pad) / (bodySize * 0.56)));
        var body = wrapText(detail, maxBody);
        var titleText = wrapText(title, Math.max(12, Math.floor((width - 2 * pad) / (titleSize * 0.55))));

        // Quiet iOS-like canvas with a subtle keyline: consistent radius, spacing and typography.
        shapeRect(cardComp, "Card Keyline", cx, cy, width - 2, height - 2, Math.round(width * 0.065), col.line);
        shapeRect(cardComp, "Card Surface", cx, cy, width - 4, height - 4, Math.round(width * 0.062), col.bg);

        function txt(name, value, x, y, size, color, center) {
            return addText(cardComp, name + " — editable", value, x, y, size, color, !!center);
        }
        function rect(name, x, y, w, h, radius, color) {
            return shapeRect(cardComp, name, x, y, w, h, radius, color);
        }
        function circle(name, x, y, d, color) { return addCircle(cardComp, name, x, y, d, color); }
        function statusBar() {
            txt("Status time", "9:41", pad, height * 0.105, smallSize, col.fg, false);
            txt("Status indicators", "LTE  100%", width - pad - width * 0.23, height * 0.105, smallSize, col.muted, false);
        }
        function divider(y) {
            rect("Hairline divider", cx, y, width - pad * 2, Math.max(1, width * 0.002), 1, col.line);
        }

        if (type === "Notification / Lock Screen") {
            statusBar();
            rect("Dynamic Island", cx, height * 0.16, width * 0.25, height * 0.065, height * 0.032, [0.025, 0.03, 0.045]);
            circle("Live Activity indicator", cx + width * 0.085, height * 0.16, width * 0.018, [0.20, 0.82, 0.43]);
            txt("Lock screen label", label.toUpperCase(), pad, height * 0.245, smallSize, col.muted, false);
            txt("Clock", "9:41", pad, height * 0.49, Math.round(width * 0.16), col.fg, false);
            rect("Notification panel", cx, height * 0.73, width - pad * 1.25, height * 0.33, Math.round(width * 0.045), col.surface);
            circle("Notification app icon", pad + width * 0.055, height * 0.64, width * 0.075, col.accent);
            txt("Notification app mark", "A", pad + width * 0.043, height * 0.655, smallSize, [1, 1, 1], false);
            txt("Notification heading", titleText, pad + width * 0.12, height * 0.68, bodySize + 2, col.fg, false);
            txt("Notification detail", body, pad + width * 0.12, height * 0.77, smallSize + 1, col.muted, false);
            rect("Notification highlight", pad + width * 0.035, height * 0.82, width * 0.012, height * 0.11, width * 0.006, col.accent);
            txt("Notification footer", "Tap to view", pad + width * 0.075, height * 0.85, smallSize, col.accent, false);
        } else if (type === "Settings / Dark UI") {
            statusBar();
            txt("Settings section", label.toUpperCase(), pad, height * 0.23, smallSize, col.muted, false);
            txt("Settings heading", "Settings", pad, height * 0.37, titleSize + 3, col.fg, false);
            rect("Settings group", cx, height * 0.70, width - pad * 2, height * 0.48, Math.round(width * 0.035), col.surface);
            var rowTop = height * 0.55, rowGap = height * 0.145, rowNames = [title, "Wi-Fi", "Bluetooth"];
            var rowDetails = [detail, "Connected", "On"];
            var rowColors = [col.accent, [0.12, 0.67, 0.96], [0.28, 0.55, 0.96]];
            var si;
            for (si = 0; si < 3; si++) {
                var ry = rowTop + si * rowGap;
                if (si > 0) divider(ry - height * 0.055);
                rect("Settings icon tile " + si, pad + width * 0.055, ry, width * 0.10, width * 0.10, width * 0.025, rowColors[si]);
                txt("Settings icon letter " + si, si === 0 ? "A" : (si === 1 ? "W" : "B"), pad + width * 0.038, ry + height * 0.012, smallSize, [1, 1, 1], false);
                txt("Settings row title " + si, rowNames[si], pad + width * 0.13, ry - height * 0.015, bodySize, col.fg, false);
                txt("Settings row detail " + si, wrapText(rowDetails[si], 24), pad + width * 0.13, ry + height * 0.045, smallSize, col.muted, false);
                if (si < 2) {
                    rect("Settings toggle track " + si, width - pad - width * 0.085, ry + height * 0.018, width * 0.12, height * 0.062, height * 0.031, col.accent);
                    circle("Settings toggle knob " + si, width - pad - width * 0.055, ry + height * 0.018, height * 0.052, [1, 1, 1]);
                } else txt("Settings row chevron " + si, ">", width - pad - width * 0.07, ry + height * 0.015, bodySize, col.muted, false);
            }
        } else if (type === "Widget / Dashboard") {
            txt("Widget label", label.toUpperCase(), pad, height * 0.19, smallSize, col.accent, false);
            txt("Widget title", titleText, pad, height * 0.34, titleSize, col.fg, false);
            txt("Widget summary", body, pad, height * 0.46, bodySize, col.muted, false);
            divider(height * 0.58);
            var barBase = height * 0.87, chartLeft = pad, chartWidth = width - pad * 2, bars = 7;
            var barGap = chartWidth * 0.055, barWidth = (chartWidth - barGap * (bars - 1)) / bars;
            var heights = [0.12, 0.19, 0.15, 0.27, 0.22, 0.34, 0.29];
            var bi;
            for (bi = 0; bi < bars; bi++) rect("Widget chart bar " + bi, chartLeft + barWidth * 0.5 + bi * (barWidth + barGap), barBase - height * heights[bi] / 2, barWidth, height * heights[bi], barWidth * 0.45, bi === bars - 2 ? col.accent : col.tint);
            txt("Widget chart caption", "WEEKLY OVERVIEW", pad, height * 0.94, smallSize, col.muted, false);
        } else if (type === "Media Player") {
            statusBar();
            rect("Album artwork", cx, height * 0.39, width - pad * 2, height * 0.45, Math.round(width * 0.04), col.tint);
            circle("Artwork disc", cx, height * 0.39, width * 0.24, col.accent);
            circle("Artwork center", cx, height * 0.39, width * 0.075, col.surface);
            txt("Album label", label.toUpperCase(), pad, height * 0.67, smallSize, col.muted, false);
            txt("Track title", titleText, pad, height * 0.77, titleSize * 0.82, col.fg, false);
            txt("Artist / details", body, pad, height * 0.86, bodySize, col.muted, false);
            rect("Playback track", cx, height * 0.92, width - pad * 2, width * 0.012, width * 0.006, col.line);
            rect("Playback progress", pad + width * 0.18, height * 0.92, width * 0.36, width * 0.012, width * 0.006, col.accent);
        } else if (type === "App Store Feature") {
            statusBar();
            rect("App icon tile", pad + width * 0.13, height * 0.31, width * 0.24, width * 0.24, Math.round(width * 0.052), col.accent);
            txt("App glyph", "A", pad + width * 0.10, height * 0.345, Math.round(width * 0.12), [1, 1, 1], false);
            txt("App category", label.toUpperCase(), pad, height * 0.53, smallSize, col.accent, false);
            txt("App name", titleText, pad, height * 0.66, titleSize * 0.88, col.fg, false);
            txt("App description", body, pad, height * 0.78, bodySize, col.muted, false);
            rect("Get button", width - pad - width * 0.18, height * 0.90, width * 0.17, height * 0.09, height * 0.045, col.tint);
            txt("Get button label", "GET", width - pad - width * 0.145, height * 0.915, smallSize, col.accent, false);
        } else {
            statusBar();
            txt("Conversation name", titleText, pad, height * 0.28, titleSize * 0.86, col.fg, false);
            txt("Conversation status", label, pad, height * 0.36, smallSize, col.muted, false);
            rect("Incoming message bubble", pad + width * 0.20, height * 0.57, width * 0.72, height * 0.23, Math.round(width * 0.045), col.surface);
            txt("Incoming message", body, pad + width * 0.25, height * 0.55, bodySize, col.fg, false);
            rect("Outgoing message bubble", width - pad - width * 0.72, height * 0.82, width * 0.72, height * 0.18, Math.round(width * 0.045), col.accent);
            txt("Outgoing message", "Sounds good!", width - pad - width * 0.65, height * 0.81, bodySize, [1, 1, 1], false);
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
            var portraitComp = comp.height > comp.width;
            var columns = portraitComp ? (count <= 3 ? 1 : 2) : (count <= 4 ? 2 : 3);
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
