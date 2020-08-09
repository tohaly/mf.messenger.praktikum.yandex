const template = `
  <div class="
    message 
    {% className %}"
    >
      {% avatar %}
    <div class="message__content">
      <h3 class="message__sender">{% userName %}</h3>
      <time class="message__time">
        {% time %}
      </time>
      <p class="message__text">
        {% text %}
      </p>
    </div>    
  </div>
`;

export { template };
