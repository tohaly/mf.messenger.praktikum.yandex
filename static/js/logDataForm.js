window.logDataForm = function (element) {
  const inputs = element.parentNode.querySelectorAll("input");
  const data = {};

  inputs.forEach((input) => {
    data[input.placeholder] = input.value;
  });
  console.log(data);
};
