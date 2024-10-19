// Clase para manejar operaciones CRUD en LocalStorage
class StorageManager {
    constructor(key) {
        this.key = key;
    }

    // Obtener todos los registros
    getAll() {
        return JSON.parse(localStorage.getItem(this.key)) || [];
    }

    // Guardar un nuevo registro
    save(data) {
        const items = this.getAll();
        items.push(data);
        localStorage.setItem(this.key, JSON.stringify(items));
    }

    // Eliminar un registro por índice
    delete(index) {
        const items = this.getAll();
        items.splice(index, 1);
        localStorage.setItem(this.key, JSON.stringify(items));
    }
}

class MiniQuery {
    constructor(element, attributes = {}) {
        this.el = document.createElement(element);

        for (let attr in attributes) {
            this.el.setAttribute(attr, attributes[attr]);
        }
    }
    append(...children) {
        children.forEach(child => {
            if (child instanceof MiniQuery) {
                this.el.appendChild(child.el);
            } else if (child instanceof HTMLElement) {
                this.el.appendChild(child);
            }
        });
        return this;
    }
    text(text) {
        this.el.append(text);
        return this;
    }
    on(event, callback) {
        this.el.addEventListener(event, callback);
        return this;
    }

    get() {
        return this.el;
    }
}

function $(element, attributes) {
    return new MiniQuery(element, attributes);
}

class CardBuilder {
    constructor(storage, cardContainer) {
        this.storage = storage;
        this.cardContainer = cardContainer;
    }
    displayCards() {
        let that = this;
        
        this.cardContainer.innerHTML = '';
        const items = this.storage.getAll();
        items.forEach((item, index) => {
            this.cardContainer.appendChild(
                $('div', {class:'mb-4'}).append(
                    $('div', {class: 'card'}).append(
                        $('div', {class: 'card-body'}).append(
                            $('h5', {class: 'card-title'}).text(item.empresa),
                            $('p', {class: 'card-text'}).text(`Fecha: ${item.fecha}`),
                            $('h5', {class: 'card-text'}).text(item.pais),
                            $('div', {class: ''}).append(
                                $('button', {class:'btn btn-outline-danger', 'data-id': index}).text('Eliminar').on('click', () =>{
                                    this.deleteRecord(index);
                                })
                            )
                        )
                    )
                ).get()
            );
        });
    }
    deleteRecord(index) {
        this.storage.delete(index);
        this.displayCards();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const storage = new StorageManager('records');

    const cardContainer = document.getElementById('cardContainer');

    const cardBuilder = new CardBuilder(storage, cardContainer);

    document.getElementById('dataForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const empresa = document.getElementById('empresa').value;
        const fecha = document.getElementById('fecha').value;
        const pais = document.getElementById('pais').value;

        const newData = { empresa, fecha, pais };

        storage.save(newData);

        this.reset();

        cardBuilder.displayCards();
    });
    cardBuilder.displayCards();
});