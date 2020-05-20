const playerUri = 'api/Players';
let players = [];

function getPlayers() {
    fetch(playerUri)
        .then(response => response.json())
        .then(data => _displayPlayers(data))
        .catch(error => console.error('Unable to get items.', error));
}

function _displayPlayers(data) {
    const tBody = document.getElementById('existingPlayersForm');
    tBody.innerHTML = '';

    data.forEach(item => {

        let tr = tBody.insertRow();

        let nameButton = document.createElement('button');
        nameButton.innerText = item.name;
        nameButton.setAttribute('onclick', `_setPlayerIdToSessionData(${item.id})`)

        let td0 = tr.insertCell(0);
        td0.appendChild(nameButton);
    });

    players = data;
}

function _setPlayerIdToSessionData(playerId) {
    console.log(`you've chosen player id: ${playerId}`)
    sessionStorage.setItem("playerId", playerId)
    window.location.href = '/player.html'
}

function createPlayer() {
    const createPlayerNameTextbox = document.getElementById('create-player-name');

    const player = {
        name: createPlayerNameTextbox.value.trim(),
        level: 1,
        coin: 0,
        missionsSinceUpgrade: 0
    };

    fetch(playerUri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(player)
    })
        .then(response => response.json())
        .then(() => {
            getPlayers();
            createPlayerNameTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}