'use strict';

class Component {
    constructor(model) {
        this._model = model;
    }

    set view(value) {
        this._view = value;
    }

    render() {
        let renderedHTML = this._view;
        for (let [k, v] of Object.entries(this._model)) {
            renderedHTML = renderedHTML.replace("{" + k + "}", v);
        }

        this._element = document.createElement(this._model.parent);
        this._element.innerHTML = renderedHTML;
        return this._element;
    };

    delete() {
        this._element.remove();
    }
}

class MenuComponent extends Component {

    constructor(model) {
        super(model);
    }

    set data(value) {
        this._data = value;
    }

    renderMenu(items) {
        let menuHTML = '<ul>';
        for (let item of items) {
            if (item.items) {
                menuHTML += `<li><a href="${item.url}">${item.name}</a>`;
                menuHTML += this.renderMenu(item.items);
                menuHTML += '</li>';
            } else {
                menuHTML += `<li><a href="${item.url}">${item.name}</a></li>`;
            }
        }
        menuHTML += '</ul>';
        return menuHTML;
    }

    render() {
        let renderedHTML = this.renderMenu(this._data);
        this._element = document.createElement(this._model.parent);
        this._element.innerHTML = renderedHTML;
        return this._element;
    }
}

const headerComponent = new Component({
    parent: 'header',
    url: 'https://upload.wikimedia.org/wikipedia/ru/5/5b/DreamWorks_Animation_SKG_logo.png',
    label: 'Label'
});
const menuComponent = new MenuComponent({parent: 'nav'});
const footerComponent = new Component({parent: 'footer', label: 'This is KEK'});

headerComponent.view = '<h1><img src="{url}" alt=""/>{label}</h1>';
menuComponent.view = '<ul>{li}</ul>';
footerComponent.view = '<footer><p>{label}</p></footer>';

menuComponent.data = [
    {
        name: 'Главная',
        url: 'www'
    },
    {
        name: 'O нас',
        url: 'www',
        items: [
            {name: 'Кто мы', url: 'www'},
            {name: 'Где мы', url: 'www'},
            {
                name: 'Откуда',
                url: 'www',
            }
        ]
    },
    {
        name: 'Контакты',
        url: 'www'
    }
];

document.body.appendChild(headerComponent.render());
document.body.appendChild(menuComponent.render());
document.body.appendChild(footerComponent.render());

footerComponent.delete();
