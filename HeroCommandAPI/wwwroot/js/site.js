// Heroes
const heroUri = 'api/Heroes';
let heroes = [];

function getHeroes() {
    fetch(heroUri)
        .then(response => response.json())
        .then(data => _displayHeroes(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addHero() {
    const addHeroNameTextbox = document.getElementById('add-hero-name');
    const addHeroHireCostTextbox = document.getElementById('add-hero-hireCost');
    const addHeroSkillTextbox = document.getElementById('add-hero-skill');
    const addHeroPlayerLevelVisibleTextbox = document.getElementById('add-hero-playerLevelVisible');
;    const hero = {
        name: addHeroNameTextbox.value.trim(),
        hireCost: parseInt(addHeroHireCostTextbox.value.trim(), 10),
        skill: parseInt(addHeroSkillTextbox.value.trim(), 10),
        playerLevelVisible: parseInt(addHeroPlayerLevelVisibleTextbox.value.trim(), 10)
    };

    fetch(heroUri, {
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
            addHeroNameTextbox.value = '';
            addHeroHireCostTextbox.value = '';
            addHeroSkillTextbox.value = '';
            addHeroPlayerLevelVisibleTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

function deleteHero(id) {
    fetch(`${heroUri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayHeroEditForm(id) {
    const item = heroes.find(item => item.id === id);

    document.getElementById('edit-hero-name').value = item.name;
    document.getElementById('edit-hero-id').value = item.id;
    document.getElementById('edit-hero-skill').value = item.skill;
    document.getElementById('edit-hero-hireCost').value = item.hireCost;
    document.getElementById('edit-hero-playerLevelVisible').value = item.playerLevelVisible;
    document.getElementById('editHeroForm').style.display = 'block';
}

function updateHero() {
    const itemId = document.getElementById('edit-hero-id').value;
    const item = {
        id: parseInt(itemId, 10),
        name: document.getElementById('edit-hero-name').value.trim(),
        skill: parseInt(document.getElementById('edit-hero-skill').value.trim(), 10),
        hireCost: parseInt(document.getElementById('edit-hero-hireCost').value.trim(), 10),
        playerLevelVisible: parseInt(document.getElementById('edit-hero-playerLevelVisible').value.trim(), 10)
    };

    fetch(`${heroUri}/${itemId}`, {
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
    closeHeroInput();

    return false;
}

function closeHeroInput() {
    document.getElementById('editHeroForm').style.display = 'none';
}

function _displayHeroCount(itemCount) {
    const name = (itemCount === 1) ? 'hero' : 'heroes';

    document.getElementById('heroCounter').innerText = `${itemCount} ${name}`;
}

function _displayHeroes(data) {
    const tBody = document.getElementById('heroes');
    tBody.innerHTML = '';

    _displayHeroCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayHeroEditForm(${item.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteHero(${item.id})`);

        let tr = tBody.insertRow();

        let td0 = tr.insertCell(0);
        let idNode = document.createTextNode(item.id);
        td0.appendChild(idNode);

        let td1 = tr.insertCell(1);
        let textNode = document.createTextNode(item.name);
        td1.appendChild(textNode);

        let td2 = tr.insertCell(2);
        let skillNode = document.createTextNode(item.skill);
        td2.appendChild(skillNode);

        let td3 = tr.insertCell(3);
        let hireCostTextNode = document.createTextNode(item.hireCost);
        td3.appendChild(hireCostTextNode);

        let td4 = tr.insertCell(4);
        let playerLevelVisibleTextNode = document.createTextNode(item.playerLevelVisible);
        td4.appendChild(playerLevelVisibleTextNode);

        let td5 = tr.insertCell(5);
        td5.appendChild(editButton);

        let td6 = tr.insertCell(6);
        td6.appendChild(deleteButton);
    });

    heroes = data;
}
// End Heroes

// Missions
const missionUri = 'api/Missions';
let missions = [];

function getMissions() {
    fetch(missionUri)
        .then(response => response.json())
        .then(data => _displayMissions(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addMission() {
    const addMissionNameTextbox = document.getElementById('add-mission-name');
    const addMissionSkillCostTextbox = document.getElementById('add-mission-skill');
    const addMissionRewardTextbox = document.getElementById('add-mission-reward');
    const addMissionDurationTextbox = document.getElementById('add-mission-duration');
    const addMissionPlayerLevelVisibleTextbox = document.getElementById('add-mission-playerLevelVisible');

    const mission = {
        name: addMissionNameTextbox.value.trim(),
        skillCost: parseInt(addMissionSkillCostTextbox.value.trim(), 10),
        reward: parseInt(addMissionRewardTextbox.value.trim(), 10),
        durationMs: parseInt(addMissionDurationTextbox.value.trim(), 10),
        playerLevelVisible: parseInt(addMissionPlayerLevelVisibleTextbox.value.trim(), 10)
    };

    fetch(missionUri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mission)
    })
        .then(response => response.json())
        .then(() => {
            getMissions();
            addMissionNameTextbox.value = '';
            addMissionSkillCostTextbox.value = '';
            addMissionRewardTextbox.value = '';
            addMissionDurationTextbox.value = '';
            addMissionPlayerLevelVisibleTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

function deleteMission(id) {
    fetch(`${missionUri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayMissionEditForm(id) {
    const item = missions.find(item => item.id === id);

    document.getElementById('edit-mission-name').value = item.name;
    document.getElementById('edit-mission-id').value = item.id;
    document.getElementById('edit-mission-skill').value = item.skillCost;
    document.getElementById('edit-mission-reward').value = item.reward;
    document.getElementById('edit-mission-duration').value = item.durationMs;
    document.getElementById('edit-mission-playerLevelVisible').value = item.playerLevelVisible;
    document.getElementById('editMissionForm').style.display = 'block';
}

function updateMission() {
    const itemId = document.getElementById('edit-mission-id').value;
    const item = {
        id: parseInt(itemId, 10),
        name: document.getElementById('edit-mission-name').value.trim(),
        skillCost: parseInt(document.getElementById('edit-mission-skill').value.trim(), 10),
        reward: parseInt(document.getElementById('edit-mission-reward').value.trim(), 10),
        durationMs: parseInt(document.getElementById('edit-mission-duration').value.trim(), 10),
        playerLevelVisible: parseInt(document.getElementById('edit-mission-playerLevelVisible').value.trim(), 10)
    };

    fetch(`${missionUri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    getMissions();
    closeMissionInput();

    return false;
}

function closeMissionInput() {
    document.getElementById('editMissionForm').style.display = 'none';
}

function _displayMissionCount(itemCount) {
    const name = (itemCount === 1) ? 'mission' : 'missions';

    document.getElementById('missionCounter').innerText = `${itemCount} ${name}`;
}

function _displayMissions(data) {
    const tBody = document.getElementById('missions');
    tBody.innerHTML = '';

    _displayMissionCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayMissionEditForm(${item.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteMission(${item.id})`);

        let tr = tBody.insertRow();

        let td0 = tr.insertCell(0);
        let idNode = document.createTextNode(item.id);
        td0.appendChild(idNode);

        let td1 = tr.insertCell(1);
        let textNode = document.createTextNode(item.name);
        td1.appendChild(textNode);

        let td2 = tr.insertCell(2);
        let skillNode = document.createTextNode(item.skillCost);
        td2.appendChild(skillNode);

        let td3 = tr.insertCell(3);
        let hireCostTextNode = document.createTextNode(item.reward);
        td3.appendChild(hireCostTextNode);

        let td4 = tr.insertCell(4);
        let durationTextNode = document.createTextNode(item.durationMs);
        td4.appendChild(durationTextNode);

        let td5 = tr.insertCell(5);
        let playerLevelVisibleTextNode = document.createTextNode(item.playerLevelVisible);
        td5.appendChild(playerLevelVisibleTextNode);

        let td6 = tr.insertCell(6);
        td6.appendChild(editButton);

        let td7 = tr.insertCell(7);
        td7.appendChild(deleteButton);
    });

    missions = data;
}
// End Missions

// Players
const playerUri = 'api/Players';
let players = [];

function getPlayers() {
    fetch(playerUri)
        .then(response => response.json())
        .then(data => _displayPlayers(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addPlayer() {
    const addPlayerNameTextbox = document.getElementById('add-player-name');
    const addPlayerLevelTextbox = document.getElementById('add-player-level');
    const addPlayerCoinTextbox = document.getElementById('add-player-coin');
    const addPlayerMissionsTextbox = document.getElementById('add-player-missions');

    const player = {
        name: addPlayerNameTextbox.value.trim(),
        level: parseInt(addPlayerLevelTextbox.value.trim(), 10),
        coin: parseInt(addPlayerCoinTextbox.value.trim(), 10),
        missionsSinceUpgrade: parseInt(addPlayerMissionsTextbox.value.trim(), 10)
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
            addPlayerNameTextbox.value = '';
            addPlayerLevelTextbox.value = '';
            addPlayerCoinTextbox.value = '';
            addPlayerMissionsTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

function deletePlayer(id) {
    fetch(`${playerUri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayPlayerEditForm(id) {
    const item = players.find(item => item.id === id);

    document.getElementById('edit-player-name').value = item.name;
    document.getElementById('edit-player-id').value = item.id;
    document.getElementById('edit-player-level').value = item.level;
    document.getElementById('edit-player-coin').value = item.coin;
    document.getElementById('edit-player-missions').value = item.missionsSinceUpgrade;
    document.getElementById('editPlayerForm').style.display = 'block';
}

function updatePlayer() {
    const itemId = document.getElementById('edit-player-id').value;
    const item = {
        id: parseInt(itemId, 10),
        name: document.getElementById('edit-player-name').value.trim(),
        level: parseInt(document.getElementById('edit-player-level').value.trim(), 10),
        coin: parseInt(document.getElementById('edit-player-coin').value.trim(), 10),
        missionsSinceUpgrade: parseInt(document.getElementById('edit-player-missions').value.trim(), 10)
    };

    fetch(`${playerUri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    getPlayers();
    closePlayerInput();

    return false;
}

function closePlayerInput() {
    document.getElementById('editPlayerForm').style.display = 'none';
}

function _displayPlayerCount(itemCount) {
    const name = (itemCount === 1) ? 'player' : 'players';

    document.getElementById('playerCounter').innerText = `${itemCount} ${name}`;
}

function _displayPlayers(data) {
    const tBody = document.getElementById('players');
    tBody.innerHTML = '';

    _displayPlayerCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayPlayerEditForm(${item.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deletePlayer(${item.id})`);

        let tr = tBody.insertRow();

        let td0 = tr.insertCell(0);
        let idNode = document.createTextNode(item.id);
        td0.appendChild(idNode);

        let td1 = tr.insertCell(1);
        let nameNode = document.createTextNode(item.name);
        td1.appendChild(nameNode);

        let td2 = tr.insertCell(2);
        let levelNode = document.createTextNode(item.level);
        td2.appendChild(levelNode);

        let td3 = tr.insertCell(3);
        let coinNode = document.createTextNode(item.coin);
        td3.appendChild(coinNode);

        let td4 = tr.insertCell(4);
        let missionsSinceUpgradeNode = document.createTextNode(item.missionsSinceUpgrade);
        td4.appendChild(missionsSinceUpgradeNode);

        let td5 = tr.insertCell(5);
        td5.appendChild(editButton);

        let td6 = tr.insertCell(6);
        td6.appendChild(deleteButton);
    });

    players = data;
}
// End Players