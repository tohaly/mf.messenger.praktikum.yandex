const buttonTemplate: string = `
    <button 
      type="submit"
      class="button {% className %}"
      onClick="{% handleClick %}"
      disabled
      >{% text %}
    </button>
`;

export default buttonTemplate;
