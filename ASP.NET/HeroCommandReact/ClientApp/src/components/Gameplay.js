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
            heroes: [],
            heroesToPlayer: [],
            assignedHeroes: [],
            player: null,
            selectedMission: null
        }

        this.handleAssignHeroes = this.handleAssignHeroes.bind(this)
        this.handleAssignHero = this.handleAssignHero.bind(this)
        this.handleRemoveHero = this.handleRemoveHero.bind(this)
        this.handleDoneAssignHeroes = this.handleDoneAssignHeroes.bind(this)
        this.refresh = this.refresh.bind(this)
    }

    componentDidMount() {
        this.refresh()
    }

    async refresh() {
        await this.refreshPlayer()
        await this.refreshHeroes()
        this.setState({
            isLoaded: true
        })
    }

    async refreshPlayer() {
        this.setState({ isLoaded: false })
        await fetch(`${playerUri}/${this.state.playerId}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        player: data
                    })
                },
                (error) => {
                    this.setState({
                        error
                    });
                })
    }

    async refreshHeroes() {
        await fetch(`${heroUri}/toPlayer/${this.state.player.id}`)
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        heroesToPlayer: data
                    })
                },
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
                        (error) => {
                            this.setState({
                                error
                            });
                        })
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
            return (
                <div>
                    <CurrentPlayer player={this.state.player} />
                    <br />
                    <AvailableMissions player={this.state.player}
                        assignHeroesClicked={this.handleAssignHeroes}
                        missionCompleteCallback={this.refresh}
                        displayed={!this.state.isMissionSelected} />
                    <br />
                    <AvailableHeroes player={this.state.player}
                        isAssignHeroes={this.state.isMissionSelected}
                        assignedHeroes={this.state.assignedHeroes}
                        assignHeroClicked={this.handleAssignHero}
                        heroes={this.state.heroes}
                        heroesToPlayer={this.state.heroesToPlayer} />
                    <br />
                    <SelectedMission player={this.state.player}
                        selectedMission={this.state.selectedMission}
                        assignedHeroes={this.state.assignedHeroes}
                        doneAssignHeroesClicked={this.handleDoneAssignHeroes}
                        removeHeroClicked={this.handleRemoveHero}
                        displayed={this.state.isMissionSelected} />
                </div>
            )
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
            <div className="panel box-shadow">
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

    render() {
        var heroesItems = []
        if (this.props.heroes !== undefined) {
            heroesItems = this.props.heroes.map((hero) =>
                <tr key={hero.id}>
                    <AvailableHeroRow hero={hero}
                        player={this.props.player}
                        heroesToPlayer={this.props.heroesToPlayer}
                        isAssigning={this.props.isAssignHeroes}
                        assignHeroClicked={this.props.assignHeroClicked} />
                </tr>
            )
        }

        return (
            <div className="panel box-shadow">
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
            mission: null
        }
    }

    componentDidMount() {
        this.checkIfHeroOnMission();
    }

    checkIfHeroOnMission() {
        fetch(`${missionUri}/byHero/${this.props.hero.id}?playerId=${this.props.player.id}`)
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        mission: data
                    })
                },
                (error) => {
                    this.setState({
                        error
                    });
                })
    }

    applyAdjustedHeroSkill(hero) {
        let matches = this.props.heroesToPlayer.filter(
            function (element) {
                return (element.heroId === hero.id)
            }
        )
        let htp = (matches.length > 0) ? matches[0] : { heroAdditionalSkill: 0 }
        hero.playerAdjustedSkill = hero.skill + htp.heroAdditionalSkill
        return hero.playerAdjustedSkill
    }

    render() {
        let buttonElement = <></>

        if (this.state.mission != null) {
            buttonElement = <td>Currently on mission: {this.state.mission.name}</td>
        } else {
            if (this.props.isAssigning) {
                buttonElement = <td><button onClick={() => this.props.assignHeroClicked(this.props.hero)}>Assign hero</button></td>
            }
        }

        return (
            <>
                <td>{this.props.hero.name}</td>
                <td>{this.applyAdjustedHeroSkill(this.props.hero)}</td>
                <td>{this.props.hero.hireCost} coins</td>
                {buttonElement}
            </>
        )
    }
}

class SelectedMission extends Component {

    handleCancelClick(event) {
        this.props.doneAssignHeroesClicked()
        event.preventDefault()
    }

    handleRemoveClicked(hero, event) {
        this.props.removeHeroClicked(hero)
        event.preventDefault()
    }

    handleBeginMissionClick(event) {
        let heroIds = []
        this.props.assignedHeroes.forEach(hero => {
            heroIds.push(hero.id)
        })

        fetch(`${missionUri}/startMission/${this.props.selectedMission.id}?playerId=${this.props.player.id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(heroIds)
        })
            .then(res => res.json())
            .then(() => {
                this.props.doneAssignHeroesClicked()
                },
                (error) => {
                    this.setState({
                        error
                    });
                })

        event.preventDefault()
    }

    render() {
        let currentSkill = 0
        this.props.assignedHeroes.forEach((hero) => {
            currentSkill += hero.playerAdjustedSkill
        })

        const assignedHeroesItems = this.props.assignedHeroes.map((hero) =>
            <tr key={hero.id}>
                <td>{hero.name}</td>
                <td>{hero.playerAdjustedSkill} skill</td>
                <td><button onClick={(e) => this.handleRemoveClicked(hero, e)}>Remove</button></td>
            </tr>
        )

        let mainBody = null

        if (this.props.selectedMission !== null) {
            let beginMissionButton = null
            if (currentSkill >= this.props.selectedMission.skillCost) {
                beginMissionButton =
                    <>
                        < br />
                        <button onClick={(e) => this.handleBeginMissionClick(e)}>Begin Mission</button>
                    </>
            } else {
                beginMissionButton = <></>
            }

            mainBody = 
                <>
                <b>Mission: {this.props.selectedMission.name}</b>
                <br /><br />
                Skill: {currentSkill} / { this.props.selectedMission.skillCost}
                <br /><br />
                <b>Heroes on Mission</b>
                <br /><br />
                <table>
                    <tbody id="assigned_heroes">
                        {assignedHeroesItems.length > 0 ? assignedHeroesItems : <tr><td>Waiting for heroes to be assigned...</td></tr>}
                    </tbody>
                </table>
                {beginMissionButton}
                <br />
                <button onClick={(e) => this.handleCancelClick(e)}>Cancel</button>
                </>

        } else {
            mainBody = <></>
        }


        return (
            <div className={`panel box-shadow fadeIn ${this.props.displayed ? '' : 'fadeOut'}`}>
                {mainBody}
            </div>
        )
    }
}