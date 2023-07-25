const uri = 'api/food';
let foods = [];

function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
    const addNameTextbox = document.getElementById('add-name');
    const addDescriptionTextbox = document.getElementById('add-descrip');
    const addPriceTextbox = document.getElementById('add-price');

    const food = {
        name: addNameTextbox.value.trim(),
        descripcion: addDescriptionTextbox.value.trim(),
        price: addPriceTextbox.value
    }

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(food)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addNameTextbox.value = '';
            addDescriptionTextbox.value = '';
            addPriceTextbox.value = 0;
        })
        .catch(error => console.error('unable to add food', error));
}

function deleteItem(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error = console.error('Unable to add item.', error));
}

function displayEditForm(id) {
    document.getElementById('addForm').style.display = 'none';
    const food = foods.find(food => food.id === id);

    document.getElementById('edit-id').value = food.id
    document.getElementById('edit-name').value = food.name
    document.getElementById('edit-descrip').value = food.descripcion
    document.getElementById('edit-price').value = food.precio
    document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
    const foodId = document.getElementById('edit-id').value;
    const foodPrice = document.getElementById('edit-price').value;

    const food = {
        id: parseInt(foodId, 10),
        name: document.getElementById('edit-name').value,
        descripcion: document.getElementById('edit-description').value,
        price: parseInt(foodPrice, 10),
    };

    fetch(`${uri}/${foodId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(food)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update food', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
    document.getElementById('addForm').style.display = 'block';
}

function _displayCount(foodCount) {
    const name = (foodCount === 1) ? 'food' : 'foods';

    document.getElementById('counter').innerText = `${foodCount} ${name}`;
}

function _displayItems(data) {
    const tBody = document.getElementById('items');
    tBody.innerText = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(food => {
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${food.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${food.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNodeId = document.createTextNode(food.id)
        td1.appendChild(textNodeId);

        let td2 = tr.insertCell(1);
        let textNodeName = document.createTextNode(food.name)
        td2.appendChild(textNodeName);

        let td3 = tr.insertCell(2);
        let textNodeDescription = document.createTextNode(food.descripcion)
        td3.appendChild(textNodeDescription);

        let td4 = tr.insertCell(3);
        let textNodePrice = document.createTextNode(food.price)
        td4.appendChild(textNodePrice);

        let td7 = tr.insertCell(4);
        td7.appendChild(editButton);

        let td8 = tr.insertCell(5);
        td8.appendChild(deleteButton);
    });

    movies = data;
}