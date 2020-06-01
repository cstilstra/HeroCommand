const playerUri = 'api/Players'
const heroUri = 'api/Heroes'
const missionUri = 'api/Missions'

let heroesToPlayer = []
let player = null
let heroes = []
let missions = []
let selectedHeroes = []
let selectedMission = null

function loadPlayerPage() {
    var playerId = sessionStorage.getItem('playerId')

    fetch(`${heroUri}/toPlayer/${playerId}`)
        .then(response => response.json())
        .then(data => _setHeroesToPlayer(data))
        .catch(error => console.error('Unable to get hero to player links.', error));

    fetch(`${playerUri}/${playerId}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => _displayPlayerInfo(data))
        .catch(error => console.error('Unable to get player.', error))
        .then(() => {
            fetch(`${heroUri}/visibleByLevel/${player.level}`)
                .then(response => response.json())
                .then(data => _displayHeroes(data))
                .catch(error => console.error('Unable to get heroes.', error));
        })
        .then(() => {
            fetch(`${missionUri}/visibleByLevel/${player.level}`)
                .then(response => response.json())
                .then(data => _displayMissions(data))
                .then(data => _checkIfMissionsUnderway())
                .catch(error => console.error('Unable to get missions.', error));
        })
}

function _displayPlayerInfo(data) {
    player = data
    const playerIdPara = document.getElementById('player-info-p')
    playerIdPara.innerHTML = ''
    playerIdPara.innerHTML = `<b>${player.name}</b><br>Level ${player.level}<br>${player.coin} coins<br>${player.missionsSinceUpgrade}/5 experience`   
}

function _displayHeroes(data) {
    heroes = data
    const visibleHeroesTBody = document.getElementById('visible-heroes-tbody')
    visibleHeroesTBody.innerHTML = ''

    heroes.forEach(hero => {
        let tr = visibleHeroesTBody.insertRow();

        let td0 = tr.insertCell(0)
        let nameNode = document.createTextNode(hero.name)
        td0.appendChild(nameNode)

        let td1 = tr.insertCell(1)
        let skillNode = document.createTextNode(_getHeroAdjustedSkill(hero))
        td1.appendChild(skillNode)

        let td2 = tr.insertCell(2)
        let costNode = document.createTextNode(`${hero.hireCost} coins to hire.`)
        td2.appendChild(costNode)

        let assignButton = document.createElement('button')
        assignButton.innerText = 'Assign'
        assignButton.classList.add('hero-assign-btn')
        assignButton.id = `h-a-b-${hero.id}`
        assignButton.setAttribute('onclick', `_addHeroToMission(${hero.id})`)
        assignButton.addEventListener('click', function (e) { _addHeroToMission(hero.id, assignButton) })
        assignButton.setAttribute('style', 'display:none')

        let td3 = tr.insertCell(3)
        td3.appendChild(assignButton)

        let td4 = tr.insertCell(4)
        let heroOnMissionNode = document.createTextNode('hero on mission')
        td4.id = `h-o-m-${hero.id}`
        td4.style.display = 'none'
        td4.appendChild(heroOnMissionNode)
    })
}

function _displayMissions(data) {
    missions = data
    const visibleMissionsTBody = document.getElementById('visible-missions-tbody')
    visibleMissionsTBody.innerHTML = ''

    missions.forEach(mission => {
        let tr = visibleMissionsTBody.insertRow();

        let td0 = tr.insertCell(0)
        let nameNode = document.createTextNode(mission.name)
        td0.appendChild(nameNode)

        let td1 = tr.insertCell(1)
        let skillNode = document.createTextNode(`${mission.skillCost} skill required.`)
        td1.appendChild(skillNode)

        let td2 = tr.insertCell(2)
        let rewardNode = document.createTextNode(`${mission.reward} coins for completion.`)
        td2.appendChild(rewardNode)

        let assignHeroesButton = document.createElement('button')
        assignHeroesButton.innerText = 'Assign Heroes'
        assignHeroesButton.id = `a-h-b${mission.id}`
        assignHeroesButton.setAttribute('onclick', `_beginAssignHeroes(${mission.id})`)

        let td3 = tr.insertCell(3)
        td3.appendChild(assignHeroesButton)

        let td4 = tr.insertCell(4)
        let timeTilFinishNode = document.createTextNode('time until mission is finished')
        td4.id = `t-t-f-${mission.id}`
        td4.style.display = 'none'
        td4.appendChild(timeTilFinishNode)
    })
}

function _beginAssignHeroes(missionId) {
    console.log(`missionId:${missionId}`)
    selectedMission = missions.filter(function (item) { return item.id == missionId })[0]

    selectedHeroes = []
    // disable 'Available Missions' panel
    const availableMissionsPanel = document.getElementById('available-missions-panel')
    availableMissionsPanel.style.display = 'none'

    _updateMissionAssignmentPanel();
    _showMissionAssignmentPanel(true)

    // show 'Assign' button for all heroes
    _showAssignHeroButtons(true)
}

function _setHeroesToPlayer(data) {
    heroesToPlayer = data
}

function _updateMissionAssignmentPanel() {
    const missionNameDiv = document.getElementById('m-a-mission-name')
    missionNameDiv.innerText = `Mission: ${selectedMission.name}`

    let skillSum = 0
    const heroesOnMissionTBody = document.getElementById('heroes-on-mission-tbody')
    heroesOnMissionTBody.innerHTML = ''

    selectedHeroes.forEach(hero => {
        skillSum += _getHeroAdjustedSkill(hero)

        let tr = heroesOnMissionTBody.insertRow();
        let td0 = tr.insertCell(0)
        let nameNode = document.createTextNode(hero.name)
        td0.appendChild(nameNode)

        let removeHeroButton = document.createElement('button')
        removeHeroButton.innerText = 'Remove'
        removeHeroButton.addEventListener('click', function (event) { _removeHeroFromMission(hero) })
        let td1 = tr.insertCell(1)
        td1.appendChild(removeHeroButton)
    })

    const missionSkillsDiv = document.getElementById('m-a-skills')
    missionSkillsDiv.innerText = `Skill: ${skillSum}/${selectedMission.skillCost}`
}

function _showMissionAssignmentPanel(trueFalse) {
    const missionAssignPanel = document.getElementById('mission-assignment-panel')

    trueFalse ? missionAssignPanel.style.display = 'block' : missionAssignPanel.style.display = 'none'
}

// this function ends up being called twice per button click??
function _addHeroToMission(heroId, assignButton) {
    if (assignButton != undefined) {
        let hero = heroes.filter(function (item) { return item.id == heroId })[0]

        if (!selectedHeroes.includes(hero)) {
            selectedHeroes.push(hero)
        }

        assignButton.style.display = 'none'
        _updateMissionAssignmentPanel()
    }
}

function _removeHeroFromMission(hero) {
    let index = selectedHeroes.indexOf(hero)
    if (selectedHeroes.includes(hero)) var removed = selectedHeroes.splice(index, 1)

    const button = document.getElementById(`h-a-b-${hero.id}`)
    button.style.display = 'block'
    _updateMissionAssignmentPanel()
}

function _getHeroAdjustedSkill(hero) {
    let matches = heroesToPlayer.filter(
        function (element) {
            return (element.heroId == hero.id)
        }
    )
    let htp = (matches.length > 0) ? matches[0] : { heroAdditionalSkill: 0 }

    return hero.skill + htp.heroAdditionalSkill 
}

function _beginMission() {
    let heroIds = []
    selectedHeroes.forEach(hero => {
        heroIds.push(hero.id)
    })

    fetch(`${missionUri}/startMission/${selectedMission.id}?playerId=${player.id}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(heroIds)
    })
        .then(response => response.json())
        .then(response => {
            _cancelMissionAssignment()
            _checkIfMissionsUnderway()
        })
        .catch(error => console.error('Unable to add item.', error));     
}

function _cancelMissionAssignment() {
    selectedHeroes = []
    selectedMission = null
    _showMissionAssignmentPanel(false)
    // enable 'Available Missions' panel
    const availableMissionsPanel = document.getElementById('available-missions-panel')
    availableMissionsPanel.style.display = 'block'

    _showAssignHeroButtons(false)
}

function _tryEndMission(missionId) {
    fetch(`${missionUri}/tryEndMission/${missionId}?playerId=${player.id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(response => {
            if (response.includes('until mission complete')) _handleMissionUnderway(true, missionId, response)
            else _handleMissionUnderway(false, missionId, "")
        })
        .catch(error => console.error('Unable to end mission.', error));
}

function _handleMissionUnderway(isMissionUnderway, missionId, response) {
    const button = document.getElementById(`a-h-b${missionId}`)
    if (isMissionUnderway) {
        console.log('that mission is currently underway')
        button.style.display = 'none'
        let timeTilFinishDisplay = document.getElementById(`t-t-f-${missionId}`)
        timeTilFinishDisplay.innerText = `${response.substring(0,8)} until mission complete`
        timeTilFinishDisplay.style.display = 'block'
    } else {
        console.log('that mission is not underway')
        button.style.display = 'block'
    }
}

function _checkIfMissionsUnderway() {
    missions.forEach(mission => {
        let status = _tryEndMission(mission.id)
    })
}

function _showAssignHeroButtons(trueFalse) {
    const assignHeroButtons = document.getElementsByClassName('hero-assign-btn')
    if (trueFalse) {
        for (let item of assignHeroButtons) {
            item.style.display = 'block'
        }
    } else {
        for (let item of assignHeroButtons) {
            item.style.display = 'none'
        }
    }
}

function _checkIfHeroesOnMission() {
    heroes.forEach(hero => {

    })
}