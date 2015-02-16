// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/settings.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            document.getElementById("displayToggle").addEventListener("change", displayToggleHandler, false);
            document.getElementById("UsedFollowsProfileToggle").winControl.checked = Windows.Storage.ApplicationData.current.roamingSettings.values["UsedFollowsProfile"];
            document.getElementById("UsedFollowsProfileToggle").addEventListener("change", UsedFollowsProfileToggleHandler, false);
            document.getElementById("ResetDataBtn").addEventListener("click", resetDataHandler, false);
            document.getElementById("ResetConfirmBtn").addEventListener("click", resetConfirmHandler, false);
            document.getElementById("ResetCancelBtn").addEventListener("click", resetCancelHandler, false);
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });

    function displayToggleHandler(eventInfo) {
        eventInfo.target.ownerDocument.getElementById("ifHidePasswd").click();
    }

    function UsedFollowsProfileToggleHandler(eventInfo) {
        Windows.Storage.ApplicationData.current.roamingSettings.values["UsedFollowsProfile"] = eventInfo.currentTarget.winControl._checked;
    }

    function resetDataHandler(eventInfo) {
        //document.getElementById("ResetDataConfirmFlyout").winControl.show(this);
        document.getElementById("ResetDataConfirmDiv").style.display = "inline";
        document.getElementById("ResetDataBtn").style.display = "none";
    }

    function resetConfirmHandler(eventInfo) {
        Windows.Storage.ApplicationData.current.clearAsync().done(
            function () {
                Windows.Storage.ApplicationData.current.signalDataChanged();
                document.getElementById("ResetDataConfirmDiv").style.display = "none";
                document.getElementById("ResetDataBtn").style.display = "inline";
            }
        );

    }

    function resetCancelHandler(eventInfo) {
        document.getElementById("ResetDataConfirmDiv").style.display = "none";
        document.getElementById("ResetDataBtn").style.display = "inline";
    }
})();
