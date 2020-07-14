import React, { Component } from 'react'
import { AvailableMissions } from './AvailableMissions'

const playerUri = 'api/Players'
const heroUri = 'api/Heroes'
const missionUri = 'api/Missions'

export class Gameplay extends Component {
    constructor(props) {
        super(props)

        this.state = {
            playerId: sessionStorage.getItem('playerId'),
            isLoaded: false,
            isMissionSelected: false,
            assignedHeroes: [],
            player: null,
            selectedMission: null
        }

        this.handleAssignHeroes = this.handleAssignHeroes.bind(this)
        this.handleAssignHero = this.handleAssignHero.bind(this)
        this.handleRemoveHero = this.handleRemoveHero.bind(this)
        this.handleDoneAssignHeroes = this.handleDoneAssignHeroes.bind(this)
    }

    componentDidMount() {
        this.refreshPlayer()
    }

    refreshPlayer() {
        this.setState({ isLoaded: false })
        fetch(`${playerUri}/${this.state.playerId}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        player: data,
                        isLoaded: true
                    })
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        error
                    });
                })
    }

    handleAssignHeroes(mission) {
        this.setState({
            isMissionSelected: true,
            selectedMission: mission
        })
    }

    handleAssignHero(hero) {
        let tempAssignedHeroes = this.state.assignedHeroes
        if (tempAssignedHeroes.indexOf(hero) === -1) { 
            tempAssignedHeroes.push(hero)
            this.setState({
                assignedHeroes: tempAssignedHeroes
            })
        } else {
            console.log(`${hero.name} already assigned to this mission`)
        }
    }

    handleRemoveHero(hero) {
        let tempAssignedHeroes = this.state.assignedHeroes
        let indexOfHero = tempAssignedHeroes.indexOf(hero)
        if (indexOfHero >= 0) {
            tempAssignedHeroes.splice(indexOfHero, 1)
            this.setState({
                assignedHeroes: tempAssignedHeroes
            })
        } else {
            console.log(`${hero.name} is not assigned to this mission`)
        }
    }

    handleDoneAssignHeroes() {
        this.setState({
            isMissionSelected: false,
            assignedHeroes: []
        })
    }

    render() {
        if (this.state.isLoaded) { // data loaded
            if (this.state.isMissionSelected) { // assigning heroes
                return (
                    <div>
                        <CurrentPlayer player={this.state.player} />
                        <br />
                        <AvailableHeroes player={this.state.player}
                            isAssignHeroes={true}
                            assignedHeroes={this.state.assignedHeroes}
                            assignHeroClicked={this.handleAssignHero} />
                        <br />
                        <SelectedMission player={this.state.player}
                            selectedMission={this.state.selectedMission}
                            assignedHeroes={this.state.assignedHeroes}
                            doneAssignHeroesClicked={this.handleDoneAssignHeroes}
                            removeHeroClicked={this.handleRemoveHero} />
                    </div>
                )
            } else { // not assigning heroes
                return (
                    <div>
                        <CurrentPlayer player={this.state.player} />
                        <br />
                        <AvailableMissions player={this.state.player}
                            assignHeroesClicked={this.handleAssignHeroes} />
                        <br />
                        <AvailableHeroes player={this.state.player}
                            isAssignHeroes={false}
                            assignedHeroes={this.state.assignedHeroes}
                            assignHeroClicked={this.handleAssignHero} />
                    </div>
                )
            }
        } else { // data not loaded
            return (
                <div>
                    Fetching game data...
                </div>    
            )
        }
    }
}

class CurrentPlayer extends Component {
    render() {
        return (
            <div className="panel">
                <b>{this.props.player.name}</b>
                <br />
                Level {this.props.player.level}
                <br />
                {this.props.player.coin} coins
                <br />
                {this.props.player.missionsSinceUpgrade}/5 experience
            </div>
        )
    }
}

class AvailableHeroes extends Component {
    constructor(props) {
        super(props)

        this.state = {
            player: this.props.player,
            isAssignHeroes: this.props.isAssignHeroes,
            assignHeroClicked: this.props.assignHeroClicked,
            assignedHeroes: this.props.assignedHeroes,
            heroesToPlayer: [],
            heroes: []
        }
    }

    componentDidMount() {
        this.refreshHeroes()
    }

    refreshHeroes() {
        fetch(`${heroUri}/toPlayer/${this.state.player.id}`)
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        heroesToPlayer: data
                    })
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        error
                    });
                })
            .then(() => {
                fetch(`${heroUri}/visibleByLevel/${this.state.player.level}`)
                    .then(res => res.json())
                    .then(
                        (data) => {
                            this.setState({
                                heroes: data
                            })
                        },
                        // Note: it's important to handle errors here
                        // instead of a catch() block so that we don't swallow
                        // exceptions from actual bugs in components.
                        (error) => {
                            this.setState({
                                error
                            });
                        })
            })
    }

    render() {
        const heroesItems = this.state.heroes.map((hero) => 
            <tr key={hero.id}>
                <AvailableHeroRow hero={hero}
                    heroesToPlayer={this.state.heroesToPlayer}
                    isAssigning={this.state.isAssignHeroes}
                    assignHeroClicked={this.state.assignHeroClicked} />
            </tr>
        )

        return (
            <div className = "panel" >
                <b>Heroes for Hire</b>
                <br />
                <table>
                    <tbody id="existing_heroes">
                        <tr>
                            <th>Name</th>
                            <th>Skill</th>
                            <th>Cost</th>
                        </tr>
                        {heroesItems.length > 0 ? heroesItems : <tr><td>Searching for heroes...</td></tr>}
                    </tbody>
                </table>
            </div>
        )
    }
}

class AvailableHeroRow extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hero: this.props.hero,
            heroesToPlayer: this.props.heroesToPlayer,
            isAssigning: this.props.isAssigning,
            assignHeroClicked: this.props.assignHeroClicked,
        }
    }

    applyAdjustedHeroSkill(hero) {
        let matches = this.state.heroesToPlayer.filter(
            function (element) {
                return (element.heroId === hero.id)
            }
        )
        let htp = (matches.length > 0) ? matches[0] : { heroAdditionalSkill: 0 }
        hero.playerAdjustedSkill = hero.skill + htp.heroAdditionalSkill
        return hero.playerAdjustedSkill
    }

    render() {
        if (this.state.isAssigning) {
            return (
                <>
                    <td>{this.state.hero.name}</td>
                    <td>{this.applyAdjustedHeroSkill(this.state.hero)}</td>
                    <td>{this.state.hero.hireCost} coins</td>
                    <td><button onClick={() => this.state.assignHeroClicked(this.state.hero)}>Assign hero</button></td>
                </>
            )
        } else {
            return (
                <>
                    <td>{this.state.hero.name}</td>
                    <td>{this.applyAdjustedHeroSkill(this.state.hero)}</td>
                    <td>{this.state.hero.hireCost} coins</td>
                </>
            )
        }
    }
}

//class AvailableMissions extends React.Component {
//    constructor(props) {
//        super(props)

//        this.state = {
//            player: this.props.player,
//            assignHeroesClicked: this.props.assignHeroesClicked,
//            missions: []
//        }
//    }

//    componentDidMount() {
//        this.refreshMissions()
//    }

//    refreshMissions() {
//        fetch(`${missionUri}/visibleByLevel/${this.state.player.level}`)
//            .then(res => res.json())
//            .then(
//                (data) => {
//                    this.handleMissionsData(data)
//                },
//                // Note: it's important to handle errors here
//                // instead of a catch() block so that we don't swallow
//                // exceptions from actual bugs in components.
//                (error) => {
//                    this.setState({
//                        error
//                    });
//                })
//    }

//    handleMissionsData(data) {
//        let missions = data
//        missions.forEach((mission) => {
//            fetch(`${missionUri}/tryEndMission/${mission.id}?playerId=${this.state.player.id}`, {
//                method: 'DELETE',
//                headers: {
//                    'Accept': 'application/json',
//                    'Content-Type': 'application/json'
//                }
//            })
//                .then(res => res.json())
//                .then(res => this.handleMissionUnderway(mission, res))
//        })
//        this.setState({
//            missions: missions
//        })
//    }

//    handleMissionUnderway(mission, res) {
//        console.log(`${mission.name}: ${res}`)
//        mission.response = res
//    }

//    handleAssignHeroes(mission, event) {
//        this.state.assignHeroesClicked(mission)
//        event.preventDefault()
//    }

//    render() {
//        const missionsItems = this.state.missions.map((mission) =>
//            <tr key={mission.id}>
//                <td>{mission.name}</td>
//                <td>{mission.skillCost} skill required</td>
//                <td>{mission.reward} coins for completion</td>
//                <td><button onClick={(e) => this.handleAssignHeroes(mission, e)}>Assign Heroes</button></td>
//                <td>{mission.response}</td>
//            </tr>
//        )

//        return (
//            <div className="panel" >
//                <b>Missions Available</b>
//                <br />
//                <table>
//                    <tbody id="existing_missions">
//                        <tr>
//                            <th>Name</th>
//                            <th>Skill Requirement</th>
//                            <th>Reward</th>
//                        </tr>
//                        {missionsItems.length > 0 ? missionsItems : <tr><td>Searching for missions...</td></tr>}
//                    </tbody>
//                </table>
//            </div>
//        )
//    }
//}

class SelectedMission extends Component {
    constructor(props) {
        super(props)

        this.state = {
            player: this.props.player,
            selectedMission: this.props.selectedMission,
            assignedHeroes: this.props.assignedHeroes,
            doneAssignHeroesClicked: this.props.doneAssignHeroesClicked,
            removeHeroClicked: this.props.removeHeroClicked
        }
    }

    handleCancelClick(event) {
        this.state.doneAssignHeroesClicked()
        event.preventDefault()
    }

    handleRemoveClicked(hero, event) {
        this.state.removeHeroClicked(hero)
        event.preventDefault()
    }

    handleBeginMissionClick(event) {
        let heroIds = []
        this.state.assignedHeroes.forEach(hero => {
            heroIds.push(hero.id)
        })

        heroIds.forEach(heroId => 
                console.log(`heroId: ${heroId}`)
            )

        fetch(`${missionUri}/startMission/${this.state.selectedMission.id}?playerId=${this.state.player.id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(heroIds)
        })
            .then(res => res.json())
            .then(() => {
                    this.state.doneAssignHeroesClicked()
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        error
                    });
                })

        event.preventDefault()
    }

    render() {
        let currentSkill = 0
        this.state.assignedHeroes.forEach((hero) => {
            currentSkill += hero.playerAdjustedSkill
        })

        const assignedHeroesItems = this.state.assignedHeroes.map((hero) => 
            <tr key={hero.id}>
                <td>{hero.name}</td>
                <td>{hero.playerAdjustedSkill} skill</td>
                <td><button onClick={(e) => this.handleRemoveClicked(hero, e)}>Remove</button></td>
            </tr>
        )

        return (
            <div className="panel">
                <b>Mission: {this.state.selectedMission.name}</b>
                <br /><br />
                Skill: {currentSkill} / { this.state.selectedMission.skillCost }
                <br /><br />
                <b>Heroes on Mission</b>
                <br /><br />
                <table>
                    <tbody id="assigned_heroes">
                        {assignedHeroesItems.length > 0 ? assignedHeroesItems : <tr><td>Waiting for heroes to be assigned...</td></tr>}
                    </tbody>
                </table>
                <br />
                <button onClick={(e) => this.handleBeginMissionClick(e)}>Begin Mission</button>
                <br />
                <button onClick={(e) => this.handleCancelClick(e)}>Cancel</button>
            </div>
        )
    }
}

//const domContainer = document.querySelector('#main_play_form');
//ReactDOM.render(React.createElement(Gameplay), domContainer);