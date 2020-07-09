import React, { Component } from 'react';
import { CreatePlayer } from './CreatePlayer';

const heroUri = 'api/Heroes'
const missionUri = 'api/Missions';
const playerUri = 'api/Players' 

export class AdminControl extends Component {
    render() {
        return (
            <div>
                <h4>Admin Controls</h4>
                <br />
                <HeroControl />
                <br />
                <MissionControl />
                <br />
                <PlayerControl />
            </div>
        )
    }
}

class HeroControl extends Component {
    constructor(props) {
        super(props)
        this.state = {
            heroes: [],
            error: ''
        }

        this.updateHeroes = this.updateHeroes.bind(this)
    }

    componentDidMount() {
        this.updateHeroes()
    }

    updateHeroes() {
        fetch(heroUri)
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        heroes: data
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }

    render() {
        return (
            <div className="panel">
                <h4>Heroes</h4>
                <br />
                <CreateHero name="Hero Name"
                    hireCost="1"
                    skill="1"
                    playerLevelVisible="1"
                    updateHeroes={this.updateHeroes} />
                <br />
                <ExistingHeroes heroes={this.state.heroes}
                    updateHeroes={this.updateHeroes} />
            </div>
        )
    }
}

class ExistingHeroes extends Component {
    updateHeroes() {
        this.props.updateHeroes()
    }

    render() {
        const heroesItems = this.props.heroes.map((hero) => 
            <tr key={hero.id}>
                <ExistingHeroRow id={hero.id}
                    name={hero.name}
                    skill={hero.skill}
                    hireCost={hero.hireCost}
                    playerLevelVisible={hero.playerLevelVisible}
                    updateHeroes={this.props.updateHeroes} />
            </tr>
        );

        return (
            <div>
                <h4>Existing Heroes</h4>
                <p>{heroesItems.length} heroes found</p>
                <table>
                    <tbody id="existing_heroes"> 
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Skill</th>
                            <th>Hire Cost</th>
                            <th>Level Visible</th>
                        </tr>
                        {heroesItems.length > 0 ? heroesItems : <tr><td>Searching for heroes...</td></tr>}
                    </tbody>
                </table>
            </div>
        )        
    }
}

class ExistingHeroRow extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isEditing: false,
            buttonText: 'Edit',
            name: this.props.name,
            skill: this.props.skill,
            hireCost: this.props.hireCost,
            playerLevelVisible: this.props.playerLevelVisible
        }

        this.handleEditSaveButtonClick = this.handleEditSaveButtonClick.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleHireCostChange = this.handleHireCostChange.bind(this)
        this.handleSkillChange = this.handleSkillChange.bind(this)
        this.handlePlayerLevelVisibleChange = this.handlePlayerLevelVisibleChange.bind(this)
    }

    initialState() {
        this.setState({
            isEditing: false,
            buttonText: 'Edit',
            name: this.props.name,
            skill: this.props.skill,
            hireCost: this.props.hireCost,
            playerLevelVisible: this.props.playerLevelVisible
        })
    }

    updateHeroes() {
        this.props.updateHeroes()
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value })
    }

    handleHireCostChange(event) {
        this.setState({ hireCost: event.target.value })
    }

    handleSkillChange(event) {
        this.setState({ skill: event.target.value })
    }

    handlePlayerLevelVisibleChange(event) {
        this.setState({ playerLevelVisible: event.target.value })
    }

    handleEditSaveButtonClick(event) {
        if (this.state.isEditing) {
            const hero = {
                id: this.props.id,
                name: this.state.name,
                skill: parseInt(this.state.skill, 10),
                hireCost: parseInt(this.state.hireCost, 10),
                playerLevelVisible: parseInt(this.state.playerLevelVisible, 10)
            }

            fetch(`${heroUri}/${hero.id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(hero)
            })
                .then(() => {
                    console.log(`${hero.name} updated`)
                    this.updateHeroes()
                })
                .catch(error => console.error('Unable to update item.', error));

            this.setState({
                isEditing: false,
                buttonText:'Edit'
            })
        } else {
            this.setState({
                isEditing: true,
                buttonText: 'Save'
            })
        }

        event.preventDefault()
    }

    handleDelete(event) {
        console.log(`Delete Hero, id: ${this.props.id}`)

        fetch(`${heroUri}/${this.props.id}`, {
            method: 'DELETE'
        })
            .then(() => this.updateHeroes())
            .catch(error => console.error('Unable to delete item.', error));
        event.preventDefault()
    }

    handleCancel(event) {
        this.initialState()
        event.preventDefault()
    }

    render() {
        if (this.state.isEditing) {
            return(
                <>
                    <td>{this.props.id}</td>
                    <td><input type="text" value={this.state.name} onChange={this.handleNameChange} /></td>
                    <td><input type="text" value={this.state.skill} onChange={this.handleSkillChange} /></td>
                    <td><input type="text" value={this.state.hireCost} onChange={this.handleHireCostChange} /></td>
                    <td><input type="text" value={this.state.playerLevelVisible} onChange={this.handlePlayerLevelVisibleChange} /></td>
                    <td><button onClick={(e) => this.handleCancel(e)}>Cancel</button></td>
                    <td><button onClick={(e) => this.handleEditSaveButtonClick(e)}>{this.state.buttonText}</button></td>
                    <td><button onClick={(e) => this.handleDelete(e)}>Delete</button></td>
                </>
            )
        } else {
            return (            
                <>
                    <td>{this.props.id}</td>
                    <td>{this.state.name}</td>
                    <td>{this.state.skill}</td>
                    <td>{this.state.hireCost} coins</td>
                    <td>{this.state.playerLevelVisible}</td>
                    <td><button onClick={(e) => this.handleEditSaveButtonClick(e)}>{this.state.buttonText}</button></td>
                    <td><button onClick={(e) => this.handleDelete(e)}>Delete</button></td>
                </>
            )
        }
    }
}

class CreateHero extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.name,
            hireCost: this.props.hireCost,
            skill: this.props.skill,
            playerLevelVisible: this.props.playerLevelVisible
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleHireCostChange = this.handleHireCostChange.bind(this)
        this.handleSkillChange = this.handleSkillChange.bind(this)
        this.handlePlayerLevelVisibleChange = this.handlePlayerLevelVisibleChange.bind(this)
    }

    updateHeroes() {
        this.props.updateHeroes()
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value })
    }

    handleHireCostChange(event) {
        this.setState({ hireCost: event.target.value })
    }

    handleSkillChange(event) {
        this.setState({ skill: event.target.value })
    }

    handlePlayerLevelVisibleChange(event) {
        this.setState({ playerLevelVisible: event.target.value })
    }

    handleSubmit(event) {
        const hero = {
            name: this.state.name,
            hireCost: parseInt(this.state.hireCost, 10),
            skill: parseInt(this.state.skill, 10),
            playerLevelVisible: parseInt(this.state.playerLevelVisible, 10)
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
                this.setState({
                    name: this.props.name,
                    hireCost: this.props.hireCost,
                    skill: this.props.skill,
                    playerLevelVisible: this.props.playerLevelVisible
                })
                console.log(`${hero.name} created`)
                this.updateHeroes()
            })
            .catch(error => console.error('Unable to add item.', error));

        event.preventDefault()
    }    

    render() {
        return (
            <div>
                <h4>New Hero</h4>
                <form onSubmit={this.handleSubmit}>
                    <label>Name</label>
                    <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                    <br />
                    <label>Hire Cost</label>
                    <input type="text" value={this.state.hireCost} onChange={this.handleHireCostChange} />
                    <br />
                    <label>Skill</label>
                    <input type="text" value={this.state.skill} onChange={this.handleSkillChange} />
                    <br />
                    <label>Player Level Visible</label>
                    <input type="text" value={this.state.playerLevelVisible} onChange={this.handlePlayerLevelVisibleChange} />
                    <br />
                    <input type="submit" value="Create hero" />
                </form>
            </div>
        )
    }
}

class MissionControl extends Component {
    constructor(props) {
        super(props)
        this.state = {
            missions: [],
            error: ''
        }

        this.updateMissions = this.updateMissions.bind(this)
    }

    componentDidMount() {
        this.updateMissions()
    }

    updateMissions() {
        fetch(missionUri)
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        missions: data
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }

    render() {
        return (
            <div className="panel">
                <h4>Missions</h4>
                <br />
                <CreateMission name="Mission Name"
                    skillCost="1"
                    reward="1"
                    durationMs="1000"
                    playerLevelVisible="1"
                    updateMissions={this.updateMissions} />
                <br />
                <ExistingMissions missions={this.state.missions} updateMissions={this.updateMissions} />
            </div>
        )
    }
}

class ExistingMissions extends Component {

    updateMissions() {
        this.props.updateMissions()
    }

    render() {
        const missionsItems = this.props.missions.map((mission) =>
            <tr key={mission.id}>
                <ExistingMissionRow
                    id={mission.id} name={mission.name}
                    skillCost={mission.skillCost}
                    reward={mission.reward}
                    durationMs={mission.durationMs}
                    playerLevelVisible={mission.playerLevelVisible}
                    updateMissions={this.props.updateMissions}
                />
            </tr>
        );

        return (
            <div>
                <h4>Existing Missions</h4>
                <p>{missionsItems.length} missions found</p>
                <table>
                    <tbody id="existing_missions">
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Skill Cost</th>
                            <th>Reward</th>
                            <th>Duration</th>
                            <th>Level Visible</th>
                        </tr>
                        {missionsItems.length > 0 ? missionsItems : <tr><td>Searching for missions...</td></tr>}
                    </tbody>
                </table>
            </div>
        )        
    }
}

class ExistingMissionRow extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isEditing: false,
            buttonText: 'Edit',
            name: this.props.name,
            skillCost: this.props.skillCost,
            reward: this.props.reward,
            durationMs: this.props.durationMs,
            playerLevelVisible: this.props.playerLevelVisible
        }

        this.handleEditSaveButtonClick = this.handleEditSaveButtonClick.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleSkillCostChange = this.handleSkillCostChange.bind(this)
        this.handleRewardChange = this.handleRewardChange.bind(this)
        this.handleDurationMsChange = this.handleDurationMsChange.bind(this)
        this.handlePlayerLevelVisibleChange = this.handlePlayerLevelVisibleChange.bind(this)
    }

    initialState() {
        this.setState({
            isEditing: false,
            buttonText: 'Edit',
            name: this.props.name,
            skillCost: this.props.skillCost,
            reward: this.props.reward,
            durationMs: this.props.durationMs,
            playerLevelVisible: this.props.playerLevelVisible
        })
    }

    updateMissions() {
        this.props.updateMissions()
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value })
    }

    handleRewardChange(event) {
        this.setState({ reward: event.target.value })
    }

    handleSkillCostChange(event) {
        this.setState({ skillCost: event.target.value })
    }

    handleDurationMsChange(event) {
        this.setState({ durationMs: event.target.value})
    }

    handlePlayerLevelVisibleChange(event) {
        this.setState({ playerLevelVisible: event.target.value })
    }

    handleEditSaveButtonClick(event) {
        if (this.state.isEditing) {
            const mission = {
                id: this.props.id,
                name: this.state.name,
                skillCost: parseInt(this.state.skillCost, 10),
                reward: parseInt(this.state.reward, 10),
                durationMs: parseInt(this.state.durationMs, 10),
                playerLevelVisible: parseInt(this.state.playerLevelVisible, 10)
            }

            fetch(`${missionUri}/${mission.id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(mission)
            })
                .then(() => {
                    console.log(`${mission.name} updated`)
                    this.updateMissions()
                })
                .catch(error => console.error('Unable to update item.', error));

            this.setState({
                isEditing: false,
                buttonText: 'Edit'
            })
        } else {
            this.setState({
                isEditing: true,
                buttonText: 'Save'
            })
        }

        event.preventDefault()
    }

    handleDelete(event) {
        console.log(`Delete Mission, id: ${this.props.id}`)

        fetch(`${missionUri}/${this.props.id}`, {
            method: 'DELETE'
        })
            .then(() => this.updateMissions())
            .catch(error => console.error('Unable to delete item.', error));
        event.preventDefault()
    }

    handleCancel(event) {
        this.initialState()
        event.preventDefault()
    }

    render() {
        if (this.state.isEditing) {
            return (
                <>
                    <td>{this.props.id}</td>
                    <td><input type="text" value={this.state.name} onChange={this.handleNameChange} /></td>
                    <td><input type="text" value={this.state.skillCost} onChange={this.handleSkillCostChange} /></td>
                    <td><input type="text" value={this.state.reward} onChange={this.handleRewardChange} /></td>
                    <td><input type="text" value={this.state.durationMs} onChange={this.handleDurationMsChange} /></td>
                    <td><input type="text" value={this.state.playerLevelVisible} onChange={this.handlePlayerLevelVisibleChange} /></td>
                    <td><button onClick={(e) => this.handleCancel(e)}>Cancel</button></td>
                    <td><button onClick={(e) => this.handleEditSaveButtonClick(e)}>{this.state.buttonText}</button></td>
                    <td><button onClick={(e) => this.handleDelete(e)}>Delete</button></td>
                </>
            )
        } else {
            return (
                <>
                    <td>{this.props.id}</td>
                    <td>{this.state.name}</td>
                    <td>{this.state.skillCost} skill</td>
                    <td>{this.state.reward} coins</td>
                    <td>{this.state.durationMs} ms</td>
                    <td>{this.state.playerLevelVisible}</td>
                    <td><button onClick={(e) => this.handleEditSaveButtonClick(e)}>{this.state.buttonText}</button></td>
                    <td><button onClick={(e) => this.handleDelete(e)}>Delete</button></td>
                </>
            )
        }
    }
}

class CreateMission extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.name,
            skillCost: this.props.skillCost,
            reward: this.props.reward,
            durationMs: this.props.durationMs,
            playerLevelVisible: this.props.playerLevelVisible
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleSkillCostChange = this.handleSkillCostChange.bind(this)
        this.handleRewardChange = this.handleRewardChange.bind(this)
        this.handleDurationMsChange = this.handleDurationMsChange.bind(this)
        this.handlePlayerLevelVisibleChange = this.handlePlayerLevelVisibleChange.bind(this)
    }

    updateMissions() {
        this.props.updateMissions()
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value })
    }

    handleSkillCostChange(event) {
        this.setState({ skillCost: event.target.value })
    }

    handleRewardChange(event) {
        this.setState({ reward: event.target.value })
    }

    handleDurationMsChange(event) {
        this.setState({ durationMs: event.target.value })
    }

    handlePlayerLevelVisibleChange(event) {
        this.setState({ playerLevelVisible: event.target.value })
    }

    handleSubmit(event) {
        const mission = {
            name: this.state.name,
            skillCost: parseInt(this.state.skillCost, 10),
            reward: parseInt(this.state.reward, 10),
            durationMs: parseInt(this.state.durationMs, 10),
            playerLevelVisible: parseInt(this.state.playerLevelVisible, 10)
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
                this.setState({
                    name: this.props.name,
                    skillCost: this.props.skillCost,
                    reward: this.props.reward,
                    durationMs: this.props.durationMs,
                    playerLevelVisible: this.props.playerLevelVisible
                })
                console.log(`${mission.name} created`)
                this.updateMissions()
            })
            .catch(error => console.error('Unable to add item.', error));

        event.preventDefault()
    }

    render() {
        return (
            <div>
                <h4>New Mission</h4>
                <form onSubmit={this.handleSubmit}>
                    <label>Name</label>
                    <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                    <br />
                    <label>Skill Cost</label>
                    <input type="text" value={this.state.skillCost} onChange={this.handleSkillCostChange} />
                    <br />
                    <label>Reward</label>
                    <input type="text" value={this.state.reward} onChange={this.handleRewardChange} />
                    <br />
                    <label>Duration (ms)</label>
                    <input type="text" value={this.state.durationMs} onChange={this.handleDurationMsChange} />
                    <br />
                    <label>Player Level Visible</label>
                    <input type="text" value={this.state.playerLevelVisible} onChange={this.handlePlayerLevelVisibleChange} />
                    <br />
                    <input type="submit" value="Create mission" />
                </form>
            </div>
        )
    }
}

class PlayerControl extends Component {
    constructor(props) {
        super(props)
        this.state = {
            players: [],
            state: ''
        }

        this.updatePlayers = this.updatePlayers.bind(this)
    }

    componentDidMount() {
        this.updatePlayers()
    }

    updatePlayers() {
        fetch(playerUri)
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        players: data
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        error
                    })
                }
            )
    }

    render() {
        return (
            <div className="panel">
                <h4>Players</h4>
                <br />
                <CreatePlayer isAdmin={true}
                    updatePlayers={this.updatePlayers} />
                <br />
                <ExistingPlayers players={this.state.players}
                    updatePlayers={this.updatePlayers} />
            </div>
        )
    }
}

class ExistingPlayers extends Component {

    updatePlayers() {
        this.props.updatePlayers()
    }

    render() {
        const playersItems = this.props.players.map((player) =>
            <tr key={player.id}>
                <ExistingPlayerRow
                    id={player.id}
                    name={player.name}
                    level={player.level}
                    coin={player.coin}
                    missionsSinceUpgrade={player.missionsSinceUpgrade}
                    updatePlayers={this.props.updatePlayers}
                />
            </tr>
        );

        return (
            <div>
                <h4>Existing Players</h4>
                <p>{playersItems.length} players found</p>
                <table>
                    <tbody id="existing_players">
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Level</th>
                            <th>Coin</th>
                            <th>Experience</th>
                            <th />
                        </tr>
                        {playersItems.length > 0 ? playersItems : <tr><td>Searching for players...</td></tr>}
                    </tbody>
                </table>
            </div>
        )
        
    }
}

class ExistingPlayerRow extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isEditing: false,
            buttonText: 'Edit',
            name: this.props.name,
            level: this.props.level,
            coin: this.props.coin,
            missionsSinceUpgrade: this.props.missionsSinceUpgrade
        }

        this.handleEditSaveButtonClick = this.handleEditSaveButtonClick.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleLevelChange = this.handleLevelChange.bind(this)
        this.handleCoinChange = this.handleCoinChange.bind(this)
        this.handleMissionsSinceUpgradeChange = this.handleMissionsSinceUpgradeChange.bind(this)
    }

    initialState() {
        this.setState({
            isEditing: false,
            buttonText: 'Edit',
            name: this.props.name,
            level: this.props.level,
            coin: this.props.coin,
            missionsSinceUpgrade: this.props.missionsSinceUpgrade
        })
    }

    updatePlayers() {
        this.props.updatePlayers()
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value })
    }

    handleLevelChange(event) {
        this.setState({ level: event.target.value })
    }

    handleCoinChange(event) {
        this.setState({ coin: event.target.value })
    }

    handleMissionsSinceUpgradeChange(event) {
        this.setState({ missionsSinceUpgrade: event.target.value })
    }

    handleEditSaveButtonClick(event) {
        if (this.state.isEditing) {
            const player = {
                id: this.props.id,
                name: this.state.name,
                level: parseInt(this.state.level, 10),
                coin: parseInt(this.state.coin, 10),
                missionsSinceUpgrade: parseInt(this.state.missionsSinceUpgrade, 10)
            }

            fetch(`${playerUri}/${player.id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(player)
            })
                .then(() => {
                    console.log(`${player.name} updated`)
                    this.updatePlayers()
                })
                .catch(error => console.error('Unable to update item.', error));

            this.setState({
                isEditing: false,
                buttonText: 'Edit'
            })
        } else {
            this.setState({
                isEditing: true,
                buttonText: 'Save'
            })
        }

        event.preventDefault()
    }

    handleDelete(event) {
        console.log(`Delete Player, id: ${this.props.id}`)

        fetch(`${playerUri}/${this.props.id}`, {
            method: 'DELETE'
        })
            .then(() => this.updatePlayers())
            .catch(error => console.error('Unable to delete item.', error));
        event.preventDefault()
    }

    handleCancel(event) {
        this.initialState()
        event.preventDefault()
    }

    render() {
        if (this.state.isEditing) {
            return (
                <>
                    <td>{this.props.id}</td>
                    <td><input type="text" value={this.state.name} onChange={this.handleNameChange} /></td>
                    <td><input type="text" value={this.state.level} onChange={this.handleLevelChange} /></td>
                    <td><input type="text" value={this.state.coin} onChange={this.handleCoinChange} /></td>
                    <td><input type="text" value={this.state.missionsSinceUpgrade} onChange={this.handleMissionsSinceUpgradeChange} /></td>
                    <td><button onClick={(e) => this.handleCancel(e)}>Cancel</button></td>
                    <td><button onClick={(e) => this.handleEditSaveButtonClick(e)}>{this.state.buttonText}</button></td>
                    <td><button onClick={(e) => this.handleDelete(e)}>Delete</button></td>
                </>
            )
        } else {
            return (
                <>
                    <td>{this.props.id}</td>
                    <td>{this.state.name}</td>
                    <td>{this.state.level}</td>
                    <td>{this.state.coin} coins</td>
                    <td>{this.state.missionsSinceUpgrade}/5</td>
                    <td><button onClick={(e) => this.handleEditSaveButtonClick(e)}>{this.state.buttonText}</button></td>
                    <td><button onClick={(e) => this.handleDelete(e)}>Delete</button></td>
                </>
            )
        }
    }
}