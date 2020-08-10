const template = `
  <div 
    data-chatId="{% chatId %}" 
    class="{% activeSelector %} chat-card"
    >
    {% chatAvatar %}
    <div class="chat-card__content">
      <h2 class="chat-card__title">{% title %}</h2>
      <p class="chat-card__text">
        {% text %}
      </p>
    </div>
  </div>
`;

export { template };
