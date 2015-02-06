// Copyright 2015 Graham Benton
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

//     This program is distributed in the hope that it will be useful,
//     but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {

        if (args.detail.kind === activation.ActivationKind.launch) {

            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
                var storedpreURL = WinJS.Application.sessionState.preURL;
                if (storedpreURL) {
                    preURL.innerText = storedpreURL;
                }

                var storedwhereLeetLB = WinJS.Application.sessionState.whereLeetLB;
                if (storedwhereLeetLB) {
                    whereLeetLB.value = storedwhereLeetLB;
                }

                var storedleetLevelLB = WinJS.Application.sessionState.leetLevelLB;
                if (storedleetLevelLB) {
                    leetLevelLB.value = storedleetLevelLB;
                }

                var storedhashAlgorithmLB = WinJS.Application.sessionState.hashAlgorithmLB;
                if (storedhashAlgorithmLB) {
                    hashAlgorithmLB.value = storedhashAlgorithmLB;
                }

                var storedprotocolCB = WinJS.Application.sessionState.protocolCB;
                if (storedprotocolCB !== undefined) {
                    protocolCB.status = storedprotocolCB;
                }

                var storedsubdomainCB = WinJS.Application.sessionState.subdomainCB;
                if (storedsubdomainCB !== undefined) {
                    subdomainCB.status = storedsubdomainCB;
                }

                var storeddomainCB = WinJS.Application.sessionState.domainCB;
                if (storeddomainCB !== undefined) {
                    domainCB.status = storeddomainCB;
                }

                var storedpathCB = WinJS.Application.sessionState.pathCB;
                if (storedpathCB !== undefined) {
                    pathCB.status = storedpathCB;
                }

                var storedpasswdUrl = WinJS.Application.sessionState.passwdUrl;
                if (storedpasswdUrl) {
                    passwdUrl.innerText = storedpasswdUrl;
                }

                if (WinJS.Application.sessionState.passwdLength) {
                    passwdLength.value = WinJS.Application.sessionState.passwdLength;
                }

                if (WinJS.Application.sessionState.usernameTB) {
                    usernameTB.innerText = WinJS.Application.sessionState.usernameTB;
                }

                if (WinJS.Application.sessionState.counter) {
                    counter.innerText = WinJS.Application.sessionState.counter;
                }

                if (WinJS.Application.sessionState.charset) {
                    charset.selectedIndex = WinJS.Application.sessionState.charset;
                }

                if (WinJS.Application.sessionState.passwordPrefix) {
                    passwordPrefix.innerText = WinJS.Application.sessionState.passwordPrefix;
                }

                if (WinJS.Application.sessionState.passwordSuffix) {
                    passwordSuffix.innerText = WinJS.Application.sessionState.passwordSuffix;
                }

                if (WinJS.Application.sessionState.ifHidePasswd !== undefined) {
                    ifHidePasswd.status = WinJS.Application.sessionState.ifHidePasswd;
                }

                preGeneratePassword();

            }

            args.setPromise(WinJS.UI.processAll().then(
                function completed() {

                    preURL.addEventListener("change", preURLHandler, false);
                    preURL.addEventListener("keyup", populateURL, false);
                    preURL.addEventListener("keydown", populateURL, false);
                    preURL.addEventListener("keypress", populateURL, false);
                    preURL.addEventListener("input", populateURL, false);

                    copyFromClipboard.addEventListener("click", copyFromClipboardHandler, false);

                    passwdMaster.addEventListener("change", passwdMasterHandler, false);
                    passwdMaster.addEventListener("keyup", preGeneratePassword, false);
                    passwdMaster.addEventListener("keydown", preGeneratePassword, false);
                    passwdMaster.addEventListener("keypress", preGeneratePassword, false);
                    passwdMaster.addEventListener("input", preGeneratePassword, false);

                    saveMasterBtn.addEventListener("click", saveMaster, false);

                    whereLeetLB.addEventListener("change", whereLeetLBHandler, false);

                    leetLevelLB.addEventListener("change", leetLevelLBHandler, false);

                    hashAlgorithmLB.addEventListener("change", hashAlgorithmLBHandler, false);
                    hashAlgorithmLB.addEventListener("keyup", preGeneratePassword, false);
                    hashAlgorithmLB.addEventListener("keydown", preGeneratePassword, false);
                    hashAlgorithmLB.addEventListener("keypress", preGeneratePassword, false);
                    hashAlgorithmLB.addEventListener("input", preGeneratePassword, false);

                    protocolCB.addEventListener("click", protocolCBHandler, false);
                    subdomainCB.addEventListener("click", subdomainCBHandler, false);
                    domainCB.addEventListener("click", domainCBHandler, false);
                    pathCB.addEventListener("click", pathCBHandler, false);

                    passwdUrl.addEventListener("change", passwdUrlHandler, false);
                    passwdUrl.addEventListener("keyup", preGeneratePassword, false);
                    passwdUrl.addEventListener("keydown", preGeneratePassword, false);
                    passwdUrl.addEventListener("keypress", preGeneratePassword, false);
                    passwdUrl.addEventListener("input", preGeneratePassword, false);

                    passwdLength.addEventListener("change", passwdLengthHandler, false);
                    passwdLength.addEventListener("keyup", passwdLengthHandler, false);
                    passwdLength.addEventListener("keydown", passwdLengthHandler, false);
                    passwdLength.addEventListener("keypress", passwdLengthHandler, false);
                    passwdLength.addEventListener("input", passwdLengthHandler, false);

                    usernameTB.addEventListener("change", usernameTBHandler, false);
                    usernameTB.addEventListener("keyup", preGeneratePassword, false);
                    usernameTB.addEventListener("keydown", preGeneratePassword, false);
                    usernameTB.addEventListener("keypress", preGeneratePassword, false);
                    usernameTB.addEventListener("input", preGeneratePassword, false);

                    counter.addEventListener("change", counterHandler, false);
                    counter.addEventListener("keyup", preGeneratePassword, false);
                    counter.addEventListener("keydown", preGeneratePassword, false);
                    counter.addEventListener("keypress", preGeneratePassword, false);
                    counter.addEventListener("input", preGeneratePassword, false);

                    charset.addEventListener("change", charsetHandler, false);

                    passwordPrefix.addEventListener("change", passwordPrefixHandler, false);
                    passwordPrefix.addEventListener("keyup", preGeneratePassword, false);
                    passwordPrefix.addEventListener("keydown", preGeneratePassword, false);
                    passwordPrefix.addEventListener("keypress", preGeneratePassword, false);
                    passwordPrefix.addEventListener("input", preGeneratePassword, false);

                    passwordSuffix.addEventListener("change", passwordSuffixHandler, false);
                    passwordSuffix.addEventListener("keyup", preGeneratePassword, false);
                    passwordSuffix.addEventListener("keydown", preGeneratePassword, false);
                    passwordSuffix.addEventListener("keypress", preGeneratePassword, false);
                    passwordSuffix.addEventListener("input", preGeneratePassword, false);

                    ifHidePasswd.addEventListener("change", ifHidePasswdHandler, false);

                    copyToClipboardButton.addEventListener("click", copyToClipboardHandler, false);

                    // Populate Settings pane and tie commands to Settings flyouts.
                    WinJS.Application.onsettings = function (e) {
                        e.detail.applicationcommands = {
                            "helpDiv": { href: "HelpUI.html", title: "Help" },
                            "licenseDiv": { href: "license.html", title: "License" },
                            "pwmLibLicenseDiv": { href: "pwmLibLicense.html", title: "Library Licenses" },
                            "aboutDiv": {href: "about.html", title: "About"}
                        };
                        WinJS.UI.SettingsFlyout.populateSettings(e);
                    }
                }
            ));
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    function whereLeetLBHandler(eventInfo) {
        onWhereLeetLBChanged();
        preGeneratePassword();

        WinJS.Application.sessionState.whereLeetLB = whereLeetLB.value;
    }

    function passwdLengthHandler(eventInfo) {
        if (/\D/.test(this.value)) this.value = '8';
        preGeneratePassword();

        WinJS.Application.sessionState.passwdLength = passwdLength.value;
    }

    function ifHidePasswdHandler(eventInfo) {
        if (ifHidePasswd.checked == true) {
            passwdGenerated.style.color = '#fff';
        } else {
            passwdGenerated.style.color = '#00f';
        }
        
        WinJS.Application.sessionState.ifHidePasswd = ifHidePasswd.status;
    }

    function copyFromClipboardHandler(eventInfo) {
        var dataPackageView = Windows.ApplicationModel.DataTransfer.Clipboard.getContent();
        if (dataPackageView.contains(Windows.ApplicationModel.DataTransfer.StandardDataFormats.text)) {
            dataPackageView.getTextAsync().then(function (text) {
                preURL.innerText = text;

                populateURL();
                WinJS.Application.sessionState.preURL = preUrl.value;
                WinJS.Application.sessionState.passwdUrl = passwdUrl.value;

            });
        }
    }

    function copyToClipboardHandler(eventInfo) {

        var dataPackage = new Windows.ApplicationModel.DataTransfer.DataPackage();
        dataPackage.setText(passwdGenerated.value);
        Windows.ApplicationModel.DataTransfer.Clipboard.setContent(dataPackage);
    }

    function passwdMasterHandler(eventInfo) {
        preGeneratePassword();
    }
        
    function preURLHandler(eventInfo) {
        populateURL();

        WinJS.Application.sessionState.preURL = preURL.value;
        WinJS.Application.sessionState.passwdUrl = passwdUrl.value;

    }

    function leetLevelLBHandler(eventInfo) {
        preGeneratePassword();

        WinJS.Application.sessionState.leetLevelLB = leetLevelLB.value;
    }

    function hashAlgorithmLBHandler(eventInfo) {
        preGeneratePassword();

        WinJS.Application.sessionState.hashAlgorithmLB = hashAlgorithmLB.value;

    }

    function protocolCBHandler(eventInfo) {
        populateURL();

        WinJS.Application.sessionState.protocolCB = protocolCB.status;
        WinJS.Application.sessionState.passwdUrl = passwdUrl.value;

    }

    function subdomainCBHandler(eventInfo) {
        populateURL();

        WinJS.Application.sessionState.subdomainCB = subdomainCB.status;
        WinJS.Application.sessionState.passwdUrl = passwdUrl.value;

    }

    function domainCBHandler(eventInfo) {
        populateURL();

        WinJS.Application.sessionState.domainCB = domainCB.status;
        WinJS.Application.sessionState.passwdUrl = passwdUrl.value;

    }

    function pathCBHandler(eventInfo) {
        populateURL();

        WinJS.Application.sessionState.pathCB = pathCB.status;
        WinJS.Application.sessionState.passwdUrl = passwdUrl.value;

    }

    function passwdUrlHandler(eventInfo) {
        preGeneratePassword();

        WinJS.Application.sessionState.passwdUrl = passwdUrl.value;
    }

    function usernameTBHandler(eventInfo) {
        preGeneratePassword();

        WinJS.Application.sessionState.usernameTB = usernameTB.value;
    }

    function counterHandler(eventInfo) {
        preGeneratePassword();

        WinJS.Application.sessionState.counter = counter.value;
    }

    function charsetHandler(eventInfo) {
        preGeneratePassword();

        WinJS.Application.sessionState.charset = charset.selectedIndex;

    }

    function passwordPrefixHandler(eventInfo) {
        preGeneratePassword();

        WinJS.Application.sessionState.passwordPrefix = passwordPrefix.value;

    }

    function passwordSuffixHandler(eventInfo) {
        preGeneratePassword();

        WinJS.Application.sessionState.passwordSuffix = passwordSuffix.value;
    }

    app.start();
})();
