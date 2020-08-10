const template = `
<section class="popup popup_is-open">
  <div class="popup__content">
    <form class="popup__form" name="signin" novalidate>
      {% titleInput %}
      {% serverError %}
      {% buttonSubmit %}
      {% buttonCancel %}
    </form>
  </div>
</section>
`;

export { template };
