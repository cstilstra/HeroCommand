const uri = 'api/Heroes';
let todos = [];

function getHeroes() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayHeroes(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addHero() {
    const addNameTextbox = document.getElementById('add-name');
    const addHireCostTextbox = document.getElementById('add-hireCost');

    const hero = {
        name: addNameTextbox.value.trim(),
        hireCost: parseInt(addHireCostTextbox.value.trim(), 10)
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(hero)
    })
        .then(response => response.json())
        .then(() => {
            getHeroes();
            addNameTextbox.value = '';
            addHireCostTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

function deleteHero(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
    const item = todos.find(item => item.id === id);

    document.getElementById('edit-name').value = item.name;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-hireCost').value = item.hireCost;
    document.getElementById('editForm').style.display = 'block';
}

function updateHero() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10),
        name: document.getElementById('edit-name').value.trim(),
        hireCost: parseInt(document.getElementById('edit-hireCost').value.trim(), 10)
    };

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    getHeroes();
    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'hero' : 'heroes';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayHeroes(data) {
    const tBody = document.getElementById('heroes');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteHero(${item.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNode = document.createTextNode(item.name);
        td1.appendChild(textNode);

        let td2 = tr.insertCell(1);
        let hireCostTextNode = document.createTextNode(item.hireCost);
        td2.appendChild(hireCostTextNode);

        let td3 = tr.insertCell(2);
        td3.appendChild(editButton);

        let td4 = tr.insertCell(3);
        td4.appendChild(deleteButton);
    });

    todos = data;
}