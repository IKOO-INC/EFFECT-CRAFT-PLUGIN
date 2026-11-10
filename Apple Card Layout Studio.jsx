/*
  Apple Card Layout Studio — generates editable native card compositions for EffectCraft.
  Each generated card is a precomp containing shape and live-text layers. No footage or
  rasterized text is used. Select generated card precomps and animate them with Card Motion Studio.
*/
(function (thisObj) {
    var TITLE = "Apple Card Layout Studio";

    var ui = (thisObj instanceof Panel) ? thisObj : new Window("palette", TITLE, undefined, { resizeable: true });
    ui.orientation = "column";
    ui.alignChildren = ["fill", "top"];
    ui.spacing = 7;
    ui.margins = 10;
    ui.minimumSize = [360, 350];

    var header = ui.add("panel", undefined, "APPLE CARD LAYOUT STUDIO");
    header.orientation = "column";
    header.alignChildren = ["fill", "top"];
    header.spacing = 3;
    header.margins = 9;
    header.add("statictext", undefined, "20 template UI editable · termasuk Liquid Glass-inspired");
    header.add("statictext", undefined, "Edit judul dan isi langsung di dalam precomp kartu");

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
    var cardType = dropdownRow(design, "Template", ["Notification / Lock Screen", "Settings / Dark UI", "Widget / Dashboard", "Media Player", "App Store Feature", "Message Thread", "Liquid Glass / Control Center", "Liquid Glass / Tab Bar", "Liquid Glass / Toolbar", "Liquid Glass / Segmented", "Live Activity / Dynamic Island", "Spotlight / Search", "Sidebar / Navigation", "App Icon Grid", "Weather / Widget", "Finance / Stocks", "Smart Stack / Widgets", "Notification Stack", "Focus / Control Tile", "Calendar / Event"], 6);
    var layoutType = dropdownRow(design, "Susunan", ["Kartu kipas bertumpuk", "Grid rapi"], 1);
    var themeType = dropdownRow(design, "Tema", ["Light", "Dark", "Vibrant"], 0);
    var countType = dropdownRow(design, "Jumlah kartu", ["1", "2", "3", "4", "5", "6"], 4);

    var action = ui.add("panel", undefined, "BUAT KARTU");
    action.orientation = "column";
    action.alignChildren = ["fill", "top"];
    action.margins = 9;
    var buildButton = action.add("button", undefined, "BUAT LAYOUT KARTU EDITABLE");
    buildButton.preferredSize.height = 32;
    var status = action.add("statictext", undefined, "Pilih template dan jumlah kartu. Ubah teks setelah dibuat dengan membuka precomp kartu.", { multiline: true });
    status.minimumSize.height = 36;

    function selectedText(control) { return control.selection ? control.selection.text : ""; }
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
    function defaultCardContent(type, index) {
        var bank = {
            "Notification / Lock Screen": [["Gate A10", "Team meeting", "Package delivered", "New message", "Flight update", "Daily summary"], ["Boarding begins in 25 minutes.", "Design review starts at 10:30.", "Your order is at the door.", "Are we still on for today?", "SFO to JFK · On time.", "You have 3 updates to review."], ["NOW", "10:30 AM", "DELIVERY", "MESSAGES", "ON TIME", "TODAY"]],
            "Settings / Dark UI": [["Airplane Mode", "Wi-Fi", "Bluetooth", "Focus", "Display", "Sounds"], ["Turn connections on or off.", "Connected to Studio Network.", "Ready to connect nearby.", "Personal focus is active.", "Appearance and brightness.", "Ringer and alerts."], ["SETTINGS", "CONNECTED", "AVAILABLE", "PERSONAL", "DISPLAY", "SOUNDS"]],
            "Widget / Dashboard": [["Weekly Activity", "Screen Time", "Daily Steps", "Weather", "Portfolio", "Energy Use"], ["A good week starts with small steps.", "Down 18% compared with last week.", "You are close to your daily goal.", "Clear skies through the afternoon.", "Markets are up 2.4% today.", "Usage is lower than yesterday."], ["THIS WEEK", "7-DAY VIEW", "TODAY", "JAKARTA", "MARKET", "HOME"]],
            "Media Player": [["Morning Light", "Ambient Waves", "City at Night", "New Music Mix", "Deep Focus", "Daily Replay"], ["Mira Sol · Soft pop", "Ocean Sounds · 45 min", "Various Artists · Radio", "Made for your morning.", "Instrumental · No vocals", "Your most played this week."], ["PLAYING NOW", "SLEEP SOUNDS", "RADIO", "MIX 01", "FOCUS", "REPLAY"]],
            "App Store Feature": [["Photo Studio", "Fitness Tracker", "Maps & Trails", "Notes, Made Simple", "Healthy Habits", "Daily Journal"], ["A little more room to create.", "Build a routine that feels good.", "Find a new way outside.", "Capture thoughts as they happen.", "Small steps, lasting change.", "Make a moment of every day."], ["CREATIVITY", "HEALTH & FITNESS", "TRAVEL", "PRODUCTIVITY", "WELLNESS", "LIFESTYLE"]],
            "Message Thread": [["Emma Chen", "Alex Morgan", "Design Team", "Family", "Jordan Lee", "Sam Rivera"], ["Are we still on for today?", "Just sent you the photos.", "The new build looks great.", "Dinner at seven?", "I will meet you there.", "Thanks, talk soon!"], ["TODAY  9:41 AM", "YESTERDAY", "3 MEMBERS", "4 MEMBERS", "ACTIVE NOW", "DELIVERED"]],
            "Liquid Glass / Control Center": [["Control Center", "Quick Controls", "Now Playing", "Home Controls", "Brightness", "Connectivity"], ["Your essential controls, one swipe away.", "Adjust settings at a glance.", "A quiet mix for this moment.", "Everything at home, in one place.", "Tune the display to your space.", "Stay connected wherever you go."], ["CONTROLS", "DEVICE", "AUDIO", "HOME", "DISPLAY", "NETWORK"]],
            "Liquid Glass / Tab Bar": [["Explore", "Your Library", "Games", "Apps", "Arcade", "Search"], ["Find something wonderful today.", "Everything you have saved.", "A new favorite is waiting.", "Made for your everyday.", "Play, discover, repeat.", "Find exactly what you need."], ["TODAY", "LIBRARY", "GAMES", "APPS", "ARCADE", "SEARCH"]],
            "Liquid Glass / Toolbar": [["New Collection", "Your Workspace", "Photo Details", "Reading List", "Shared Album", "Quick Actions"], ["A few useful actions, right where you need them.", "Keep your favorite things close.", "Tools float above the content.", "Pick up where you left off.", "A place for everyone's photos.", "Simple controls for the moment."], ["EDIT", "WORKSPACE", "PHOTO", "BOOKMARKS", "SHARED", "ACTIONS"]],
            "Liquid Glass / Segmented": [["Browse", "Highlights", "Recent", "Favorites", "Shared", "Updates"], ["Move between sections without losing your place.", "The latest things, picked for you.", "Your recent activity in one view.", "The things you come back to.", "Made better together.", "Everything new since your last visit."], ["TODAY", "FEATURED", "RECENT", "SAVED", "PEOPLE", "LATEST"]],
            "Live Activity / Dynamic Island": [["Flight to SFO", "Timer", "Order on the way", "Morning Run", "Car arriving", "Event starts soon"], ["Boarding begins in 25 minutes.", "A little time left to focus.", "Your order is around the corner.", "4.2 km · feeling good.", "Driver is 2 minutes away.", "Doors open in 10 minutes."], ["GATE A10", "02:14", "2 MIN", "LIVE", "NEARBY", "10 MIN"]],
            "Spotlight / Search": [["Search your library", "Find a place", "Search photos", "Recent files", "Explore apps", "Look something up"], ["Suggested results appear as you type.", "Places, routes, and favorites.", "People, moments, and locations.", "Pick up where you left off.", "Discover something useful.", "Your search, made simpler."], ["SUGGESTIONS", "MAPS", "PHOTOS", "RECENTS", "APP LIBRARY", "SEARCH"]],
            "Sidebar / Navigation": [["Your Library", "Favorites", "Recently Added", "Downloads", "Shared with You", "Playlists"], ["Everything you have collected.", "The things you love most.", "New additions, all together.", "Available whenever you are.", "Things shared by your friends.", "A soundtrack for every day."], ["BROWSE", "SAVED", "COLLECTION", "OFFLINE", "SHARED", "MUSIC"]],
            "App Icon Grid": [["App Library", "Today", "Create", "Stay Connected", "Daily Tools", "Discover"], ["Your everyday apps, in one place.", "A little inspiration for today.", "Ideas begin with a blank page.", "Keep your favorite people close.", "Small tools for daily life.", "Find something new to love."], ["ALL APPS", "FEATURED", "CREATE", "SOCIAL", "PRODUCTIVITY", "EXPLORE"]],
            "Weather / Widget": [["Jakarta", "San Francisco", "London", "Tokyo", "New York", "Singapore"], ["Partly cloudy · H 29°  L 24°", "Mostly sunny · H 21°  L 14°", "Light rain · H 16°  L 11°", "Clear skies · H 22°  L 16°", "Breezy · H 18°  L 12°", "Warm and humid · H 31°  L 26°"], ["TODAY", "LOCAL TIME", "FORECAST", "7-DAY", "CURRENT", "HOURLY"]],
            "Finance / Stocks": [["Apple Inc.", "Market Overview", "Your Portfolio", "Technology", "Sustainable Energy", "Daily Movers"], ["AAPL · Technology · +2.46% today.", "Major indexes are trending higher.", "Your portfolio is up this week.", "A quick look at the market.", "Clean energy gains momentum.", "The biggest changes today."], ["AAPL", "MARKET", "PORTFOLIO", "NASDAQ", "GREEN", "TODAY"]],
            "Smart Stack / Widgets": [["Daily Overview", "Up Next", "Activity", "Travel Day", "Workday", "At Home"], ["Your day, at a glance.", "A meeting starts in 15 minutes.", "You are close to your move goal.", "Boarding time is coming up.", "Two things left on your list.", "The lights are ready when you are."], ["SMART STACK", "CALENDAR", "FITNESS", "TRAVEL", "REMINDERS", "HOME"]],
            "Notification Stack": [["Recent Activity", "Messages", "Orders", "Reminders", "Shared Albums", "Your Daily Brief"], ["The latest updates, all together.", "Emma sent you a new message.", "Your delivery is arriving soon.", "One item is due this afternoon.", "Three new photos were added.", "Your day is looking clear."], ["TODAY", "NOW", "2 MIN AGO", "10:30 AM", "YESTERDAY", "9:00 AM"]],
            "Focus / Control Tile": [["Personal Focus", "Work Focus", "Sleep Focus", "Do Not Disturb", "Reading Focus", "Fitness Focus"], ["Only the notifications you choose.", "Stay present with your work.", "Wind down and rest well.", "Quiet for a little while.", "A calmer space to read.", "Make room to move."], ["FOCUS ON", "WORK", "SLEEP", "PAUSED", "READING", "ACTIVE"]],
            "Calendar / Event": [["Planning Session", "Team Sync", "Lunch with Maya", "Project Review", "Product Launch", "Focus Block"], ["Studio · 10:00–10:45 AM", "Design room · 11:30 AM", "Cafe Linden · 12:30 PM", "Conference A · 2:00 PM", "Main stage · 4:00 PM", "Time to make progress."], ["MON · DEC 10", "TODAY", "12:30 PM", "2:00 PM", "4:00 PM", "ALL DAY"]]
        };
        var data = bank[type] || bank["Notification / Lock Screen"];
        return { title: data[0][index % data[0].length], detail: data[1][index % data[1].length], label: data[2][index % data[2].length] };
    }
    function colorCopy(color) { return [color[0], color[1], color[2]]; }
    function shapeRect(comp, name, x, y, w, h, radius, color, opacity) {
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
        var transform = layer.property("ADBE Transform Group");
        transform.property("ADBE Position").setValue([x, y]);
        if (typeof opacity === "number") {
            try { transform.property("ADBE Opacity").setValue(opacity); } catch (eOpacity) {}
        }
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
    function addCircle(comp, name, cx, cy, diameter, color, opacity) {
        return shapeRect(comp, name, cx, cy, diameter, diameter, diameter / 2, color, opacity);
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
        var liquidGlass = type.indexOf("Liquid Glass /") === 0;
        var transparentOverlay = liquidGlass || type.indexOf("Live Activity /") === 0;
        cardComp.bgColor = colorCopy(col.bg);
        var pad = Math.round(width * 0.075);
        var titleSize = Math.max(23, Math.round(width * 0.073));
        var bodySize = Math.max(15, Math.round(width * 0.041));
        var smallSize = Math.max(11, Math.round(width * 0.029));
        var cx = width / 2, cy = height / 2;
        var maxBody = Math.max(17, Math.floor((width - 2 * pad) / (bodySize * 0.56)));
        var body = wrapText(detail, maxBody);
        var titleText = wrapText(title, Math.max(12, Math.floor((width - 2 * pad) / (titleSize * 0.55))));

        // Opaque content cards use a quiet keyline. Glass/control overlays stay transparent
        // so the footage or composition background remains visible beneath their surfaces.
        if (!transparentOverlay) {
            shapeRect(cardComp, "Card Keyline", cx, cy, width - 2, height - 2, Math.round(width * 0.065), col.line);
            shapeRect(cardComp, "Card Surface", cx, cy, width - 4, height - 4, Math.round(width * 0.062), col.bg);
        }

        function txt(name, value, x, y, size, color, center) {
            return addText(cardComp, name + " — editable", value, x, y, size, color, !!center);
        }
        function rect(name, x, y, w, h, radius, color, opacity) {
            return shapeRect(cardComp, name, x, y, w, h, radius, color, opacity);
        }
        function circle(name, x, y, d, color, opacity) { return addCircle(cardComp, name, x, y, d, color, opacity); }
        function glassPanel(name, x, y, w, h) {
            var glassTint = theme === "Dark" ? [0.20, 0.24, 0.32] : [0.90, 0.94, 1.0];
            rect(name + " rim", x, y, w, h, Math.min(w, h) * 0.15, [1, 1, 1], 42);
            rect(name + " material", x, y, w - 4, h - 4, Math.min(w, h) * 0.14, glassTint, theme === "Dark" ? 72 : 60);
            rect(name + " top sheen", x, y - h * 0.39, w * 0.84, h * 0.08, h * 0.04, [1, 1, 1], 24);
        }
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
        } else if (type === "Liquid Glass / Control Center") {
            statusBar();
            txt("Control Center title", titleText, pad, height * 0.23, titleSize * 0.88, col.fg, false);
            txt("Control Center subtitle", label.toUpperCase(), pad, height * 0.29, smallSize, col.muted, false);
            glassPanel("Control Center glass", cx, height * 0.62, width * 0.92, height * 0.66);
            var controlNames = ["Airplane", "Wi-Fi", "Bluetooth", "Focus"];
            var controlMarks = ["A", "W", "B", "F"];
            var controlColors = [[1.0, 0.58, 0.14], [0.12, 0.52, 0.98], [0.12, 0.52, 0.98], [0.48, 0.50, 0.57]];
            var ci;
            for (ci = 0; ci < 4; ci++) {
                var ccx = cx + (ci % 2 === 0 ? -width * 0.22 : width * 0.22);
                var ccy = height * (ci < 2 ? 0.43 : 0.64);
                rect("Glass control tile " + ci, ccx, ccy, width * 0.40, height * 0.18, width * 0.07, col.surface, theme === "Dark" ? 74 : 68);
                circle("Glass control icon " + ci, ccx - width * 0.13, ccy - height * 0.025, width * 0.075, controlColors[ci]);
                txt("Glass control glyph " + ci, controlMarks[ci], ccx - width * 0.145, ccy - height * 0.013, smallSize, [1, 1, 1], false);
                txt("Glass control label " + ci, controlNames[ci], ccx - width * 0.16, ccy + height * 0.045, smallSize, col.fg, false);
            }
            rect("Brightness slider base", cx, height * 0.80, width * 0.80, height * 0.075, height * 0.037, col.surface, 76);
            rect("Brightness slider fill", cx - width * 0.12, height * 0.80, width * 0.56, height * 0.067, height * 0.033, [1, 1, 1], 80);
            rect("Volume slider base", cx, height * 0.90, width * 0.80, height * 0.075, height * 0.037, col.surface, 76);
            rect("Volume slider fill", cx + width * 0.08, height * 0.90, width * 0.40, height * 0.067, height * 0.033, col.accent, 88);
        } else if (type === "Liquid Glass / Tab Bar") {
            txt("Tab bar screen title", titleText, pad, height * 0.31, titleSize, col.fg, false);
            txt("Tab bar screen detail", body, pad, height * 0.41, bodySize, col.muted, false);
            glassPanel("Floating Liquid Glass tab bar", cx, height * 0.82, width * 0.92, height * 0.20);
            var tabNames = ["Today", "Games", "Apps", "Arcade"], tabMarks = ["T", "G", "A", "R"], ti;
            for (ti = 0; ti < 4; ti++) {
                var tx = width * (0.16 + ti * 0.227);
                if (ti === 0) rect("Selected tab capsule", tx, height * 0.82, width * 0.19, height * 0.16, height * 0.08, col.accent, 92);
                txt("Tab glyph " + ti, tabMarks[ti], tx - width * 0.012, height * 0.795, smallSize + 1, ti === 0 ? [1, 1, 1] : col.fg, false);
                txt("Tab label " + ti, tabNames[ti], tx - width * 0.035, height * 0.855, smallSize - 1, ti === 0 ? [1, 1, 1] : col.muted, false);
            }
        } else if (type === "Liquid Glass / Toolbar") {
            glassPanel("Floating toolbar", cx, height * 0.20, width * 0.90, height * 0.14);
            var toolMarks = ["<", "−", "+", "…"], tmi;
            for (tmi = 0; tmi < 4; tmi++) {
                var toolX = width * (0.19 + tmi * 0.205);
                circle("Toolbar button " + tmi, toolX, height * 0.20, width * 0.09, col.surface, 76);
                txt("Toolbar symbol " + tmi, toolMarks[tmi], toolX - width * 0.014, height * 0.218, bodySize, col.fg, false);
            }
            txt("Toolbar title", titleText, pad, height * 0.50, titleSize, col.fg, false);
            txt("Toolbar details", body, pad, height * 0.62, bodySize, col.muted, false);
            glassPanel("Floating accessory", cx, height * 0.83, width * 0.76, height * 0.16);
            txt("Toolbar accessory label", label.toUpperCase(), pad + width * 0.06, height * 0.85, smallSize, col.accent, false);
        } else if (type === "Liquid Glass / Segmented") {
            txt("Segmented screen title", titleText, pad, height * 0.42, titleSize, col.fg, false);
            txt("Segmented screen details", body, pad, height * 0.53, bodySize, col.muted, false);
            glassPanel("Segmented glass control", cx, height * 0.73, width * 0.88, height * 0.18);
            var segments = ["Today", "Apps", "Games"], segW = width * 0.27, segStart = cx - segW, sg;
            rect("Selected segment", segStart + segW, height * 0.73, segW * 0.95, height * 0.145, height * 0.07, col.surface, 92);
            for (sg = 0; sg < 3; sg++) txt("Segment " + sg, segments[sg], segStart + sg * segW - width * 0.04, height * 0.75, smallSize, sg === 1 ? col.fg : col.muted, true);
        } else if (type === "Live Activity / Dynamic Island") {
            statusBar();
            rect("Dynamic Island capsule", cx, height * 0.36, width * 0.82, height * 0.25, height * 0.125, [0.015, 0.02, 0.03]);
            circle("Live activity app badge", pad + width * 0.11, height * 0.36, width * 0.13, col.accent);
            txt("Live activity badge mark", "A", pad + width * 0.085, height * 0.38, bodySize, [1, 1, 1], false);
            txt("Live activity title", titleText, pad + width * 0.23, height * 0.34, bodySize, [1, 1, 1], false);
            txt("Live activity status", body, pad + width * 0.23, height * 0.43, smallSize, [0.78, 0.81, 0.86], false);
            txt("Live activity timer", label, width - pad - width * 0.15, height * 0.37, smallSize, [0.25, 0.85, 0.52], false);
            rect("Live activity progress base", cx, height * 0.76, width * 0.76, height * 0.025, height * 0.012, col.line, 90);
            rect("Live activity progress", pad + width * 0.23, height * 0.76, width * 0.30, height * 0.02, height * 0.01, col.accent, 100);
            txt("Live activity footer", "LIVE  ·  UPDATED JUST NOW", pad, height * 0.87, smallSize, col.muted, false);
        } else if (type === "Spotlight / Search") {
            statusBar();
            rect("Spotlight search field", cx, height * 0.25, width - pad * 2, height * 0.12, height * 0.06, col.surface);
            circle("Search icon", pad + width * 0.065, height * 0.25, width * 0.055, col.muted);
            txt("Search prompt", title, pad + width * 0.12, height * 0.27, bodySize, col.muted, false);
            txt("Search section heading", "SUGGESTIONS", pad, height * 0.43, smallSize, col.muted, false);
            var resultNames = [title, "Recent item", "Browse collection"], resultMarks = ["A", "R", "B"], ri;
            for (ri = 0; ri < 3; ri++) {
                var rY = height * (0.54 + ri * 0.13);
                if (ri > 0) divider(rY - height * 0.065);
                rect("Search result icon " + ri, pad + width * 0.05, rY, width * 0.085, width * 0.085, width * 0.022, ri === 0 ? col.accent : col.tint);
                txt("Search result symbol " + ri, resultMarks[ri], pad + width * 0.035, rY + height * 0.012, smallSize, ri === 0 ? [1, 1, 1] : col.accent, false);
                txt("Search result title " + ri, resultNames[ri], pad + width * 0.12, rY + height * 0.01, bodySize, col.fg, false);
                txt("Search result subtitle " + ri, ri === 0 ? body : "Open suggestion", pad + width * 0.12, rY + height * 0.06, smallSize, col.muted, false);
            }
        } else if (type === "Sidebar / Navigation") {
            rect("Sidebar pane", width * 0.25, cy, width * 0.45, height - pad * 1.2, Math.round(width * 0.045), col.surface);
            txt("Sidebar section", label.toUpperCase(), pad * 0.65, height * 0.20, smallSize, col.muted, false);
            var sideNames = [title, "Favorites", "Recently Added", "Downloads"], sideMarks = ["A", "F", "R", "D"], sbi;
            for (sbi = 0; sbi < 4; sbi++) {
                var sy = height * (0.32 + sbi * 0.12);
                if (sbi === 0) rect("Sidebar selected row", width * 0.25, sy, width * 0.40, height * 0.085, height * 0.04, col.tint);
                txt("Sidebar icon " + sbi, sideMarks[sbi], pad * 0.72, sy + height * 0.02, smallSize, sbi === 0 ? col.accent : col.muted, false);
                txt("Sidebar row " + sbi, sbi === 0 ? titleText : sideNames[sbi], pad * 1.65, sy + height * 0.02, smallSize, col.fg, false);
            }
            txt("Sidebar detail title", titleText, width * 0.53, height * 0.38, titleSize * 0.88, col.fg, false);
            txt("Sidebar detail body", body, width * 0.53, height * 0.49, bodySize, col.muted, false);
            rect("Sidebar content preview", width * 0.74, height * 0.72, width * 0.39, height * 0.28, Math.round(width * 0.035), col.tint);
            txt("Sidebar content label", "COLLECTION", width * 0.60, height * 0.89, smallSize, col.accent, false);
        } else if (type === "App Icon Grid") {
            txt("App library title", titleText, pad, height * 0.20, titleSize, col.fg, false);
            txt("App library category", label.toUpperCase(), pad, height * 0.27, smallSize, col.muted, false);
            var appNames = ["Camera", "Photos", "Music", "Maps", "Weather", "Notes"], appMarks = ["C", "P", "M", "M", "W", "N"], appColors = [[0.13, 0.14, 0.16], [0.98, 0.31, 0.43], [0.96, 0.21, 0.52], [0.15, 0.65, 0.96], [0.22, 0.58, 0.95], [1.0, 0.79, 0.2]], ai;
            for (ai = 0; ai < 6; ai++) {
                var ax = width * (0.27 + (ai % 3) * 0.23), ay = height * (0.48 + Math.floor(ai / 3) * 0.28);
                rect("App icon " + ai, ax, ay, width * 0.16, width * 0.16, width * 0.04, appColors[ai]);
                txt("App icon glyph " + ai, appMarks[ai], ax - width * 0.025, ay + height * 0.02, titleSize * 0.72, [1, 1, 1], false);
                txt("App icon label " + ai, ai === 0 ? title : appNames[ai], ax - width * 0.04, ay + height * 0.13, smallSize, col.fg, false);
            }
            txt("App library footer", body, pad, height * 0.94, smallSize, col.muted, false);
        } else if (type === "Weather / Widget") {
            txt("Weather location", titleText, pad, height * 0.19, bodySize, col.fg, false);
            txt("Weather condition", body, pad, height * 0.27, smallSize, col.muted, false);
            circle("Weather sun outer", width - pad - width * 0.17, height * 0.36, width * 0.25, [1.0, 0.72, 0.22]);
            circle("Weather sun glow", width - pad - width * 0.17, height * 0.36, width * 0.17, [1.0, 0.84, 0.37]);
            txt("Temperature", "18°", pad, height * 0.54, Math.round(width * 0.20), col.fg, false);
            txt("Weather summary", label, pad, height * 0.63, bodySize, col.muted, false);
            divider(height * 0.70);
            var forecast = ["MON", "TUE", "WED", "THU"], temps = ["16°", "18°", "17°", "20°"], wi;
            for (wi = 0; wi < 4; wi++) {
                var wx = width * (0.18 + wi * 0.22);
                txt("Forecast day " + wi, forecast[wi], wx, height * 0.79, smallSize, col.muted, false);
                circle("Forecast icon " + wi, wx + width * 0.025, height * 0.84, width * 0.045, wi === 2 ? col.tint : [1.0, 0.72, 0.22]);
                txt("Forecast temp " + wi, temps[wi], wx, height * 0.94, smallSize, col.fg, false);
            }
        } else if (type === "Finance / Stocks") {
            txt("Finance ticker", label.toUpperCase(), pad, height * 0.19, smallSize, col.muted, false);
            txt("Finance company", titleText, pad, height * 0.31, bodySize, col.fg, false);
            txt("Stock value", "18,421", pad, height * 0.52, Math.round(width * 0.15), col.fg, false);
            txt("Stock change", "+2.46%  Today", pad, height * 0.60, smallSize, [0.13, 0.72, 0.42], false);
            var chartX = pad, chartY = height * 0.89, chartW = width - pad * 2, stockBars = [0.13, 0.20, 0.17, 0.27, 0.23, 0.34, 0.29, 0.40, 0.32, 0.47, 0.43, 0.54], stockGap = chartW * 0.035, stockW = (chartW - stockGap * 11) / 12, fi;
            for (fi = 0; fi < stockBars.length; fi++) rect("Stock chart bar " + fi, chartX + stockW * 0.5 + fi * (stockW + stockGap), chartY - height * stockBars[fi] * 0.48, stockW, height * stockBars[fi] * 0.48, stockW * 0.45, fi > 8 ? [0.13, 0.72, 0.42] : col.tint);
            txt("Finance range label", "1D     1W     1M     1Y", pad, height * 0.95, smallSize, col.muted, false);
        } else if (type === "Smart Stack / Widgets") {
            rect("Stack card back 2", cx + width * 0.045, height * 0.64, width * 0.84, height * 0.48, Math.round(width * 0.05), col.line);
            rect("Stack card back 1", cx + width * 0.02, height * 0.59, width * 0.88, height * 0.50, Math.round(width * 0.05), col.tint);
            rect("Stack top widget", cx, height * 0.50, width * 0.92, height * 0.52, Math.round(width * 0.05), col.surface);
            txt("Stack widget label", label.toUpperCase(), pad, height * 0.32, smallSize, col.accent, false);
            txt("Stack widget title", titleText, pad, height * 0.49, titleSize, col.fg, false);
            txt("Stack widget detail", body, pad, height * 0.60, bodySize, col.muted, false);
            rect("Stack widget action", pad + width * 0.11, height * 0.79, width * 0.70, height * 0.09, height * 0.045, col.tint);
            txt("Stack widget action label", "OPEN WIDGET", pad + width * 0.23, height * 0.81, smallSize, col.accent, false);
        } else if (type === "Notification Stack") {
            txt("Notification center title", titleText, pad, height * 0.21, titleSize * 0.9, col.fg, false);
            txt("Notification center date", label.toUpperCase(), pad, height * 0.28, smallSize, col.muted, false);
            var notiTitles = [title, "A new update is ready", "Your daily summary"], notiBodies = [detail, "Tap to see what changed.", "You have 3 items to review."], ni;
            for (ni = 0; ni < 3; ni++) {
                var ny = height * (0.43 + ni * 0.18);
                rect("Notification card " + ni, cx, ny, width - pad * 2, height * 0.155, Math.round(width * 0.035), col.surface);
                circle("Notification icon " + ni, pad + width * 0.065, ny - height * 0.025, width * 0.06, ni === 0 ? col.accent : col.tint);
                txt("Notification icon mark " + ni, "A", pad + width * 0.055, ny - height * 0.013, smallSize, ni === 0 ? [1, 1, 1] : col.accent, false);
                txt("Notification row title " + ni, notiTitles[ni], pad + width * 0.12, ny - height * 0.04, smallSize + 1, col.fg, false);
                txt("Notification row detail " + ni, wrapText(notiBodies[ni], 32), pad + width * 0.12, ny + height * 0.025, smallSize, col.muted, false);
            }
        } else if (type === "Focus / Control Tile") {
            statusBar();
            glassPanel("Focus glass tile", cx, height * 0.56, width * 0.91, height * 0.66);
            circle("Focus icon disc", pad + width * 0.12, height * 0.36, width * 0.18, [0.45, 0.39, 0.83]);
            txt("Focus icon", "F", pad + width * 0.095, height * 0.385, titleSize * 0.72, [1, 1, 1], false);
            txt("Focus title", titleText, pad, height * 0.56, titleSize, col.fg, false);
            txt("Focus status", body, pad, height * 0.66, bodySize, col.muted, false);
            rect("Focus active pill", pad + width * 0.16, height * 0.83, width * 0.70, height * 0.12, height * 0.06, col.accent, 94);
            txt("Focus active label", "FOCUS ON", pad + width * 0.32, height * 0.85, smallSize, [1, 1, 1], false);
        } else if (type === "Calendar / Event") {
            statusBar();
            txt("Calendar month", label.toUpperCase(), pad, height * 0.25, smallSize, col.accent, false);
            txt("Calendar date", "10", pad, height * 0.46, Math.round(width * 0.18), col.fg, false);
            txt("Calendar event title", titleText, pad + width * 0.29, height * 0.40, bodySize + 2, col.fg, false);
            txt("Calendar event details", body, pad + width * 0.29, height * 0.50, smallSize, col.muted, false);
            divider(height * 0.61);
            rect("Event timeline accent", pad + width * 0.04, height * 0.77, width * 0.012, height * 0.25, width * 0.006, col.accent);
            txt("Event start time", "10:00", pad + width * 0.11, height * 0.70, smallSize, col.muted, false);
            txt("Event name", titleText, pad + width * 0.23, height * 0.70, bodySize, col.fg, false);
            txt("Event venue", "Today  ·  Calendar", pad + width * 0.23, height * 0.79, smallSize, col.muted, false);
        } else if (type === "Message Thread") {
            statusBar();
            txt("Conversation name", titleText, pad, height * 0.28, titleSize * 0.86, col.fg, false);
            txt("Conversation status", label, pad, height * 0.36, smallSize, col.muted, false);
            rect("Incoming message bubble", pad + width * 0.20, height * 0.57, width * 0.72, height * 0.23, Math.round(width * 0.045), col.surface);
            txt("Incoming message", body, pad + width * 0.25, height * 0.55, bodySize, col.fg, false);
            rect("Outgoing message bubble", width - pad - width * 0.72, height * 0.82, width * 0.72, height * 0.18, Math.round(width * 0.045), col.accent);
            txt("Outgoing message", "Sounds good!", width - pad - width * 0.65, height * 0.81, bodySize, [1, 1, 1], false);
        } else {
            txt("Fallback title", titleText, pad, height * 0.4, titleSize, col.fg, false);
            txt("Fallback body", body, pad, height * 0.56, bodySize, col.muted, false);
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
                var cardCopy = defaultCardContent(type, i);
                var title = cardCopy.title, detail = cardCopy.detail, label = cardCopy.label;
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
        if (made) status.text = made + " kartu dibuat. Double-click layer precomp kartu, lalu edit text layer langsung di dalam card. Layer kartu terpilih untuk Apple Card Motion Studio. Undo: Ctrl/Cmd+Z.";
        else if (!status.text) status.text = "Layout belum dibuat. Pastikan composition mendukung shape dan text layer.";
    }

    buildButton.onClick = createLayout;
    if (ui instanceof Window) {
        ui.onResizing = ui.onResize = function () { this.layout.resize(); };
        ui.center();
        ui.show();
    } else ui.layout.layout(true);
})(this);
