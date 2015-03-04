QUnit.test("Yahoo test 1", function (assert) {
    passwdMaster.value = "Master";
    preUrl.value = "http://www.yahoo.com/text.html";
    protocolCB.checked = false;
    passwdLength.value = "8";
    domainCB.checked = true;
    subdomainCB.checked = false;
    pathCB.checked = false;
    leetLevelLB.value = "0";
    hashAlgorithmLB.value =  "md5";
    whereLeetLB.value =  "off";
    usernameTB.value =  "" ;
    counter.value = "" ;
    EditableSelect.setValue(document.getElementById("charset"), base93);
    populateURL();
    QUnit.ok(passwdGenerated.value == "DZPVokpF", "Passed!");
});