"use strict";
(function () {
    const errorTemplate = window.ErrorTmpl;
    const data = {
        errorCode: "Error 500",
        errorTitle: "Problems with server",
    };
    document
        .querySelector(".page")
        .appendChild(new window.SimpleTemplateEngine(errorTemplate).getNode(data));
})();
