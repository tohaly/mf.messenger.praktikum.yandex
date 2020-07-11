(function () {
  const errorTemplate = window.ErrorTmpl;

  const data = {
    errorCode: "Error 404",
    errorTitle: "Not found",
  };

  document
    .querySelector(".page")
    .appendChild(new window.SimpleTemplateEngine(errorTemplate).getNode(data));
})();
