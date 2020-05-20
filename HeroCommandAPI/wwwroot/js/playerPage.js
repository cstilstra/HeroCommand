const playerUri = 'api/Players'
const heroUri = 'api/Heroes'
const missionUri = 'api/Missions'

let heroesToPlayer = []
let player = null
let heroes = []
let missions = []

function loadPlayerPage() {
    var playerId = sessionStorage.getItem('playerId')    

    fetch(`${heroUri}/toPlayer/${playerId}`)
        .then(response => response.json())
        .then(data => _setHeroesToPlayer(data))
        .then(error => console.error('Unable to get hero to player links.', error));

    fetch(`${playerUri}/${playerId}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => _displayPlayerInfo(data))
        .then(error => console.error('Unable to get player.', error))
        .then(() => {
            fetch(`${heroUri}/visibleByLevel/${player.level}`)
                .then(response => response.json())
                .then(data => _displayHeroes(data))
                .then(error => console.error('Unable to get heroes.', error));
        })
        .then(() => {
            fetch(`${missionUri}/visibleByLevel/${player.level}`)
                .then(response => response.json())
                .then(data => _displayMissions(data))
                .then(error => console.error('Unable to get heroes.', error));
        });
}

function _displayPlayerInfo(data) {
    player = data
    const playerIdPara = document.getElementById('player-info-p')
    playerIdPara.innerHTML = ''
    playerIdPara.innerHTML = `${player.name}<br>Level ${player.level}<br>${player.coin} coins<br>${player.missionsSinceUpgrade}/5 experience`   
}

function _displayHeroes(data) {
    heroes = data
    const visibleHeroesTBody = document.getElementById('visible-heroes-tbody')
    visibleHeroesTBody.innerHTML = ''

    heroes.forEach(item => {
        let matches = heroesToPlayer.filter(
            function (element) {
                return(element.heroId == item.id)
            }
        )
        let htp = (matches.length > 0) ? matches[0] : { heroAdditionalSkill: 0 }

        let tr = visibleHeroesTBody.insertRow();

        let td0 = tr.insertCell(0)
        let nameNode = document.createTextNode(item.name)
        td0.appendChild(nameNode)

        let td1 = tr.insertCell(1)
        let skillNode = document.createTextNode(item.skill + htp.heroAdditionalSkill)
        td1.appendChild(skillNode)

        let td2 = tr.insertCell(2)
        let costNode = document.createTextNode(item.hireCost)
        td2.appendChild(costNode)
    })
}

function _displayMissions(data) {
    missions = data
    const visibleMissionsTBody = document.getElementById('visible-missions-tbody')
    visibleMissionsTBody.innerHTML = ''

    missions.forEach(item => {
        let tr = visibleMissionsTBody.insertRow();

        let td0 = tr.insertCell(0)
        let nameNode = document.createTextNode(item.name)
        td0.appendChild(nameNode)

        let td1 = tr.insertCell(1)
        let skillNode = document.createTextNode(item.skillCost)
        td1.appendChild(skillNode)

        let td2 = tr.insertCell(2)
        let rewardNode = document.createTextNode(item.reward)
        td2.appendChild(rewardNode)
    })
}

function _setHeroesToPlayer(data) {
    heroesToPlayer = data
}