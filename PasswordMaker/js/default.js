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
    var listView;
    var listViewControl;
    var currentlySelectedIndex;

 
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

            } 

            loadListViewData();

            args.setPromise(WinJS.UI.processAll().then(
                completedSetPromise()
            ));
        } else if (args.detail.kind === activation.ActivationKind.shareTarget) {

            loadListViewData();

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
        listView = document.querySelector(".win-listview");
        listViewControl = listView.winControl;

        listViewControl.addEventListener("loadingstatechanged", loadInitialDataHandler, false);
        listViewControl.addEventListener("iteminvoked", listItemInvokedHandler, false);

        preURL.addEventListener("change", preURLHandler, false);
        preURL.addEventListener("keypress", preURLHandler, false);
        preURL.addEventListener("input", preURLHandler, false);

        copyFromClipboard.addEventListener("click", copyFromClipboardHandler, false);

        passwdMaster.addEventListener("change", passwdMasterHandler, false);
        passwdMaster.addEventListener("keypress", preGeneratePassword, false);
        passwdMaster.addEventListener("input", preGeneratePassword, false);
        

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

        document.getElementById("keepCB").addEventListener("click", keepHandler, false);

        Windows.Storage.ApplicationData.current.addEventListener("datachanged", dataChangedHandler, false);

        // charset is an editable select class that keeps getting deleted and
        // recreated.  When it is recreated, only this field gets copied, so 
        // we need to store it here
        document.getElementById("charset").onchange = charsetChangedHandler;

        document.getElementById("addProfileMenuBtn").addEventListener("click", addProfileMenuBtnHandler, false);
        document.getElementById("newProfileNameButton").addEventListener("click", newProfileNameButtonHandler, false);
        document.getElementById("newProfileNameFlyout").addEventListener("afterhide", addProfileFlyoutDismissHandler, false);

        document.getElementById("deleteProfileMenuBtn").addEventListener("click", deleteProfileMenuBtnHandler, false);
        document.getElementById("confirmDeleteButton").addEventListener("click", confirmDeleteButtonHandler, false);
        
        document.getElementById("editProfileMenuBtn").addEventListener("click", editProfileMenuBtnHandler, false);
        document.getElementById("profileDetailsBackButton").addEventListener("click", profileDetailsBackButtonHandler, false);

        // Populate Settings pane and tie commands to Settings flyouts.
        WinJS.Application.onsettings = function (e) {
            e.detail.applicationcommands = {
                "helpDiv": { href: "HelpUI.html", title: "Help" },
                "SettingsDiv": { href: "settings.html", title: "Settings"},
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

    function keepHandler(eventInfo) {
        if (!usedFollowsProfile()) {
            populateURL();
            WinJS.Application.sessionState.passwdUrl = passwdUrl.value;
        }
        WinJS.Application.sessionState.keep = eventInfo.value;
        saveProfile();
    }

    function saveProfile(profileName) {
        saveProfileAsync(profileName);
    }

    function saveProfileAsync(profileName) {


        let myPromise = applicationData.setVersionAsync(1, setVersionHandler).then(
            function success() {
                let roamingSettings = applicationData.roamingSettings;
                roamingSettings.createContainer("Profiles",
                    Windows.Storage.ApplicationDataCreateDisposition.Always);

                let selectedProfile;
                if (profileName) {
                    selectedProfile = profileName;
                } else {
                    selectedProfile = profileList.getAt(currentlySelectedIndex).name;
                }

                var charIndex = document.getElementById("charset").selectedIndex;
                var selectedChar = document.getElementById("charset").options[charIndex].text;

                let savedProfile = new Windows.Storage.ApplicationDataCompositeValue();

                savedProfile.name = selectedProfile;
                savedProfile.preUrl = preUrl.value;
                savedProfile.passwdLength = passwdLength.value;
                savedProfile.protocolCB = protocolCB.checked;
                savedProfile.domainCB = domainCB.checked;
                savedProfile.subdomainCB = subdomainCB.checked;
                savedProfile.pathCB = pathCB.checked;
                savedProfile.passwdUrl = passwdUrl.value;
                savedProfile.leetLevelLB = leetLevelLB.value;
                savedProfile.hashAlgorithmLB = hashAlgorithmLB.value;
                savedProfile.whereLeetLB = whereLeetLB.value;
                savedProfile.usernameTB = usernameTB.value;
                savedProfile.counter = counter.value;
                savedProfile.selectedChar = selectedChar;
                savedProfile.passwordPrefix = passwordPrefix.value;
                savedProfile.passwordSuffix = passwordSuffix.value;
                savedProfile.keepCB = document.getElementById("keepCB").checked;


                roamingSettings.containers.lookup("Profiles").values[selectedProfile] = savedProfile;
            },
            function error() {
            });
        return myPromise;
    }

    function deleteProfileHandler(eventInfo) {

        let selectedProfile = profileList.getAt(currentlySelectedIndex).name;


        if (selectedProfile != "Default") {
            if (roamingSettings.containers.hasKey("Profiles")) {
                roamingSettings.containers.lookup("Profiles").values.remove(selectedProfile);
            }

            // remove option from profileList
            profileList.splice(profileIndex, 1);
            selectAndLoadProfile();
        } else {
            document.getElementById("deleteDefaultFlyout").winControl.show(listView);
        }

    }
    
    function createProfileAsync(profileName) {
        profileList.push(WinJS.Binding.as({ name: profileName }));
        return saveProfileAsync(profileName);
    }

    function charsetChangedHandler(eventInfo) {
        if (eventInfo == undefined) {
            preGeneratePassword();
            saveProfile();
        } else if (eventInfo.target.selectedIndex > 0) {
            // Don't do this when creating a character set
            preGeneratePassword();
            saveProfile();
        }
    }

    function listItemInvokedHandler(eventInfo) {
        switchSelected(this.winControl.currentItem.index);
        loadProfileFromRemote(profileList.getAt(currentlySelectedIndex).name);
    }

    function switchSelected(newIndex) {
        if (currentlySelectedIndex != undefined && currentlySelectedIndex != null) {
            let oldElement = listViewControl.elementFromIndex(currentlySelectedIndex);
            oldElement.classList.remove("profileUsed");
        }

        currentlySelectedIndex = newIndex;
        let newElement = listViewControl.elementFromIndex(currentlySelectedIndex);
        newElement.classList.add("profileUsed")
    }

    // Loads the data after the initial startup.
    // Sets the current profile to that saved in the
    // session or default otherwise
    function loadInitialDataHandler(eventInfo) {
        if (listViewControl.loadingState == "complete") {
            preURL.innerText = WinJS.Application.sessionState.preURL ? WinJS.Application.sessionState.preURL : "";
            selectAndLoadProfile(WinJS.Application.sessionState.profileName);
            listView.removeEventListener("loadingstatechanged", loadInitialDataHandler, false);
            listView.addEventListener("loadingstatechanged", listViewLoadedHandler, false);
        }
    }

    function listViewLoadedHandler(eventInfo) {
        if (listViewControl.loadingState == "complete") {
            switchSelected(currentlySelectedIndex);
            listViewControl.ensureVisible(currentlySelectedIndex);
        }
    }

    function addProfileMenuBtnHandler(eventInfo) {
        
        document.getElementById("newProfileNameFlyout").winControl.show(this);
    }

    function newProfileNameButtonHandler(eventInfo) {
        let error = false;

        let inputElement = document.getElementById("newProfileNameInput");
        let enteredString = inputElement.value.trim();

        if (enteredString === "") {
            document.getElementById("newProfileNameError").innerHTML = "Profile name cannot be blank";
            inputElement.focus();
            error = true;
        } else {
            // Check to see if a profile of this name exists
            let exists = profileList.some(function (value, index, array) {
                return enteredString === value.name;
            });

            if (exists) {
                document.getElementById("newProfileNameError").innerHTML = "A profile of that name already exists";
                inputElement.focus();
                error = true;
            }
        }

        if (!error) {
            createProfileAsync(enteredString).then(
                function success(result) {
                    selectAndLoadProfile(enteredString);
                },
                function failure(result) {
                    document.getElementById("newProfilNameFlyout").winControl.show(document.getElementById("addProfileMenuBtn"));
                    document.getElementById("newProfileNameError").innerHTML = "Profile could not be saved";
                    document.getElementById("newProfileNameInput").focus();
                });
            document.getElementById("newProfileNameFlyout").winControl.hide();
        }
    }

    function addProfileFlyoutDismissHandler(eventInfo) {
        document.getElementById("newProfileNameInput").value = "";
        document.getElementById("newProfileNameError").innerHTML = "";
    }

    function deleteProfileMenuBtnHandler(eventInfo) {
        let flyout = document.getElementById("confirmDeleteFlyout");
        document.getElementById("confirmDeleteDiv").innerHtml = "Delete Profile " + profileList.getAt(currentlySelectedIndex).name + "?";
        flyout.winControl.show(this);
    }

    function confirmDeleteButtonHandler(eventInfo) {
        let selectedProfile = profileList.getAt(currentlySelectedIndex).name;

        if (selectedProfile != "Default") {
            let roamingSettings = applicationData.roamingSettings;

            if (roamingSettings.containers.hasKey("Profiles")) {
                roamingSettings.containers.lookup("Profiles").values.remove(selectedProfile);
            }

            // remove option from profileList
            profileList.splice(currentlySelectedIndex, 1);
            selectAndLoadProfile();
        }
        document.getElementById("confirmDeleteFlyout").winControl.hide();
    }

    function editProfileMenuBtnHandler(eventInfo) {
        document.getElementById("profileDetailsBackButton").disabled = false;
        document.getElementById("ProfileDetailsName").innerHTML = profileList.getAt(currentlySelectedIndex).name;

        let selectElements = document.getElementsByClassName("profileSelectClass");
        for (let i = 0; i < selectElements.length; i++) {
            selectElements[i].style.display = 'none';
        }

        let editElements = document.getElementsByClassName("profileDisplayClass");
        for (let i = 0; i < editElements.length; i++) {
            editElements[i].style.display = 'inline';
        }
        document.getElementById("profileEditAppBar").winControl.hide();
        document.getElementById("profileEditAppBar").winControl.disabled = true;
    }

    function profileDetailsBackButtonHandler(eventInfo) {
        eventInfo.preventDefault();
        let selectElements = document.getElementsByClassName("profileSelectClass");
        for (let i = 0; i < selectElements.length; i++) {
            selectElements[i].style.display = 'inline';
        }

        let editElements = document.getElementsByClassName("profileDisplayClass");
        for (let i = 0; i < editElements.length; i++) {
            editElements[i].style.display = 'none';
        }
        document.getElementById("profileEditAppBar").winControl.disabled = false;
        listViewControl.forceLayout();
    }

    function loadListViewData() {
        if (applicationData.roamingSettings.containers.hasKey("Profiles")) {
            for (let i = applicationData.roamingSettings.containers.lookup("Profiles").values.first();
                    i.hasCurrent; i.moveNext()) {
                profileList.push(WinJS.Binding.as({ name: i.current.value.name }));
            }
        } else {
            currentlySelectedIndex = 0;
            createProfileAsync("Default");
        }
    }

    function modifyListViewData() {
        while (profileList.length > 0) {
            profileList.pop();
        }
        loadListViewData();
    }

    function loadProfileFromRemote(profileName) {
        let roamingSettings = applicationData.roamingSettings;
        let a;

        if (roamingSettings.containers.hasKey("Profiles")) {

            if (profileName) {

                a = roamingSettings.containers.lookup("Profiles").values[profileName];

                //Keep the existing preURL.  The text to use is saved in passwdUrl and that is not changed if
                // the option to keep saved is selected.
                //preUrl.value = (settingsArray[0] == undefined || settingsArray[6] == undefined) ? "" : unescape(settingsArray[0]);

                passwdLength.value = (a == undefined || a.passwdLength == undefined) ? "8" : a.passwdLength;
                protocolCB.checked = (a == undefined || a.protocolCB == undefined) ? false : a.protocolCB == true;
                domainCB.checked = (a == undefined || a.domainCB == undefined) ? true : a.domainCB == true;
                subdomainCB.checked = (a == undefined || a.subdomainCB == undefined) ? false : a.subdomainCB == true;
                pathCB.checked = (a == undefined || a.pathCB == undefined) ? false : a.pathCB == true;
                passwdUrl.value = (a == undefined || a.passwdUrl == undefined) ? "" : a.passwdUrl;
                leetLevelLB.value = (a == undefined || a.leetLevelLB == undefined) ? "0" : a.leetLevelLB;
                hashAlgorithmLB.value = (a == undefined || a.hashAlgorithmLB == undefined) ? "md5" : a.hashAlgorithmLB;
                whereLeetLB.value = (a == undefined || a.whereLeetLB == undefined) ? "off" : a.whereLeetLB;
                usernameTB.value = (a == undefined || a.usernameTB == undefined) ? "" : a.usernameTB;
                counter.value = (a == undefined || a.counter == undefined) ? "" : a.counter;
                let charsetSelect = document.getElementById("charset");
                let charsetOpts = charset.options;
                let found = false;
                let profileChars = (a == undefined || a.selectedChar == undefined) ? base93 : a.selectedChar;
                for (let i = 1; i < charsetOpts.length; i++) {
                    if (charsetOpts[i].text === profileChars) {
                        charsetOpts[i].selected = true;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    charsetOpts[charsetOpts.length] = new Option(profileChars, "", false, true);
                }

                passwordPrefix.value = (a == undefined || a.passwordPrefix == undefined) ? "" : a.passwordPrefix;
                passwordSuffix.value = (a == undefined || a.passwordSuffix == undefined) ? "" : a.passwordSuffix;
                // End of PasswordMaker Library settings
                // Additional PasswordMaker Modern settings below
                document.getElementById("keepCB").checked = (a == undefined || a.keepCB == undefined) ? true : a.keepCB == true;

                if (profileName == "Default") {
                    document.getElementById("deleteProfileMenuBtn").disabled = true;
                    document.getElementById("keepLabel").disabled = true;
                    // Recalculate the passwdUrl and then password
                    populateURL();
                    WinJS.Application.sessionState.passwdUrl = passwdUrl.value;
                } else {
                    document.getElementById("deleteProfileMenuBtn").disabled = false;
                    document.getElementById("keepLabel").disabled = false;
                    if (usedFollowsProfile()) {
                        preGeneratePassword();
                    } else {
                        // Recalculate the passwdUrl and then password
                        populateURL();
                        WinJS.Application.sessionState.passwdUrl = passwdUrl.value;
                    }
                }

            }
        }
        if (a == undefined) {
            // profile wasn't found, so save it
            saveProfile();
        }
    }

    function selectAndLoadProfile(preferred) {
        let selected = 0;
        profileList.some(function (value, index, array) {
            if (value.name == "Default") {
                selected = index;
                return true;
            }
            return false;
        });

        if (preferred && preferred != "Default" ) {
            profileList.some(function (value, index, array) {
                if (value.name == preferred) {
                    selected = index;
                    return true;
                }
                return false;
            });

        }

        switchSelected(selected);
        loadProfileFromRemote(profileList.getAt(currentlySelectedIndex).name);

    }

    // The remote data has changed
    function dataChangedHandler(eventArgs) {

        if (applicationData.version == 1) {
            // Prefer to stick to currently selected, 
            // but default otherwise
            let preferred = null;
            let profileIndex = listViewControl.currentItem.index;
            preferred = profileList.getAt(profileIndex).name;
            
            modifyListViewData();
            selectAndLoadProfile(preferred);
        } else {
            document.getElementById("InvalidDataVersionFlyout").winControl.show(document.querySelector(".win-listview"));
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
                WinJS.Application.sessionState.preURL = text;
                if (listViewControl.loadingState === "Complete") {
                    preURL.innerText = text;
                    selectAndLoadProfile();
                    if (!usedFollowsProfile()) {
                        populateURL();
                        WinJS.Application.sessionState.passwdUrl = passwdUrl.value;
                    }
                }
                WinJS.Application.sessionState.preURL = preUrl.value;

            }, function (e) {
                preURL.innerText = "Error Receiving Data from Share";
            });
        }
        if (sharedData.contains(Windows.ApplicationModel.DataTransfer.StandardDataFormats.webLink)) {
            sharedData.getWebLinkAsync().done(function (webLink) {
                WinJS.Application.sessionState.preURL = webLink.rawUri;
                if (listViewControl.loadingState === "Complete") {
                    preURL.innerText = webLink.rawUri;
                    selectAndLoadProfile();
                    if (!usedFollowsProfile()) {
                        populateURL();
                        WinJS.Application.sessionState.passwdUrl = passwdUrl.value;
                    }
                }
            }, function (e) {
                preURL.innerText = "Error Receiving Data from Share";
            });
        }

    }

    // Returns true if the currently selected profile is the default
    function isDefaultProfile() {
        return profileList.getAt(currentlySelectedIndex).name === "Default";

    }

    // Return true if the saved 'use Text' should
    // be used, rather than generate another from the URL
    function usedFollowsProfile() {
        // Always use the URL for the default profile
        if (isDefaultProfile()) return false;

        return document.getElementById("keepCB").checked;
    }

    WinJS.Application.addEventListener("shareready", shareReady, false);

    var dataArray = [
{ name: "Basic banana", text: "Low-fat frozen yogurt", picture: "images/60banana.png" },
{ name: "Banana blast", text: "Ice cream", picture: "images/60banana.png" },
{ name: "Brilliant banana", text: "Frozen custard", picture: "images/60banana.png" },
{ name: "Orange surprise", text: "Sherbet", picture: "images/60orange.png" },
{ name: "Original orange", text: "Sherbet", picture: "images/60orange.png" },
{ name: "Vanilla", text: "Ice cream", picture: "images/60vanilla.png" },
{ name: "Very vanilla", text: "Frozen custard", picture: "images/60vanilla.png" },
{ name: "Marvelous mint", text: "Gelato", picture: "images/60mint.png" },
{ name: "Succulent strawberry", text: "Sorbet", picture: "images/60strawberry.png" }
    ];

    var dataList = new WinJS.Binding.List(dataArray);
    var profileList = new WinJS.Binding.List();

    var publicMembers =
        {
            profileList: profileList
        };

    WinJS.Namespace.define("ProfileData", publicMembers);

    app.start();
})();
