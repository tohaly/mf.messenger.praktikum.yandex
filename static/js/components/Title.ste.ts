interface Window {
  Title: string;
}

window.Title = (function (): string {
  return `<h2 class="page-title">{% text %}</h2>`;
})();
