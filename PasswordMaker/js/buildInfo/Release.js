// See http://stackoverflow.com/questions/14844039/winjs-check-if-is-running-in-debug-mode
(function () {
    "use strict";

    WinJS.Namespace.define("BuildInfo", {
        isDebugBuild: false,
        isReleaseBuild: true,

        config: "Release",
        currentApp: Windows.ApplicationModel.Store.CurrentApp

        /*
          * Include release-only data, service URIs, access tokens, accounts, etc.        
          */
    });
})();
