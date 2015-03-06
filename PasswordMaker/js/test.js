QUnit
    .cases([
       {  passwdMaster: "Master", protocolCB: false, passwdLength: "8", domainCB: true, subdomainCB: false, pathCB: false, leetLevelLB: "0", hashAlgorithmLB: "md5", whereLeetLB: "off", usernameTB: "", passwordPrefix: "", passwordSuffix: "", counter: "", charset: base93 }

    ])
    .combinatorial([
        // For default settings, changing the prefix, subdomain and path shouldn't change the result
        { title: "http://www.yahoo.com/text.html",  result: "DZPVokpF" },
        { title: "http://www.yahoo.com/texts.html",  result: "DZPVokpF" },
        { title: "http://my.yahoo.com/text.html", result: "DZPVokpF" },
        { title: "https://www.yahoo.com/text.html",  result: "DZPVokpF" },

        { title: "http://www.yahoo.co.uk/text.html", result: "E|L}n($7" },
        { title: "http://www.yahoo.co.uk/texts.html", result: "E|L}n($7" },
        { title: "http://my.yahoo.co.uk/text.html", result: "E|L}n($7" },
        { title: "https://www.yahoo.co.uk/text.html", result: "E|L}n($7" },


    ])
    .test("Default Settings - ", function (params) {
    passwdMaster.value = params.passwdMaster;
    preUrl.value = params.title;
    protocolCB.checked = params.protocolCB;
    passwdLength.value = params.passwdLength;
    domainCB.checked = params.domainCB;
    subdomainCB.checked = params.subdomainCB;
    pathCB.checked = params.pathCB;
    leetLevelLB.value = params.leetLevelLB;
    hashAlgorithmLB.value =  params.hashAlgorithmLB;
    whereLeetLB.value =  params.whereLeetLB;
    usernameTB.value = params.usernameTB;
    passwordPrefix.value = params.passwordPrefix,
    passwordSuffix.value = params.passwordSuffix,
    counter.value = params.counter ;
    EditableSelect.setValue(document.getElementById("charset"), params.charset);
    populateURL();
    QUnit.equal(passwdGenerated.value, params.result, "Password did not match ");
    });

QUnit
    .cases([
       { passwdMaster: "Master", protocolCB: false, passwdLength: "8", domainCB: true, subdomainCB: false, pathCB: false, leetLevelLB: "0", hashAlgorithmLB: "md5", whereLeetLB: "off", usernameTB: "", passwordPrefix: "A1", passwordSuffix: "", counter: "", charset: base93 }

    ])
    .combinatorial([
        // For default settings, changing the prefix, subdomain and path shouldn't change the result
        { title: "http://www.yahoo.com/text.html", result: "A1DZPVok" },
        { title: "http://www.yahoo.com/texts.html", result: "A1DZPVok" },
        { title: "http://my.yahoo.com/text.html", result: "A1DZPVok" },
        { title: "https://www.yahoo.com/text.html", result: "A1DZPVok" },

        { title: "http://www.yahoo.co.uk/text.html", result: "A1E|L}n(" },
        { title: "http://www.yahoo.co.uk/texts.html", result: "A1E|L}n(" },
        { title: "http://my.yahoo.co.uk/text.html", result: "A1E|L}n(" },
        { title: "https://www.yahoo.co.uk/text.html", result: "A1E|L}n(" },


    ])
    .test("Password Prefix A1 - ", function (params) {
        passwdMaster.value = params.passwdMaster;
        preUrl.value = params.title;
        protocolCB.checked = params.protocolCB;
        passwdLength.value = params.passwdLength;
        domainCB.checked = params.domainCB;
        subdomainCB.checked = params.subdomainCB;
        pathCB.checked = params.pathCB;
        leetLevelLB.value = params.leetLevelLB;
        hashAlgorithmLB.value = params.hashAlgorithmLB;
        whereLeetLB.value = params.whereLeetLB;
        usernameTB.value = params.usernameTB;
        passwordPrefix.value = params.passwordPrefix,
        passwordSuffix.value = params.passwordSuffix,
        counter.value = params.counter;
        EditableSelect.setValue(document.getElementById("charset"), params.charset);
        populateURL();
        QUnit.equal(passwdGenerated.value, params.result, "Password did not match ");
    });

QUnit
    .cases([
       { passwdMaster: "Master", protocolCB: false, passwdLength: "8", domainCB: true, subdomainCB: false, pathCB: false, leetLevelLB: "0", hashAlgorithmLB: "md5", whereLeetLB: "off", usernameTB: "", passwordPrefix: "", passwordSuffix: "A1", counter: "", charset: base93 }

    ])
    .combinatorial([
        // For default settings, changing the prefix, subdomain and path shouldn't change the result
        { title: "http://www.yahoo.com/text.html", result: "DZPVokA1" },
        { title: "http://www.yahoo.com/texts.html", result: "DZPVokA1" },
        { title: "http://my.yahoo.com/text.html", result: "DZPVokA1" },
        { title: "https://www.yahoo.com/text.html", result: "DZPVokA1" },

        { title: "http://www.yahoo.co.uk/text.html", result: "E|L}n(A1" },
        { title: "http://www.yahoo.co.uk/texts.html", result: "E|L}n(A1" },
        { title: "http://my.yahoo.co.uk/text.html", result: "E|L}n(A1" },
        { title: "https://www.yahoo.co.uk/text.html", result: "E|L}n(A1" },


    ])
    .test("Password Suffix A1 - ", function (params) {
        passwdMaster.value = params.passwdMaster;
        preUrl.value = params.title;
        protocolCB.checked = params.protocolCB;
        passwdLength.value = params.passwdLength;
        domainCB.checked = params.domainCB;
        subdomainCB.checked = params.subdomainCB;
        pathCB.checked = params.pathCB;
        leetLevelLB.value = params.leetLevelLB;
        hashAlgorithmLB.value = params.hashAlgorithmLB;
        whereLeetLB.value = params.whereLeetLB;
        usernameTB.value = params.usernameTB;
        passwordPrefix.value = params.passwordPrefix,
        passwordSuffix.value = params.passwordSuffix,
        counter.value = params.counter;
        EditableSelect.setValue(document.getElementById("charset"), params.charset);
        populateURL();
        QUnit.equal(passwdGenerated.value, params.result, "Password did not match ");
    });

QUnit
    .cases([
       { passwdMaster: "Master", protocolCB: false, passwdLength: "8", domainCB: true, subdomainCB: false, pathCB: false, leetLevelLB: "0", hashAlgorithmLB: "md5", whereLeetLB: "off", usernameTB: "charlie", passwordPrefix: "", passwordSuffix: "", counter: "", charset: base93 }

    ])
    .combinatorial([
        // For default settings, changing the prefix, subdomain and path shouldn't change the result
        { title: "http://www.yahoo.com/text.html", result: "EI(!qT,[" },
        { title: "http://www.yahoo.com/texts.html", result: "EI(!qT,[" },
        { title: "http://my.yahoo.com/text.html", result: "EI(!qT,[" },
        { title: "https://www.yahoo.com/text.html", result: "EI(!qT,[" },

        { title: "http://www.yahoo.co.uk/text.html", result: "BiZ@X'88" },
        { title: "http://www.yahoo.co.uk/texts.html", result: "BiZ@X'88" },
        { title: "http://my.yahoo.co.uk/text.html", result: "BiZ@X'88" },
        { title: "https://www.yahoo.co.uk/text.html", result: "BiZ@X'88" },


    ])
    .test("User name charlie - ", function (params) {
        passwdMaster.value = params.passwdMaster;
        preUrl.value = params.title;
        protocolCB.checked = params.protocolCB;
        passwdLength.value = params.passwdLength;
        domainCB.checked = params.domainCB;
        subdomainCB.checked = params.subdomainCB;
        pathCB.checked = params.pathCB;
        leetLevelLB.value = params.leetLevelLB;
        hashAlgorithmLB.value = params.hashAlgorithmLB;
        whereLeetLB.value = params.whereLeetLB;
        usernameTB.value = params.usernameTB;
        passwordPrefix.value = params.passwordPrefix,
        passwordSuffix.value = params.passwordSuffix,
        counter.value = params.counter;
        EditableSelect.setValue(document.getElementById("charset"), params.charset);
        populateURL();
        QUnit.equal(passwdGenerated.value, params.result, "Password did not match ");
    });

QUnit
    .cases([
       { passwdMaster: "Master", protocolCB: false, passwdLength: "20", domainCB: true, subdomainCB: false, pathCB: false, leetLevelLB: "0", hashAlgorithmLB: "md5", whereLeetLB: "off", usernameTB: "", passwordPrefix: "", passwordSuffix: "", counter: "", charset: base93 }

    ])
    .combinatorial([
        // For default settings, changing the prefix, subdomain and path shouldn't change the result
        { title: "http://www.yahoo.com/text.html", result: 'DZPVokpF{8$Gm0#-F"5~' },
        { title: "http://www.yahoo.com/texts.html", result: 'DZPVokpF{8$Gm0#-F"5~' },
        { title: "http://my.yahoo.com/text.html", result: 'DZPVokpF{8$Gm0#-F"5~' },
        { title: "https://www.yahoo.com/text.html", result: 'DZPVokpF{8$Gm0#-F"5~' },

        { title: "http://www.yahoo.co.uk/text.html", result: "E|L}n($7nt8lN@pn31-q" },
        { title: "http://www.yahoo.co.uk/texts.html", result: "E|L}n($7nt8lN@pn31-q" },
        { title: "http://my.yahoo.co.uk/text.html", result: "E|L}n($7nt8lN@pn31-q" },
        { title: "https://www.yahoo.co.uk/text.html", result: "E|L}n($7nt8lN@pn31-q" },


    ])
    .test("Length 20 - ", function (params) {
        passwdMaster.value = params.passwdMaster;
        preUrl.value = params.title;
        protocolCB.checked = params.protocolCB;
        passwdLength.value = params.passwdLength;
        domainCB.checked = params.domainCB;
        subdomainCB.checked = params.subdomainCB;
        pathCB.checked = params.pathCB;
        leetLevelLB.value = params.leetLevelLB;
        hashAlgorithmLB.value = params.hashAlgorithmLB;
        whereLeetLB.value = params.whereLeetLB;
        usernameTB.value = params.usernameTB;
        passwordPrefix.value = params.passwordPrefix,
        passwordSuffix.value = params.passwordSuffix,
        counter.value = params.counter;
        EditableSelect.setValue(document.getElementById("charset"), params.charset);
        populateURL();
        QUnit.equal(passwdGenerated.value, params.result, "Password did not match ");
    });

QUnit
    .cases([
       { passwdMaster: "Master", protocolCB: false, passwdLength: "8", domainCB: true, subdomainCB: false, pathCB: false, leetLevelLB: "0", hashAlgorithmLB: "md5", whereLeetLB: "off", usernameTB: "", passwordPrefix: "", passwordSuffix: "", counter: "25Feb", charset: base93 }

    ])
    .combinatorial([
        // For default settings, changing the prefix, subdomain and path shouldn't change the result
        { title: "http://www.yahoo.com/text.html", result: "I*T3efM'" },
        { title: "http://www.yahoo.com/texts.html", result: "I*T3efM'" },
        { title: "http://my.yahoo.com/text.html", result: "I*T3efM'" },
        { title: "https://www.yahoo.com/text.html", result: "I*T3efM'" },

        { title: "http://www.yahoo.co.uk/text.html", result: "K1T$I'Qp" },
        { title: "http://www.yahoo.co.uk/texts.html", result: "K1T$I'Qp" },
        { title: "http://my.yahoo.co.uk/text.html", result: "K1T$I'Qp" },
        { title: "https://www.yahoo.co.uk/text.html", result: "K1T$I'Qp" },

    ])
    .test("Modifier 25Feb - ", function (params) {
        passwdMaster.value = params.passwdMaster;
        preUrl.value = params.title;
        protocolCB.checked = params.protocolCB;
        passwdLength.value = params.passwdLength;
        domainCB.checked = params.domainCB;
        subdomainCB.checked = params.subdomainCB;
        pathCB.checked = params.pathCB;
        leetLevelLB.value = params.leetLevelLB;
        hashAlgorithmLB.value = params.hashAlgorithmLB;
        whereLeetLB.value = params.whereLeetLB;
        usernameTB.value = params.usernameTB;
        passwordPrefix.value = params.passwordPrefix,
        passwordSuffix.value = params.passwordSuffix,
        counter.value = params.counter;
        EditableSelect.setValue(document.getElementById("charset"), params.charset);
        populateURL();
        QUnit.equal(passwdGenerated.value, params.result, "Password did not match ");
    });

QUnit
    .cases([
       { passwdMaster: "Master", preUrl: "http://www.yahoo.com/text.html", protocolCB: false, passwdLength: "8", domainCB: true, subdomainCB: false, pathCB: false, leetLevelLB: "0", whereLeetLB: "off", usernameTB: "", passwordPrefix: "", passwordSuffix: "", counter: "", charset: base93 }

    ])
    .combinatorial([
        { title: "md5", result: "DZPVokpF" },
        { title: "sha1", result: "B3Xwr>78" },
        { title: "md4", result: "CFrn.,'N" },
        { title: "hmac-md4", result: "Erqr.:(n" },
        { title: "md5_v6", result: "4bdeb029" },
        { title: "hmac-md5", result: "EDjWZwL?" },
        { title: "hmac-md5_v6", result: "5db4e753" },
        { title: "hmac-sha1", result: "CA,V!cb2" },
        { title: "sha256", result: 'r-cHS\\BB' },  // Two backslashes to escape 1
        { title: "hmac-sha256_fix", result: "d*+Rm7hD" },
        { title: "hmac-sha256", result: "*N`/}Q@9" },
        { title: "rmd160", result: "d%URP;4R" },
        { title: "hmac-rmd160", result: "F,J,cWp6" },

    ])
    .test("Hash Algorithm - ", function (params) {
        passwdMaster.value = params.passwdMaster;
        preUrl.value = params.preUrl;
        protocolCB.checked = params.protocolCB;
        passwdLength.value = params.passwdLength;
        domainCB.checked = params.domainCB;
        subdomainCB.checked = params.subdomainCB;
        pathCB.checked = params.pathCB;
        leetLevelLB.value = params.leetLevelLB;
        hashAlgorithmLB.value = params.title;
        whereLeetLB.value = params.whereLeetLB;
        usernameTB.value = params.usernameTB;
        passwordPrefix.value = params.passwordPrefix,
        passwordSuffix.value = params.passwordSuffix,
        counter.value = params.counter;
        EditableSelect.setValue(document.getElementById("charset"), params.charset);
        populateURL();
        QUnit.equal(passwdGenerated.value, params.result, "Password did not match ");
    });

QUnit
    .cases([
       { passwdMaster: "Master", preUrl: "http://www.yahoo.com/text.html", protocolCB: false, passwdLength: "8", domainCB: true, subdomainCB: false, pathCB: false, hashAlgorithmLB: "md5",  usernameTB: "", passwordPrefix: "", passwordSuffix: "", counter: "", charset: base93 }

    ])
    .combinatorial([
        { whereLeetLB: "before-hashing", title: " Before Hashing" },
        { whereLeetLB: "after-hashing", title: " After Hashing" },
        { whereLeetLB: "both", title: " Before and After Hashing"}
    ]).combinatorial([
        { leetLevelLB: "0", title: "Level 0" },
        { leetLevelLB: "1", title: "Level 1" },
        { leetLevelLB: "2", title: "Level 2" },
        { leetLevelLB: "3", title: "Level 3" },
        { leetLevelLB: "4", title: "Level 4" },
        { leetLevelLB: "5", title: "Level 5" },
        { leetLevelLB: "6", title: "Level 6" },
        { leetLevelLB: "7", title: "Level 7" },
        { leetLevelLB: "8", title: "Level 8" },
    ]).sequential([
        { result: "KZ!;c5@B" },  // before-hashing 0
        { result: "CF\\D|'Tm" }, // before-hashing 1
        { result: "BTKUM^[p" },
        { result: "CD^$04!Z" },
        { result: "JQ=bgDOY" },
        { result: "CYxf:O?e" },
        { result: "Hg!p]v'u" },
        { result: "Dr5n@TSO" },
        { result: "C9ew^l6?" },
        { result: "dzpv0kpf" },  // after-hashing 0
        { result: "d2pv0kpf" },
        { result: "d2pv0kpf" },
        { result: "d2pv0kpf" },
        { result: "d2|>\\/0|" },
        { result: "|)2|>\\/0" },
        { result: "|)2|*\\/0" },
        { result: '|)"/_|>\\' },
        { result: '|)"/_|>\\' },
        { result: "kz!;c5@b" },  // both 0
        { result: "cf\\d|'7m" },
        { result: "87kum^[p" },
        { result: "cd^$04!2" },
        { result: "79=|36d0" },
        { result: "c'/x|=:0" },
        { result: "#6!|*]\\/" },
        { result: "|)|25|\\|" },
        { result: "(9&\\^/^|" },
    ])
    .test("Leet Level - ", function (params) {
        passwdMaster.value = params.passwdMaster;
        preUrl.value = params.preUrl;
        protocolCB.checked = params.protocolCB;
        passwdLength.value = params.passwdLength;
        domainCB.checked = params.domainCB;
        subdomainCB.checked = params.subdomainCB;
        pathCB.checked = params.pathCB;
        leetLevelLB.value = params.leetLevelLB;
        hashAlgorithmLB.value = params.hashAlgorithmLB;
        whereLeetLB.value = params.whereLeetLB;
        usernameTB.value = params.usernameTB;
        passwordPrefix.value = params.passwordPrefix,
        passwordSuffix.value = params.passwordSuffix,
        counter.value = params.counter;
        EditableSelect.setValue(document.getElementById("charset"), params.charset);
        populateURL();
        QUnit.equal(passwdGenerated.value, params.result, "Password did not match ");
    });

QUnit
    .cases([
       { passwdMaster: "Master", preUrl: "http://www.yahoo.com/text.html", protocolCB: false, passwdLength: "8", domainCB: true, subdomainCB: false, pathCB: false, leetLevelLB: "0", hashAlgorithmLB: "md5", whereLeetLB: "off", usernameTB: "", passwordPrefix: "", passwordSuffix: "", counter: "" }

    ])
    .combinatorial([
       { title: "base93", charset: base93, result: "DZPVokpF" },
       { title: "hexDigits", charset: "0123456789abcdef", result: "4bdeb029" },
       { title: "numbers", charset: "0123456789", result: "10084836" },
       { title: "Weird Chars", charset: "`~!@#$%^&*()_-+={}|[]\\:\";'<>?,./", result: "!)><;!|]" },

    ]).test("Charset - ", function (params) {
        passwdMaster.value = params.passwdMaster;
        preUrl.value = params.preUrl;
        protocolCB.checked = params.protocolCB;
        passwdLength.value = params.passwdLength;
        domainCB.checked = params.domainCB;
        subdomainCB.checked = params.subdomainCB;
        pathCB.checked = params.pathCB;
        leetLevelLB.value = params.leetLevelLB;
        hashAlgorithmLB.value = params.hashAlgorithmLB;
        whereLeetLB.value = params.whereLeetLB;
        usernameTB.value = params.usernameTB;
        passwordPrefix.value = params.passwordPrefix,
        passwordSuffix.value = params.passwordSuffix,
        counter.value = params.counter;
        EditableSelect.setValue(document.getElementById("charset"), params.charset);
        populateURL();
        QUnit.equal(passwdGenerated.value, params.result, "Password did not match ");
    });
