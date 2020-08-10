function html(strs, ...exprs){
    const html = strs.reduce((acc, curr, index) => {
        const currentExpr = exprs[index];
        let result = acc + curr;
        if (currentExpr !== undefined) {
            result += currentExpr;
        }
        return result;
    }, '');
    const template = document.createElement('template');
    template.innerHTML = html;
    return template;

}

const getAppTemplate = context => html`
  <style>
    #counter-container {
        color: green;
    }
  </style>
  <div id='counter-container'>Counter <span id='counter'>${context.counter}</span></div>
  <button id='inc-btn'>Increment</button>
`;

const updateTemplateFactory = root => (updates) => {
    Object.entries(updates).forEach(([selector, value]) => {
        const el = root.querySelector(selector);
        if (!el) { return; }
        el.innerHTML = value;
    });
}

class App extends HTMLElement {

    set counter(value) {
        this._counter = value;
        this._update({ '#counter': this.counter });
    }

    get counter() {
        return this._counter;
    }

    constructor(){
        super();
        const root = this.attachShadow({ mode: 'closed'});
        this._update = updateTemplateFactory(root);
        root.appendChild(getAppTemplate(this).content.cloneNode(true));

        this.counter = 0;

        const incBtn = root.getElementById('inc-btn');
        incBtn.addEventListener('click', () => {
            this.counter++;
        });

    }
}

customElements.define('hg-app', App);