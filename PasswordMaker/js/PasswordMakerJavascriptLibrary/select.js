var EditableSelect = {
    "editValue": "!!!edit!!!", "editText": "(Other...)", "editClass": "activateEdit", "activateAll": function () { var selects = document.getElementsByTagName("select"); for (var i = 0; i < selects.length; i++) { var select = selects[i]; if (EditableSelect.hasClass(select, "editable")) { EditableSelect.activate(select); } } }, "activate": function (select) {
        if (!EditableSelect.selectHasEditOption(select)) { }
        select.oldSelection = select.options.selectedIndex; EditableSelect.addEvent(select, "change", EditableSelect.selectOnChage); EditableSelect.addClass(select, "editable");
    }, "selectHasEditOption": function (select) {
        var options = select.options; for (var i = 0; i < options.length; i++) { if (options.item(i).value == EditableSelect.editValue) { return true; } }
        return false;
    }, "selectAddEditOption": function (select) { var option = document.createElement("option"); option.value = EditableSelect.editValue; option.text = EditableSelect.editText; option.className = EditableSelect.editClass; EditableSelect.selectAddOption(select, option, 0); }, "selectAddOption": function (select, option, index) { if (select.options.add) { if (typeof index == "undefined") { select.options.add(option); } else { select.options.add(option, index); } } else { if (typeof index == "undefined") { select.insertBefore(option); } else { var before = select.options.item(index); select.insertBefore(option, before); } } }, "selectOnChage": function (evt) {
        var select = this; if (evt.srcElement) select = evt.srcElement; if (select.value == EditableSelect.editValue) {
            var input = document.createElement("input"); input.type = "text"; input.value = select.options.item(select.oldSelection).value; input.className = select.className; input.name = select.name; input.oldId = select.id; input.selectOnChange = select.onchange; EditableSelect.addEvent(input, "blur", EditableSelect.inputOnBlur); EditableSelect.addEvent(input, "keypress", EditableSelect.inputOnKeyPress); var oldOptions = []; for (var i = 0; i < select.options.length; i++) { var o = select.options.item(i); var sn = o; var oo = EditableSelect.serializeOption(o); oldOptions[oldOptions.length] = oo; }
            select.parentNode.replaceChild(input, select); input.focus(); input.select(); input.oldOptions = oldOptions;
        } else { select.oldSelection = select.options.selectedIndex; }
    }, "inputOnBlur": function (evt) {
        var input = this; if (evt.srcElement) input = evt.srcElement; var keepSorted = EditableSelect.hasClass(input, "keepSorted"); var value = input.value; var select = document.createElement("select"); select.className = input.className; select.name = input.name; select.id = input.oldId; select.onchange = input.selectOnChange; var selectedIndex = -1; var optionIndex = 0; var oldOptions = input.oldOptions; var newOption = { "text": value, "value": value }; for (var i = 0; i < oldOptions.length; i++) {
            var n = oldOptions[i]; if (newOption != null && EditableSelect.inputCompare(n, newOption) == 0) { newOption = null; } else if (keepSorted && newOption != null && EditableSelect.inputCompare(n, newOption) > 0) { EditableSelect.selectAddOption(select, EditableSelect.deserializeOption(newOption)); selectedIndex = optionIndex; optionIndex++; newOption = null; }
            if (selectedIndex == -1 && n.value == value) { selectedIndex = optionIndex; }
            var opt = EditableSelect.deserializeOption(n); EditableSelect.selectAddOption(select, opt); optionIndex++; input.oldOptions[i] = null;
        }
        if (newOption != null) { var opt = EditableSelect.deserializeOption(newOption); EditableSelect.selectAddOption(select, opt); select.options.selectedIndex = optionIndex; select.oldSelection = select.options.selectedIndex; } else { select.options.selectedIndex = selectedIndex; select.oldSelection = select.options.selectedIndex; }
        EditableSelect.activate(select); input.parentNode.replaceChild(select, input); select.blur(); if (select.onchange) select.onchange();
    }, "setValue": function (select, value) {
        var newOption = document.createElement("option"); newOption.text = value; newOption.value = value; var inOptions = false; for (var i = 0; i < select.options.length; i++) { if (EditableSelect.inputCompare(select.options[i], newOption) == 0) { select.selectedIndex = i; inOptions = true; } }
        if (inOptions == false)
        { EditableSelect.selectAddOption(select, newOption); select.selectedIndex = (select.options.length - 1); }
    }, "inputCompare": function (x, y) {
        if (x.value == EditableSelect.editValue && y.value == EditableSelect.editValue) { return 0; }
        if (x.value == EditableSelect.editValue) { return -1; }
        if (y.value == EditableSelect.editValue) { return 1; }
        var xText = x.text ? x.text.toUpperCase() : ""; var yText = y.text ? y.text.toUpperCase() : ""; if (xText < yText) { return -1; } else if (xText == yText) { return 0; } else { return 1; }
    }, "inputOnKeyPress": function (evt) {
        var e; if (evt) { e = evt; } else if (window.event) { e = window.event; } else { throw "EditableSelect.inputOnKeyPress: Unable to find the event."; }
        if (e.keyCode == 13) { if (e.currentTarget) { e.currentTarget.blur(); return false; } else if (e.srcElement) { e.srcElement.blur(); return false; } else { throw "EditableSelect.inputOnKeyPress: Unknown event type."; } }
        return true;
    }, "serializeOption": function (option) { var ser = {}; if (option.text) ser.text = option.text; if (option.value) ser.value = option.value; if (option.disabled) ser.disabled = option.disabled; if (option.label) ser.label = option.label; if (option.className) ser.className = option.className; if (option.title) ser.title = option.title; if (option.id) ser.id = option.id; return ser; }, "deserializeOption": function (ser) {
        var option = document.createElement("option"); if (ser.text) option.text = ser.text; if (ser.value) { option.value = ser.value; } else if (ser.text) { option.value = ser.text; }
        if (ser.disabled) option.disabled = ser.disabled; if (ser.label) option.label = ser.label; if (ser.className) option.className = ser.className; if (ser.title) option.title = ser.value; if (ser.id) option.id = ser.id; return option;
    }, "hasClass": function (element, clazz) { var regex = new RegExp('\\b' + clazz + '\\b'); return regex.test(element.className); }, "addClass": function (element, clazz) { if (!EditableSelect.hasClass(element, clazz)) { element.className = element.className + " " + clazz; } }, "removeClass": function (element, clazz) { if (EditableSelect.hasClass(element, clazz)) { element.className = element.className.replace(clazz, ""); } }, "addEvent": function (obj, evType, fn, useCapture) { if (obj.addEventListener) { obj.addEventListener(evType, fn, useCapture); return true; } else if (obj.attachEvent) { var r = obj.attachEvent("on" + evType, fn); return r; } else { alert("Handler could not be attached"); } }, "removeEvent": function (obj, evType, fn, useCapture) { if (obj.removeEventListener) { obj.removeEventListener(evType, fn, useCapture); return true; } else if (obj.detachEvent) { var r = obj.detachEvent("on" + evType, fn); return r; } else { alert("Handler could not be removed"); } }
}
EditableSelect.addEvent(window, 'load', EditableSelect.activateAll);