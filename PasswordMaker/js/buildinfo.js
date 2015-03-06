// See http://stackoverflow.com/questions/14844039/winjs-check-if-is-running-in-debug-mode
(function () {
    "use strict";

    WinJS.Namespace.define("BuildInfo", {
        isDebugBuild: true,
        isReleaseBuild: false,

        config: "Debug",
        currentApp: Windows.ApplicationModel.Store.CurrentAppSimulator

        /*
          * Include debug-only data, service URIs, access tokens, accounts, etc.
          */
    });

    let quinmetro = document.createElement("script");
    quinmetro.src = "/js/Qunit/qunitmetro.js";
    quinmetro.defer = true;
    document.head.appendChild(quinmetro);

    let qunitparam = document.createElement("script");
    qunitparam.src = "/js/Qunit/qunit-parameterize.js";
    qunitparam.defer = true;
    document.head.appendChild(qunitparam);

    let test = document.createElement("script");
    test.src = "/js/test.js";
    test.defer = true;
    document.head.appendChild(test);

    let linkElement = document.createElement("link");
    linkElement.href = "/css/qunitmetro.css"
    linkElement.rel = "stylesheet";
    document.head.appendChild(linkElement);

    let quinMetroLight = document.createElement("link");
    quinMetroLight.href = "/css/qunitmetro-light.css"
    quinMetroLight.rel = "stylesheet";
    document.head.appendChild(quinMetroLight);

})();