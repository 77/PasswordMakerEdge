// Copyright 2015 Graham Benton


//Microsoft Public License (MS-PL)

//This license governs use of the accompanying software. If you use the software, you
//accept this license. If you do not accept the license, do not use the software.

//1. Definitions
//The terms "reproduce," "reproduction," "derivative works," and "distribution" have the
//same meaning here as under U.S. copyright law.
//A "contribution" is the original software, or any additions or changes to the software.
//A "contributor" is any person that distributes its contribution under this license.
//"Licensed patents" are a contributor's patent claims that read directly on its contribution.

//2. Grant of Rights
//(A) Copyright Grant- Subject to the terms of this license, including the license conditions and limitations in section 3, each contributor grants you a non-exclusive, worldwide, royalty-free copyright license to reproduce its contribution, prepare derivative works of its contribution, and distribute its contribution or any derivative works that you create.
//(B) Patent Grant- Subject to the terms of this license, including the license conditions and limitations in section 3, each contributor grants you a non-exclusive, worldwide, royalty-free license under its licensed patents to make, have made, use, sell, offer for sale, import, and/or otherwise dispose of its contribution in the software or derivative works of the contribution in the software.

//3. Conditions and Limitations
//(A) No Trademark License- This license does not grant you rights to use any contributors' name, logo, or trademarks.
//(B) If you bring a patent claim against any contributor over patents that you claim are infringed by the software, your patent license from such contributor to the software ends automatically.
//(C) If you distribute any portion of the software, you must retain all copyright, patent, trademark, and attribution notices that are present in the software.
//(D) If you distribute any portion of the software in source code form, you may do so only under this license by including a complete copy of this license with your distribution. If you distribute any portion of the software in compiled or object code form, you may only do so under a license that complies with this license.
//(E) The software is licensed "as-is." You bear the risk of using it. The contributors give no express warranties, guarantees or conditions. You may have additional consumer rights under your local laws which this license cannot change. To the extent permitted under your local laws, the contributors exclude the implied warranties of merchantability, fitness for a particular purpose and non-infringement.

(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var shareOperation = null;

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

                if (WinJS.Application.sessionState.charsetIndex) {
                    var newCharOptions = WinJS.Application.sessionState.newCharOptions;

                    var charset = document.getElementById("charset");
                    var charsetOpts = charset.options;

                    if (newCharOptions) {
                        for (var i = 0; i < newCharOptions.length; i++) {
                            charsetOpts[charsetOpts.length] = new Option(newCharOptions[i]);
                        }
                    }

                    charset.selectedIndex = WinJS.Application.sessionState.charsetIndex;
                    if (charset.selectedIndex > charset.options.length || charset.selectedIndex < 0) {
                        charset.selectedIndex = 1;
                    }

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
                completedSetPromise()
            ));
        } else if (args.detail.kind === activation.ActivationKind.shareTarget) {
            args.setPromise(WinJS.UI.processAll().then(
                completedSetPromise()
            ));

            shareOperation = args.detail.shareOperation;

            // We queue an asychronous event so that working with the ShareOperation object does not 
            // block or delay the return of the activation handler. 
            WinJS.Application.queueEvent({ type: "shareready" });
        }
        
    };

    function completedSetPromise() {

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
                "pwmLibLicenseDiv": { href: "pwmLibLicense.html", title: "LGPL v2.1" },
                "aboutDiv": { href: "about.html", title: "About" }
            };
            WinJS.UI.SettingsFlyout.populateSettings(e);
        }
    }

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().

        // Because the EditSelect class deletes and recreates the select
        // option, we cannot attach an event handler to it, so 
        // save its state here.
        WinJS.Application.sessionState.charsetIndex = document.getElementById("charset").selectedIndex;
        var charsetOptions = document.getElementById("charset").options;
        var newCharOptions = [];

        for (var i = 7,j=0; i < charsetOptions.length; i++,j++) {
            newCharOptions[j] = document.getElementById("charset").options[i].text;
        }
        WinJS.Application.sessionState.newCharOptions = newCharOptions;

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
    
    function passwordPrefixHandler(eventInfo) {
        preGeneratePassword();

        WinJS.Application.sessionState.passwordPrefix = passwordPrefix.value;

    }

    function passwordSuffixHandler(eventInfo) {
        preGeneratePassword();

        WinJS.Application.sessionState.passwordSuffix = passwordSuffix.value;
    }

    /// <summary> 
    /// Handler executed when ready to share; handling the share operation should be performed 
    /// outside the activation handler 
    /// </summary> 
    function shareReady(eventArgs) {
        var sharedData = shareOperation.data;

        if (sharedData.contains(Windows.ApplicationModel.DataTransfer.StandardDataFormats.text)) {
            // Set the preURL to the shared data
            sharedData.getTextAsync().done(function (text) {
                preURL.innerText = text;
                populateURL();
                WinJS.Application.sessionState.preURL = preUrl.value;
                WinJS.Application.sessionState.passwdUrl = passwdUrl.value;

            }, function (e) {
                preURL.innerText = "Error Receiving Data from Share";
            });
        }
        if (sharedData.contains(Windows.ApplicationModel.DataTransfer.StandardDataFormats.webLink)) {
            sharedData.getWebLinkAsync().done(function (webLink) {
                preURL.innerText = webLink.rawUri;
                populateURL();
                WinJS.Application.sessionState.preURL = preUrl.value;
                WinJS.Application.sessionState.passwdUrl = passwdUrl.value;
            }, function (e) {
                preURL.innerText = "Error Receiving Data from Share";
            });
        }

    }


    WinJS.Application.addEventListener("shareready", shareReady, false);
    app.start();
})();
