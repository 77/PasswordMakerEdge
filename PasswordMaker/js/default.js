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
    var applicationData = Windows.Storage.ApplicationData.current;

    // UI created by us
    var deleteProfileBtn;
    var shareOperation = null;


    app.onactivated = function (args) {

        if (args.detail.kind === activation.ActivationKind.launch) {

            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
                let storedpreURL = WinJS.Application.sessionState.preURL;
                if (storedpreURL) {
                    preURL.innerText = storedpreURL;
                }

                let storedProfileIndex = WinJS.Application.sessionState.profileIndex;
                if (storedProfileIndex) {
                    let profileLB = document.getElementById("profileLB");
                    if (storedProfileIndex < profileLB.options.length && storedProfileIndex > 0) {
                        profileLB.selectedIndex = storedProfileIndex;
                    } else {
                        profileLB.selectedIndex = 1;
                    }
                }

                let storedwhereLeetLB = WinJS.Application.sessionState.whereLeetLB;
                if (storedwhereLeetLB) {
                    whereLeetLB.value = storedwhereLeetLB;
                }

                let storedleetLevelLB = WinJS.Application.sessionState.leetLevelLB;
                if (storedleetLevelLB) {
                    leetLevelLB.value = storedleetLevelLB;
                }

                let storedhashAlgorithmLB = WinJS.Application.sessionState.hashAlgorithmLB;
                if (storedhashAlgorithmLB) {
                    hashAlgorithmLB.value = storedhashAlgorithmLB;
                }

                let storedprotocolCB = WinJS.Application.sessionState.protocolCB;
                if (storedprotocolCB !== undefined) {
                    protocolCB.status = storedprotocolCB;
                }

                let storedsubdomainCB = WinJS.Application.sessionState.subdomainCB;
                if (storedsubdomainCB !== undefined) {
                    subdomainCB.status = storedsubdomainCB;
                }

                let storeddomainCB = WinJS.Application.sessionState.domainCB;
                if (storeddomainCB !== undefined) {
                    domainCB.status = storeddomainCB;
                }

                let storedpathCB = WinJS.Application.sessionState.pathCB;
                if (storedpathCB !== undefined) {
                    pathCB.status = storedpathCB;
                }

                let storedpasswdUrl = WinJS.Application.sessionState.passwdUrl;
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
                    let newCharOptions = WinJS.Application.sessionState.newCharOptions;

                    let charset = document.getElementById("charset");
                    let charsetOpts = charset.options;

                    if (newCharOptions) {
                        for (let i = 0; i < newCharOptions.length; i++) {
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
        deleteProfileBtn = document.getElementById("deleteProfileBtn");
        // These need to be first as loading profiles sometimes clicks this button
        deleteProfileBtn.addEventListener("click", deleteProfileHandler, false);

        preURL.addEventListener("change", preURLHandler, false);
        preURL.addEventListener("keypress", preURLHandler, false);
        preURL.addEventListener("input", preURLHandler, false);

        copyFromClipboard.addEventListener("click", copyFromClipboardHandler, false);

        passwdMaster.addEventListener("change", passwdMasterHandler, false);
        passwdMaster.addEventListener("keypress", preGeneratePassword, false);
        passwdMaster.addEventListener("input", preGeneratePassword, false);
        
        let profileLB = document.getElementById("profileLB");
        profileLB.onchange = profileChangedHandler;
        addProfiles();
        selectAndLoadProfile(profileLB);

        saveMasterBtn.addEventListener("click", saveMaster, false);

        whereLeetLB.addEventListener("change", whereLeetLBHandler, false);

        leetLevelLB.addEventListener("change", leetLevelLBHandler, false);

        hashAlgorithmLB.addEventListener("change", hashAlgorithmLBHandler, false);
        hashAlgorithmLB.addEventListener("keypress", preGeneratePassword, false);
        hashAlgorithmLB.addEventListener("input", preGeneratePassword, false);

        protocolCB.addEventListener("click", protocolCBHandler, false);
        subdomainCB.addEventListener("click", subdomainCBHandler, false);
        domainCB.addEventListener("click", domainCBHandler, false);
        pathCB.addEventListener("click", pathCBHandler, false);

        passwdUrl.addEventListener("change", passwdUrlHandler, false);
        passwdUrl.addEventListener("keypress", preGeneratePassword, false);
        passwdUrl.addEventListener("input", preGeneratePassword, false);

        passwdLength.addEventListener("change", passwdLengthHandler, false);
        passwdLength.addEventListener("keypress", passwdLengthHandler, false);
        passwdLength.addEventListener("input", passwdLengthHandler, false);

        usernameTB.addEventListener("change", usernameTBHandler, false);
        usernameTB.addEventListener("keypress", preGeneratePassword, false);
        usernameTB.addEventListener("input", preGeneratePassword, false);

        counter.addEventListener("change", counterHandler, false);
        counter.addEventListener("keypress", preGeneratePassword, false);
        counter.addEventListener("input", preGeneratePassword, false);

        passwordPrefix.addEventListener("change", passwordPrefixHandler, false);
        passwordPrefix.addEventListener("keypress", preGeneratePassword, false);
        passwordPrefix.addEventListener("input", preGeneratePassword, false);

        passwordSuffix.addEventListener("change", passwordSuffixHandler, false);
        passwordSuffix.addEventListener("keypress", preGeneratePassword, false);
        passwordSuffix.addEventListener("input", preGeneratePassword, false);

        ifHidePasswd.addEventListener("change", ifHidePasswdHandler, false);

        copyToClipboardButton.addEventListener("click", copyToClipboardHandler, false);


        Windows.Storage.ApplicationData.current.addEventListener("datachanged", dataChangedHandler);

        // Populate Settings pane and tie commands to Settings flyouts.
        WinJS.Application.onsettings = function (e) {
            e.detail.applicationcommands = {
                "helpDiv": { href: "HelpUI.html", title: "Help" },
                "SettingsDiv": { href: "settings.html", title: "Settings"},
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
        let charsetOptions = document.getElementById("charset").options;
        let newCharOptions = [];

        for (let i = 7,j=0; i < charsetOptions.length; i++,j++) {
            newCharOptions[j] = document.getElementById("charset").options[i].text;
        }
        WinJS.Application.sessionState.newCharOptions = newCharOptions;

    };

    function whereLeetLBHandler(eventInfo) {
        onWhereLeetLBChanged();
        preGeneratePassword();

        WinJS.Application.sessionState.whereLeetLB = whereLeetLB.value;
        saveProfile();
    }

    function passwdLengthHandler(eventInfo) {
        if (/\D/.test(this.value)) this.value = '8';
        preGeneratePassword();

        WinJS.Application.sessionState.passwdLength = passwdLength.value;
        saveProfile();
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
        let dataPackageView = Windows.ApplicationModel.DataTransfer.Clipboard.getContent();
        if (dataPackageView.contains(Windows.ApplicationModel.DataTransfer.StandardDataFormats.text)) {
            dataPackageView.getTextAsync().then(function (text) {
                preURL.innerText = text;
                WinJS.Application.sessionState.preURL = preUrl.value;

                if (!usedFollowsProfile()) {
                    populateURL();
                    WinJS.Application.sessionState.passwdUrl = passwdUrl.value;
                }

            });
        }
    }

    function copyToClipboardHandler(eventInfo) {

        let dataPackage = new Windows.ApplicationModel.DataTransfer.DataPackage();
        dataPackage.setText(passwdGenerated.value);
        Windows.ApplicationModel.DataTransfer.Clipboard.setContent(dataPackage);
    }

    function passwdMasterHandler(eventInfo) {
        preGeneratePassword();
    }
        
    function preURLHandler(eventInfo) {
        WinJS.Application.sessionState.preURL = preURL.value;

        if (!usedFollowsProfile()) {
            populateURL();
            WinJS.Application.sessionState.passwdUrl = passwdUrl.value;
        }

        saveProfile();
    }

    function leetLevelLBHandler(eventInfo) {
        preGeneratePassword();

        WinJS.Application.sessionState.leetLevelLB = leetLevelLB.value;
        saveProfile();
    }

    function hashAlgorithmLBHandler(eventInfo) {
        preGeneratePassword();

        WinJS.Application.sessionState.hashAlgorithmLB = hashAlgorithmLB.value;
        saveProfile();
    }

    function protocolCBHandler(eventInfo) {
        if (!usedFollowsProfile()) {
            populateURL();
            WinJS.Application.sessionState.passwdUrl = passwdUrl.value;
        }
        WinJS.Application.sessionState.protocolCB = protocolCB.status;
        saveProfile();
    }

    function subdomainCBHandler(eventInfo) {
        if (!usedFollowsProfile()) {
            populateURL();
            WinJS.Application.sessionState.passwdUrl = passwdUrl.value;
        }
        WinJS.Application.sessionState.subdomainCB = subdomainCB.status;
        saveProfile();
    }

    function domainCBHandler(eventInfo) {
        if (!usedFollowsProfile()) {
            populateURL();
            WinJS.Application.sessionState.passwdUrl = passwdUrl.value;
        }
        WinJS.Application.sessionState.domainCB = domainCB.status;
        saveProfile();
    }

    function pathCBHandler(eventInfo) {
        if (!usedFollowsProfile()) {
            populateURL();
            WinJS.Application.sessionState.passwdUrl = passwdUrl.value;
        }
        WinJS.Application.sessionState.pathCB = pathCB.status;
        saveProfile();
    }

    function passwdUrlHandler(eventInfo) {
        preGeneratePassword();

        WinJS.Application.sessionState.passwdUrl = passwdUrl.value;
        saveProfile();
    }

    function usernameTBHandler(eventInfo) {
        preGeneratePassword();

        WinJS.Application.sessionState.usernameTB = usernameTB.value;
        saveProfile();
    }

    function counterHandler(eventInfo) {
        preGeneratePassword();

        WinJS.Application.sessionState.counter = counter.value;
        saveProfile();
    }
    
    function passwordPrefixHandler(eventInfo) {
        preGeneratePassword();

        WinJS.Application.sessionState.passwordPrefix = passwordPrefix.value;
        saveProfile();
    }

    function passwordSuffixHandler(eventInfo) {
        preGeneratePassword();

        WinJS.Application.sessionState.passwordSuffix = passwordSuffix.value;
        saveProfile();
    }

    function saveProfile() {


        applicationData.setVersionAsync(1, setVersionHandler).done(
            function success() {
                let roamingSettings = applicationData.roamingSettings;
                roamingSettings.createContainer("Profiles",
                    Windows.Storage.ApplicationDataCreateDisposition.Always);

                let profileIndex = document.getElementById("profileLB").selectedIndex;
                let selectedProfile = document.getElementById("profileLB").options[profileIndex].text;

                roamingSettings.containers.lookup("Profiles").values[escape(selectedProfile)] = exportPreferences();
            },
            function error() {
            });

    }

    function deleteProfileHandler(eventInfo) {
        let roamingSettings = applicationData.roamingSettings;
        let profileLB = document.getElementById("profileLB");
        let profileIndex = profileLB.selectedIndex;
        let selectedProfile = profileLB.options[profileIndex].text;

        if (selectedProfile != "Default") {
            if (roamingSettings.containers.hasKey("Profiles")) {
                roamingSettings.containers.lookup("Profiles").values.remove(escape(selectedProfile));
            }


            // remove option from profileLB and display default profile
            profileLB.remove(profileIndex);
            selectAndLoadProfile(profileLB);
        } else {
            document.getElementById("deleteDefaultFlyout").winControl.show(profileLB);
        }

    }

    function addProfiles() {

        if (applicationData.version) {

            if (applicationData.version == 1) {
                let roamingSettings = applicationData.roamingSettings;

                if (roamingSettings.containers.hasKey("Profiles")) {

                    let iterator = roamingSettings.containers.lookup("Profiles").values.first();

                    while (iterator.hasCurrent) {
                        let profileName = unescape(iterator.current.key);
                        removeProfileFromLB(profileName);
                        document.getElementById("profileLB").add(new Option(profileName));
                        iterator.moveNext();
                    }
                } else {
                    createDefaultOption();
                    // Save the default profile in the remoteSettings
                    saveProfile();
                }
            } else {
                // We can't handle any version other than 1
                createDefaultOption();
                document.getElementById("InvalidDataVersionFlyout").winControl.show(profileLB);
            }
        } else {
            // No Version information, so don't load data, just the default
            createDefaultOption();
            saveProfile();
        }
    }

    function createDefaultOption() {
        let option = document.createElement("option");
        option.text = "Default";
        EditableSelect.selectAddOption(document.getElementById("profileLB"), option);
        option.selected = "selected";
    }

    function removeProfileFromLB(profileName) {

        let profileLB = document.getElementById("profileLB");

        for (var i = 0; i < profileLB.length; i++) {
            if (profileLB.options[i].text == profileName) {
                profileLB.remove(i);
                break;
            }
        }
    }

    function profileChangedHandler(eventInfo) {
        let profileLB = this;

        if (profileLB.selectedIndex > 0) {
            // Don't load profile if changed to add profile
            WinJS.Application.sessionState.profileIndex = profileLB.selectedIndex;

            loadProfileFromRemote(profileLB);
        }
    }

    function loadProfileFromRemote(profileLB) {
        let roamingSettings = applicationData.roamingSettings;

        if (roamingSettings.containers.hasKey("Profiles")) {

            if (profileLB) {
                let profileIndex = profileLB.selectedIndex;
                let selectedProfile = profileLB.options[profileIndex].text;

                let a = unescape(roamingSettings.containers.lookup("Profiles").values[escape(selectedProfile)]);

                let settingsArray = a.split("|");
                preUrl.value = (settingsArray[0] == undefined || settingsArray[6] == undefined) ? "" : unescape(settingsArray[0]);
                passwdLength.value = (settingsArray[1] == undefined || settingsArray[1] == undefined) ? "8" : settingsArray[1];
                protocolCB.checked = (settingsArray[2] == undefined || settingsArray[2] == undefined) ? false : settingsArray[2] == "true";
                domainCB.checked = (settingsArray[3] == undefined || settingsArray[3] == undefined) ? true : settingsArray[3] == "true";
                subdomainCB.checked = (settingsArray[4] == undefined || settingsArray[4] == undefined) ? false : settingsArray[4] == "true";
                pathCB.checked = (settingsArray[5] == undefined || settingsArray[5] == undefined) ? false : settingsArray[5] == "true";
                passwdUrl.value = (settingsArray[6] == undefined || settingsArray[6] == undefined) ? "" : unescape(settingsArray[6]);
                leetLevelLB.value = (settingsArray[7] == undefined || settingsArray[7] == undefined) ? "0" : settingsArray[7];
                hashAlgorithmLB.value = (settingsArray[8] == undefined || settingsArray[8] == undefined) ? "md5" : settingsArray[8];
                whereLeetLB.value = (settingsArray[9] == undefined || settingsArray[9] == undefined) ? "off" : settingsArray[9];
                usernameTB.value = (settingsArray[10] == undefined || settingsArray[10] == undefined) ? "" : unescape(settingsArray[10]);
                counter.value = (settingsArray[11] == undefined || settingsArray[11] == undefined) ? "" : unescape(settingsArray[11]);
                EditableSelect.setValue(document.getElementById("charset"), (settingsArray[12] == undefined || settingsArray[12] == undefined) ? base93 : unescape(settingsArray[12]));
                passwordPrefix.value = (settingsArray[13] == undefined || settingsArray[13] == undefined) ? "" : unescape(settingsArray[13]);
                passwordSuffix.value = (settingsArray[14] == undefined || settingsArray[14] == undefined) ? "" : unescape(settingsArray[14]);
                preGeneratePassword();
            }
        }

    }

    function selectAndLoadProfile(profileLB, preferred) {
        profileLB.selectedIndex = 1;
        for (let i = 1; i < profileLB.options.length; i++) {
            if (profileLB.options[i].text == "Default") {
                profileLB.selectedIndex = i;
                break;
            }
        }

        if (preferred) {
            for (let i = 1; i < profileLB.options.length; i++) {
                if (profileLB.options[i].text == preferred) {
                    profileLB.selectedIndex = i;
                    break;
                }
            }
        }

        loadProfileFromRemote(profileLB);

        profileLB.oldSelection = profileLB.selectedIndex; // Required for EditableSelect

    }

    function removeAllProfiles(profileLB) {
        /// Summary
        /// Removes all profiles except the Add New Profile from the 
        /// profileLB 
        while (profileLB.options.length > 1) {
            profileLB.remove(1);
        }
    }

    // The remote data has changed
    function dataChangedHandler(eventArgs) {

        if (applicationData.version == 1) {

            let profileLB = document.getElementById("profileLB");

            // Save the current selection
            let preferred = profileLB.options[profileLB.selectedIndex].text;
            removeAllProfiles(profileLB);
            addProfiles();
            selectAndLoadProfile(profileLB, preferred);
        } else {
            document.getElementById("InvalidDataVersionFlyout").winControl.show(profileLB);
        }
    }

    // Method to handle different versions
    function setVersionHandler(setVersionRequest) {
        // At the moment we only handle v1, so we
        // don't need any conversions
    }


    /// <summary> 
    /// Handler executed when ready to share; handling the share operation should be performed 
    /// outside the activation handler 
    /// </summary> 
    function shareReady(eventArgs) {
        let sharedData = shareOperation.data;

        if (sharedData.contains(Windows.ApplicationModel.DataTransfer.StandardDataFormats.text)) {
            // Set the preURL to the shared data
            sharedData.getTextAsync().done(function (text) {
                preURL.innerText = text;
                if (!usedFollowsProfile()) {
                    populateURL();
                    WinJS.Application.sessionState.passwdUrl = passwdUrl.value;
                }
                WinJS.Application.sessionState.preURL = preUrl.value;

            }, function (e) {
                preURL.innerText = "Error Receiving Data from Share";
            });
        }
        if (sharedData.contains(Windows.ApplicationModel.DataTransfer.StandardDataFormats.webLink)) {
            sharedData.getWebLinkAsync().done(function (webLink) {
                preURL.innerText = webLink.rawUri;
                WinJS.Application.sessionState.preURL = preUrl.value;
                if (!usedFollowsProfile()) {
                    populateURL();
                    WinJS.Application.sessionState.passwdUrl = passwdUrl.value;
                }
            }, function (e) {
                preURL.innerText = "Error Receiving Data from Share";
            });
        }

    }

    // Returns true if the currently selected profile is the default
    function isDefaultProfile() {
        let profileLB = document.getElementById("profileLB");
        let profileIndex = profileLB.selectedIndex;
        let selectedProfile = profileLB.options[profileIndex].text;

        return (selectedProfile === "Default");

    }

    // Return true if the saved 'use Text' should
    // be used, rather than generate another from the URL
    function usedFollowsProfile() {
        // Always use the URL for the default profile
        if (isDefaultProfile()) return false;

        if (Windows.Storage.ApplicationData.current.roamingSettings.values["UsedFollowsProfile"] !== undefined) {
            return Windows.Storage.ApplicationData.current.roamingSettings.values["UsedFollowsProfile"];
        } else {
            // By default, follow the Firefox plugin usage
            return true;
        }
    }

    WinJS.Application.addEventListener("shareready", shareReady, false);
    app.start();
})();
