const buttonTemplate = `
    <button 
      type="submit"
      class="button {% className %}"
      onClick="{% handleClick %}"
      disabled
      >{% text %}
    </button>
`;
export default buttonTemplate;
