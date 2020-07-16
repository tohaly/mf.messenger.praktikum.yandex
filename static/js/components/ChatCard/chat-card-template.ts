const chatCardTemplate: string = `
  <div class="chat-card" onClick="{% activateHandle %}">
    {% Avatar %}
    <div class="chat-card__content">
      <h2 class="chat-card__title">{% title %}</h2>
      <p class="chat-card__text">
        {% text %}
      </p>
    </div>
  </div>
`;

export default chatCardTemplate;
