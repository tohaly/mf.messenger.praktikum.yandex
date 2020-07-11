interface Window {
  Avatar: string;
}

window.Avatar = (function () {
  return `
  <img
    src="{% link %}"
    alt="{% alt %}"
    class="{% className %}"
  />
  `;
})();
