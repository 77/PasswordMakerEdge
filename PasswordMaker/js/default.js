// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
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
            }
            args.setPromise(WinJS.UI.processAll().then(
                function completed() {

                    preURL.addEventListener("change", populateURL, false);
                    preURL.addEventListener("keyup", populateURL, false);
                    preURL.addEventListener("keydown", populateURL, false);
                    preURL.addEventListener("keypress", populateURL, false);
                    preURL.addEventListener("input", populateURL, false);

                    copyFromClipboard.addEventListener("click", copyFromClipboardHandler, false);

                    passwdMaster.addEventListener("change", preGeneratePassword, false);
                    passwdMaster.addEventListener("keyup", preGeneratePassword, false);
                    passwdMaster.addEventListener("keydown", preGeneratePassword, false);
                    passwdMaster.addEventListener("keypress", preGeneratePassword, false);
                    passwdMaster.addEventListener("input", preGeneratePassword, false);

                    saveMasterBtn.addEventListener("click", saveMaster, false);

                    whereLeetLB.addEventListener("change", whereLeetLBHandler, false);

                    leetLevelLB.addEventListener("change", preGeneratePassword, false);

                    hashAlgorithmLB.addEventListener("change", preGeneratePassword, false);
                    hashAlgorithmLB.addEventListener("keyup", preGeneratePassword, false);
                    hashAlgorithmLB.addEventListener("keydown", preGeneratePassword, false);
                    hashAlgorithmLB.addEventListener("keypress", preGeneratePassword, false);
                    hashAlgorithmLB.addEventListener("input", preGeneratePassword, false);

                    protocolCB.addEventListener("click", populateURL, false);
                    subdomainCB.addEventListener("click", populateURL, false);
                    domainCB.addEventListener("click", populateURL, false);
                    pathCB.addEventListener("click", populateURL, false);

                    passwdUrl.addEventListener("change", preGeneratePassword, false);
                    passwdUrl.addEventListener("keyup", preGeneratePassword, false);
                    passwdUrl.addEventListener("keydown", preGeneratePassword, false);
                    passwdUrl.addEventListener("keypress", preGeneratePassword, false);
                    passwdUrl.addEventListener("input", preGeneratePassword, false);

                    passwdLength.addEventListener("change", passwdLengthHandler, false);
                    passwdLength.addEventListener("keyup", passwdLengthHandler, false);
                    passwdLength.addEventListener("keydown", passwdLengthHandler, false);
                    passwdLength.addEventListener("keypress", passwdLengthHandler, false);
                    passwdLength.addEventListener("input", passwdLengthHandler, false);

                    usernameTB.addEventListener("change", preGeneratePassword, false);
                    usernameTB.addEventListener("keyup", preGeneratePassword, false);
                    usernameTB.addEventListener("keydown", preGeneratePassword, false);
                    usernameTB.addEventListener("keypress", preGeneratePassword, false);
                    usernameTB.addEventListener("input", preGeneratePassword, false);

                    counter.addEventListener("change", preGeneratePassword, false);
                    counter.addEventListener("keyup", preGeneratePassword, false);
                    counter.addEventListener("keydown", preGeneratePassword, false);
                    counter.addEventListener("keypress", preGeneratePassword, false);
                    counter.addEventListener("input", preGeneratePassword, false);

                    charset.addEventListener("change", preGeneratePassword, false);

                    passwordPrefix.addEventListener("change", preGeneratePassword, false);
                    passwordPrefix.addEventListener("keyup", preGeneratePassword, false);
                    passwordPrefix.addEventListener("keydown", preGeneratePassword, false);
                    passwordPrefix.addEventListener("keypress", preGeneratePassword, false);
                    passwordPrefix.addEventListener("input", preGeneratePassword, false);

                    passwordSuffix.addEventListener("change", preGeneratePassword, false);
                    passwordSuffix.addEventListener("keyup", preGeneratePassword, false);
                    passwordSuffix.addEventListener("keydown", preGeneratePassword, false);
                    passwordSuffix.addEventListener("keypress", preGeneratePassword, false);
                    passwordSuffix.addEventListener("input", preGeneratePassword, false);

                    ifHidePasswd.addEventListener("change", ifHidePasswdHandler, false);

                    copyToClipboardButton.addEventListener("click", copyToClipboardHandler, false);
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
    }

    function passwdLengthHandler(eventInfo) {
        if (/\D/.test(this.value)) this.value = '8';
        preGeneratePassword();
    }

    function ifHidePasswdHandler(eventInfo) {
        if (ifHidePasswd.checked == true) {
            passwdGenerated.style.color = '#fff';
        } else {
            passwdGenerated.style.color = '#00f';
        }
        saveGlobalPrefs();
    }

    function copyFromClipboardHandler(eventInfo) {
        var dataPackageView = Windows.ApplicationModel.DataTransfer.Clipboard.getContent();
        if (dataPackageView.contains(Windows.ApplicationModel.DataTransfer.StandardDataFormats.text)) {
            dataPackageView.getTextAsync().then(function (text) {
                preURL.innerText = text;
            });
        }
    }

    function copyToClipboardHandler(eventInfo) {

        var dataPackage = new Windows.ApplicationModel.DataTransfer.DataPackage();
        dataPackage.setText(passwdGenerated.value);
        Windows.ApplicationModel.DataTransfer.Clipboard.setContent(dataPackage);
    }

    app.start();
})();
