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

class CardBuilder {
    constructor(storage, cardContainer){
        this.storage = storage;
        this.cardContainer = cardContainer;
    }
    displayCards() {
        let that = this;
        function createElement(element, index, clases, content){
            let result = document.createElement(element);
            clases.forEach(item => result.classList.add(item));
            if(Array.isArray(content)){
                content.forEach(item => result.append(item))
            } else {
                result.append(content);
            }
            if(element == 'button' && clases.includes('btn-outline-danger')){
                result.addEventListener('click', () => {
                    that.deleteRecord(index);
                });
            }
            return result;
        }
        this.cardContainer.innerHTML = '';
        const items = this.storage.getAll();
        items.forEach((item, index) => {
            this.cardContainer.append(
                createElement(
                    'div',
                    0,
                    ['mb-4'], 
                    createElement(
                        'div', 
                        0,
                        ['card'], 
                        createElement(
                            'div', 
                            0,
                            ['card-body'],
                            [
                                createElement(
                                    'h5',
                                    0,
                                    ['card-title'],
                                    item.empresa
                                ),
                                createElement(
                                    'p',
                                    0,
                                    ['card-text'],
                                    `Fecha: ${item.fecha}`
                                ),
                                createElement(
                                    'p',
                                    0,
                                    ['card-text'],
                                    `País: ${item.pais}`
                                ),
                                createElement(
                                    'button',
                                    index,
                                    ['btn', 'btn-outline-danger'],
                                    `Eliminar`
                                ),
                            ]
                        )
                    )
                )
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