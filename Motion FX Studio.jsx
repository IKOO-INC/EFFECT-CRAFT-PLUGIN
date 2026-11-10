/*
  Motion FX Studio — Alight Motion-inspired effect stacks made from EffectCraft effects.
  Select a layer (or several), then click a card to add its native effect stack.
*/
(function (thisObj) {
    var TITLE = "Motion FX Studio";
    var FX = [
        { name: "Neon Bloom", category: "Glow", icon: "GLOW", desc: "Bright halo · crisp highlights", steps: [
            { effect: "ec.stylize.glow", fallback: "ADBE Glo2", values: { threshold: 42, radius: 42, intensity: 1.8 } }
        ] },
        { name: "Soft Bloom", category: "Glow", icon: "LUMA", desc: "Soft focus + luminous glow", steps: [
            { effect: "ec.blur.gaussian", fallback: "ADBE Gaussian Blur 2", values: { blurriness: 7, repeatEdge: true } },
            { effect: "ec.stylize.glow", fallback: "ADBE Glo2", values: { threshold: 58, radius: 24, intensity: 1.25 } }
        ] },
        { name: "Dream Blur", category: "Blur", icon: "BLUR", desc: "Gentle Gaussian diffusion", steps: [
            { effect: "ec.blur.gaussian", fallback: "ADBE Gaussian Blur 2", values: { blurriness: 11, repeatEdge: true } }
        ] },
        { name: "Directional Smear", category: "Blur", icon: "MOVE", desc: "Directional streaking blur", steps: [
            { effect: "ec.blur.directional", values: { blurLength: 16, direction: 0 } }
        ] },
        { name: "Chromatic Shift", category: "Color", icon: "RGB", desc: "Color-fringe lens treatment", steps: [
            { effect: "ec.vr.chromaticaberrations", values: { strength: 0.025, amount: 0.025, intensity: 0.025 } }
        ] },
        { name: "Echo Trails", category: "Time", icon: "ECHO", desc: "Layered motion echoes", steps: [
            { effect: "ec.time.echo", fallback: "ADBE Echo", values: { echoTime: -0.04, numberOfEchoes: 6, startingIntensity: 0.85, decay: 0.72 } }
        ] },
        { name: "Wave Warp", category: "Distort", icon: "WAVE", desc: "Fluid animated wave distortion", steps: [
            { effect: "ec.distort.wavewarp", values: { waveHeight: 12, waveWidth: 110, direction: 0, speed: 0.35 } }
        ] },
        { name: "Cinematic Vignette", category: "Color", icon: "LENS", desc: "Focus attention toward center", steps: [
            { effect: "ec.stylize.ccvignette", values: { amount: 35, intensity: 35, vignetteAmount: 35 } }
        ] },
        { name: "Film Grain", category: "Texture", icon: "GRAIN", desc: "Fine texture for a film finish", steps: [
            { effect: "ec.noise.noise", values: { amount: 4, noiseAmount: 4, intensity: 4 } }
        ] },
        { name: "Neon RGB", category: "Glow", icon: "RGB+", desc: "Glow stack with color fringing", steps: [
            { effect: "ec.stylize.glow", fallback: "ADBE Glo2", values: { threshold: 48, radius: 35, intensity: 1.7 } },
            { effect: "ec.vr.chromaticaberrations", values: { strength: 0.018, amount: 0.018, intensity: 0.018 } }
        ] }
    ];

    var ui = (thisObj instanceof Panel) ? thisObj : new Window("palette", TITLE, undefined, { resizeable: true });
    ui.orientation = "column";
    ui.alignChildren = ["fill", "top"];
    ui.spacing = 8;
    ui.margins = 12;
    ui.minimumSize = [350, 600];

    var header = ui.add("panel", undefined, "MOTION FX  /  EFFECTCRAFT");
    header.orientation = "column";
    header.alignChildren = ["fill", "top"];
    header.spacing = 4;
    header.margins = 10;
    header.add("statictext", undefined, "Motion effects for bold edits");
    header.add("statictext", undefined, "Alight Motion-inspired looks · native EffectCraft FX");

    var browse = ui.add("panel", undefined, "FX LIBRARY");
    browse.orientation = "column";
    browse.alignChildren = ["fill", "top"];
    browse.spacing = 6;
    browse.margins = 10;
    var filterRow = browse.add("group");
    filterRow.orientation = "row";
    filterRow.alignChildren = ["left", "center"];
    filterRow.add("statictext", undefined, "Category");
    var category = filterRow.add("dropdownlist", undefined, ["All FX", "Glow", "Blur", "Color", "Time", "Distort", "Texture"]);
    category.selection = 0;
    category.alignment = ["fill", "center"];
    var search = browse.add("edittext", undefined, "");
    search.helpTip = "Search effect presets";
    search.minimumSize.height = 25;
    var countLabel = browse.add("statictext", undefined, "10 effect stacks · click a card to apply");

    var library = ui.add("panel", undefined, "PRESET CARDS");
    library.orientation = "column";
    library.alignChildren = ["fill", "top"];
    library.spacing = 6;
    library.margins = 9;
    var grid = library.add("group");
    grid.orientation = "column";
    grid.alignChildren = ["fill", "top"];
    grid.spacing = 6;
    var pageSize = 6;
    var cards = [];
    var currentPage = 0;
    var filtered = [];

    function styleCard(panel, activeState) {
        panel.onDraw = function () {
            try {
                var g = this.graphics, w = this.size.width, h = this.size.height;
                var bg = g.newBrush(g.BrushType.SOLID_COLOR, activeState.active ? [0.10, 0.12, 0.20, 1] : [0.075, 0.085, 0.12, 1]);
                var border = g.newPen(g.PenType.SOLID_COLOR, activeState.active ? [0.42, 0.55, 1, 0.95] : [0.20, 0.25, 0.43, 0.8], activeState.active ? 2 : 1);
                var glow = g.newPen(g.PenType.SOLID_COLOR, [0.35, 0.26, 0.95, 0.32], 5);
                try { g.fillRoundRect(bg, 0, 0, w, h, 9, 9); }
                catch (roundFillError) { g.fillRect(bg, 0, 0, w, h); }
                try { g.drawRoundRect(glow, 1, 1, w - 2, h - 2, 9, 9); } catch (glowError) {}
                try { g.drawRoundRect(border, 1, 1, w - 2, h - 2, 9, 9); } catch (borderError) { g.drawRect(border, 1, 1, w - 2, h - 2); }
            } catch (e) {}
        };
    }

    var r, c;
    for (r = 0; r < 3; r++) {
        var row = grid.add("group");
        row.orientation = "row";
        row.alignChildren = ["fill", "top"];
        row.spacing = 6;
        for (c = 0; c < 2; c++) {
            var panel = row.add("panel", undefined, "");
            panel.orientation = "column";
            panel.alignChildren = ["fill", "top"];
            panel.spacing = 3;
            panel.margins = 7;
            panel.preferredSize = [156, 86];
            var activeState = { active: false, index: -1 };
            styleCard(panel, activeState);
            var top = panel.add("group");
            top.orientation = "row";
            top.alignChildren = ["left", "center"];
            var icon = top.add("statictext", undefined, "FX");
            icon.preferredSize = [38, 20];
            var title = top.add("statictext", undefined, "Effect");
            var desc = panel.add("statictext", undefined, "Native effect stack");
            var use = panel.add("button", undefined, "Apply FX");
            use.preferredSize.height = 24;
            cards.push({ panel: panel, active: activeState, icon: icon, title: title, desc: desc, button: use, fxIndex: -1 });
        }
    }
    var nav = library.add("group");
    nav.orientation = "row";
    nav.alignChildren = ["center", "center"];
    nav.alignment = ["center", "top"];
    var prev = nav.add("button", undefined, "‹ Back");
    var pageText = nav.add("statictext", undefined, "1 / 2");
    var next = nav.add("button", undefined, "More ›");

    var footer = ui.add("panel", undefined, "STATUS");
    footer.orientation = "column";
    footer.alignChildren = ["fill", "top"];
    footer.margins = 9;
    var status = footer.add("statictext", undefined, "Select layer(s), then apply an FX card.", { multiline: true });
    status.minimumSize.height = 30;

    function refreshCards() {
        var cat = category.selection ? category.selection.text : "All FX";
        var q = String(search.text || "").toLowerCase();
        filtered = [];
        var i;
        for (i = 0; i < FX.length; i++) {
            if (cat !== "All FX" && FX[i].category !== cat) continue;
            if (q && FX[i].name.toLowerCase().indexOf(q) < 0 && FX[i].category.toLowerCase().indexOf(q) < 0 && FX[i].desc.toLowerCase().indexOf(q) < 0) continue;
            filtered.push(i);
        }
        var pages = Math.max(1, Math.ceil(filtered.length / pageSize));
        if (currentPage >= pages) currentPage = pages - 1;
        var start = currentPage * pageSize;
        for (i = 0; i < cards.length; i++) {
            var card = cards[i], slot = start + i;
            if (slot < filtered.length) {
                var fxIndex = filtered[slot], item = FX[fxIndex];
                card.panel.visible = true;
                card.fxIndex = fxIndex;
                card.active.index = fxIndex;
                card.icon.text = item.icon;
                card.title.text = item.name;
                card.desc.text = item.desc;
                card.button.text = "Apply FX";
                card.button.helpTip = "Apply " + item.name + " to selected layer(s)";
                card.button.onClick = (function (index, active) {
                    return function () {
                        var j;
                        for (j = 0; j < cards.length; j++) {
                            cards[j].active.active = cards[j].active.index === index;
                            try { cards[j].panel.onDraw.call(cards[j].panel); } catch (e) {}
                        }
                        applyFX(index);
                    };
                })(fxIndex, card.active);
            } else {
                card.panel.visible = false;
                card.fxIndex = -1;
            }
        }
        countLabel.text = filtered.length + " effect preset(s) · native EffectCraft effects";
        pageText.text = filtered.length ? (start + 1) + "–" + Math.min(start + pageSize, filtered.length) + " / " + filtered.length : "0 FX";
        prev.enabled = currentPage > 0;
        next.enabled = currentPage < pages - 1;
        if (!filtered.length) status.text = "No FX matches. Try another category or search.";
        try { ui.layout.layout(true); } catch (e) {}
    }

    function normName(value) {
        return String(value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    }

    function findParam(group, aliases, depth) {
        if (!group || depth > 5) return null;
        var i, p, n, j;
        for (j = 0; j < aliases.length; j++) {
            try { p = group.property(aliases[j]); } catch (e) { p = null; }
            if (p) return p;
        }
        var wanted = [];
        for (j = 0; j < aliases.length; j++) wanted.push(normName(aliases[j]));
        try {
            for (i = 1; i <= group.numProperties; i++) {
                p = group.property(i);
                n = normName(p.name) + "|" + normName(p.matchName);
                for (j = 0; j < wanted.length; j++) if (n.indexOf(wanted[j]) >= 0) return p;
                if (p.numProperties > 0) {
                    var nested = findParam(p, aliases, depth + 1);
                    if (nested) return nested;
                }
            }
        } catch (walkError) {}
        return null;
    }

    function setEffectValues(effectGroup, values) {
        var configured = 0, key, prop;
        for (key in values) {
            if (!values.hasOwnProperty(key)) continue;
            var aliases = [key];
            if (key === "blurriness") aliases.push("Blur Amount", "Blurriness", "ADBE Gaussian Blur 2-0001");
            if (key === "repeatEdge") aliases.push("Repeat Edge Pixels", "Repeat Edge", "ADBE Gaussian Blur 2-0003");
            if (key === "radius") aliases.push("Glow Radius", "ADBE Glo2-0003");
            if (key === "threshold") aliases.push("Glow Threshold");
            if (key === "intensity") aliases.push("Glow Intensity");
            if (key === "numberOfEchoes") aliases.push("Number Of Echoes");
            if (key === "echoTime") aliases.push("Echo Time");
            if (key === "startingIntensity") aliases.push("Starting Intensity");
            if (key === "decay") aliases.push("Decay");
            prop = findParam(effectGroup, aliases, 0);
            if (!prop) continue;
            try { prop.setValue(values[key]); configured++; } catch (setError) {}
        }
        return configured;
    }

    function applyOneEffect(layer, step) {
        var result = null, added = false;
        try {
            if (app.run) {
                result = app.run("effect.apply", { layer: layer.index, effect: step.effect });
                added = true;
            }
        } catch (commandError) {}
        var parade = null, fxGroup = null;
        try { parade = layer.property("ADBE Effect Parade"); } catch (e) {}
        if (!added && parade) {
            try { fxGroup = parade.addProperty(step.fallback || step.effect); added = !!fxGroup; } catch (fallbackError) {}
        }
        if (added && !fxGroup && parade) {
            try { fxGroup = parade.property(parade.numProperties); } catch (lookupError) {}
        }
        var configured = fxGroup && step.values ? setEffectValues(fxGroup, step.values) : 0;
        return { added: added, configured: configured };
    }

    function applyFX(index) {
        var item = FX[index];
        var comp = app.project ? app.project.activeItem : null;
        if (!(comp instanceof CompItem)) {
            status.text = "Open a composition and select layer(s) first.";
            return;
        }
        var layers = comp.selectedLayers;
        if (!layers || !layers.length) {
            status.text = "Select one or more layers in the timeline first.";
            return;
        }
        var appliedLayers = 0, failedLayers = 0, paramsSet = 0, i, j, layer, step, result;
        app.beginUndoGroup("Motion FX · " + item.name);
        try {
            for (i = 0; i < layers.length; i++) {
                layer = layers[i];
                var layerOk = true;
                for (j = 0; j < item.steps.length; j++) {
                    step = item.steps[j];
                    result = applyOneEffect(layer, step);
                    if (!result.added) layerOk = false;
                    paramsSet += result.configured;
                }
                if (layerOk) appliedLayers++; else failedLayers++;
            }
        } finally {
            app.endUndoGroup();
        }
        if (appliedLayers) {
            status.text = "Applied “" + item.name + "” to " + appliedLayers + " layer(s). " + paramsSet + " effect setting(s) configured." + (failedLayers ? " " + failedLayers + " layer(s) had unsupported effects." : "") + " Adjust further in Effect Controls.";
        } else {
            status.text = "Could not add this FX stack. Check that the selected layer accepts these EffectCraft effects.";
        }
    }

    category.onChange = function () { currentPage = 0; refreshCards(); };
    search.onChanging = function () { currentPage = 0; refreshCards(); };
    prev.onClick = function () { if (currentPage > 0) currentPage--; refreshCards(); };
    next.onClick = function () { currentPage++; refreshCards(); };
    refreshCards();

    if (ui instanceof Window) {
        ui.onResizing = ui.onResize = function () { this.layout.resize(); };
        ui.center();
        ui.show();
    } else {
        ui.layout.layout(true);
    }
})(this);
