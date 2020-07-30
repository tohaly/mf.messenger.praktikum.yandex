const template: string = `
  <div class="message">
    {% avatar %}
    <div class="message__content">
      <h3 class="message__sender">User Name</h3>
      <p class="message__text">
        {% text %}
      </p>
    </div>
    <time class="message__time">
      10:44:45
    </time>
  </div>
`;

export { template };
