const heroUri = 'api/Heroes'
const missionUri = 'api/Missions';
const playerUri = 'api/Players' 

class AdminControl extends React.Component {
    render() {
        return (
            <div>
                <HeroControl />
                <br />
                <MissionControl />
                <br />
                <PlayerControl />
            </div>
        )
    }
}

class HeroControl extends React.Component {
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
                <CreateHero name="Hero Name" hireCost="1" skill="1" playerLevelVisible="1" updateHeroes={this.updateHeroes} />
                <br />
                <ExistingHeroes heroes={this.state.heroes} updateHeroes={this.updateHeroes}/>
            </div>
        )
    }
}

class ExistingHeroes extends React.Component {
    constructor(props) {
        super(props)

        this.handleDelete = this.handleDelete.bind(this)
    }

    updateHeroes() {
        this.props.updateHeroes()
    }

    handleDelete(id, event) {
        console.log(`Delete Hero, id: ${id}`)

        fetch(`${heroUri}/${id}`, {
            method: 'DELETE'
        })
            .then(() => this.updateHeroes())
            .catch(error => console.error('Unable to delete item.', error));
        event.preventDefault()
    }

    render() {
        const heroesItems = this.props.heroes.map((hero) =>
            <tr key={hero.id}>
                <td>{hero.id}</td>
                <td>{hero.name}</td>
                <td>{hero.skill}</td>
                <td>{hero.hireCost} coins</td>
                <td>{hero.playerLevelVisible}</td>
                <td><button onClick={(e) => this.handleDelete(hero.id, e)}>Delete</button></td>
            </tr>
        );

        return (
            <div>
                <h4>Existing Heroes</h4>
                <p>{heroesItems.length} heroes found</p>
                <table>
                    <tbody id="existingHeroesForm"> 
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Skill</th>
                            <th>Hire Cost</th>
                            <th>Level Visible</th>
                            <th />
                        </tr>
                        {heroesItems.length > 0 ? heroesItems : <tr><td>Searching for heroes...</td></tr>}
                    </tbody>
                </table>
            </div>
        )        
    }
}

class CreateHero extends React.Component {
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

    handleNameChange() {
        this.setState({ name: event.target.value })
    }

    handleHireCostChange() {
        this.setState({ hireCost: event.target.value })
    }

    handleSkillChange() {
        this.setState({ skill: event.target.value })
    }

    handlePlayerLevelVisibleChange() {
        this.setState({ playerLevelVisible: event.target.value })
    }

    handleSubmit() {
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

class MissionControl extends React.Component {
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
                <CreateMission name="Mission Name" skillCost="1" reward="1" durationMs="1000" playerLevelVisible="1" updateMissions={this.updateMissions} />
                <br />
                <ExistingMissions missions={this.state.missions} updateMissions={this.updateMissions} />
            </div>
        )
    }
}

class ExistingMissions extends React.Component {
    constructor(props) {
        super(props)

        this.handleDelete = this.handleDelete.bind(this)
    }

    updateMissions() {
        this.props.updateMissions()
    }

    handleDelete(id, event) {
        console.log(`Delete Mission, Id: ${id}`)

        fetch(`${missionUri}/${id}`, {
            method: 'DELETE'
        })
            .then(() => this.updateMissions())
            .catch(error => console.error('Unable to delete item.', error));
        event.preventDefault()
    }

    render() {
        const missionsItems = this.props.missions.map((mission) =>
            <tr key={mission.id}>
                <td>{mission.id}</td>
                <td>{mission.name}</td>
                <td>{mission.skillCost} skill</td>
                <td>{mission.reward} coins</td>
                <td>{mission.durationMs} ms</td>
                <td>{mission.playerLevelVisible}</td>
                <td><button onClick={(e) => this.handleDelete(mission.id, e)}>Delete</button></td>
            </tr>
        );

        return (
            <div>
                <h4>Existing Missions</h4>
                <p>{missionsItems.length} missions found</p>
                <table>
                    <tbody id="existingMissionsForm">
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Skill Cost</th>
                            <th>Reward</th>
                            <th>Duration</th>
                            <th>Level Visible</th>
                            <th />
                        </tr>
                        {missionsItems.length > 0 ? missionsItems : <tr><td>Searching for missions...</td></tr>}
                    </tbody>
                </table>
            </div>
        )        
    }
}

class CreateMission extends React.Component {
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

    handleNameChange() {
        this.setState({ name: event.target.value })
    }

    handleSkillCostChange() {
        this.setState({ skillCost: event.target.value })
    }

    handleRewardChange() {
        this.setState({ reward: event.target.value })
    }

    handleDurationMsChange() {
        this.setState({ durationMs: event.target.value })
    }

    handlePlayerLevelVisibleChange() {
        this.setState({ playerLevelVisible: event.target.value })
    }

    handleSubmit() {
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

class PlayerControl extends React.Component {
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
                <CreatePlayer name="Player Name" level="1" coin="0" missionsSinceUpgrade="0" updatePlayers={this.updatePlayers} />
                <br />
                <ExistingPlayers players={this.state.players} updatePlayers={this.updatePlayers}/>
            </div>
        )
    }
}

class ExistingPlayers extends React.Component {
    constructor(props) {
        super(props)

        this.handleDelete = this.handleDelete.bind(this)
    }

    updatePlayers() {
        this.props.updatePlayers()
    }

    handleDelete(id, event) {
        console.log(`Delete Player, Id: ${id}`)

        fetch(`${playerUri}/${id}`, {
            method: 'DELETE'
        })
            .then(() => this.updatePlayers())
            .catch(error => console.error('Unable to delete item.', error));
        event.preventDefault()
    }

    render() {
        const playersItems = this.props.players.map((player) =>
            <tr key={player.id}>
                <td>{player.id}</td>
                <td>{player.name}</td>
                <td>{player.level}</td>
                <td>{player.coin} coins</td>
                <td>{player.missionsSinceUpgrade}/5</td>
                <td><button onClick={(e) => this.handleDelete(player.id, e)}>Delete</button></td>
            </tr>
        );

        return (
            <div>
                <h4>Existing Players</h4>
                <p>{playersItems.length} players found</p>
                <table>
                    <tbody id="existingPlayersForm">
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

class CreatePlayer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.name,
            level: props.level,
            coin: props.coin,
            missionsSinceUpgrade: props.missionsSinceUpgrade
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleLevelChange = this.handleLevelChange.bind(this)
        this.handleCoinChange = this.handleCoinChange.bind(this)
        this.handleMissionsSinceUpgradeChange = this.handleMissionsSinceUpgradeChange.bind(this)
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

    handleMissionsSinceUpgradeChange() {
        this.setState({ missionsSinceUpgrade: event.target.value })
    }

    handleSubmit(event) {
        const player = {
            name: this.state.name,
            level: parseInt(this.state.level, 10),
            coin: parseInt(this.state.coin, 10),
            missionsSinceUpgrade: parseInt(this.state.missionsSinceUpgrade, 10)
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
                this.setState({
                    name: props.name,
                    level: props.level,
                    coin: props.coin,
                    missionsSinceUpgrade: props.missionsSinceUpgrade
                })
                console.log(`${player.name} created`)
                this.updatePlayers()
            })
            .catch(error => console.error('Unable to add item.', error));

        event.preventDefault()
    }

    render() {
        return (
            <div>
                <h4>New Player</h4>
                <form onSubmit={this.handleSubmit}>
                    <label>Name</label>
                    <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                    <br />
                    <label>Level</label>
                    <input type="text" value={this.state.level} onChange={this.handleLevelChange} />
                    <br />
                    <label>Coin</label>
                    <input type="text" value={this.state.coin} onChange={this.handleCoinChange} />
                    <br />
                    <label>Missions Since Upgrade</label>
                    <input type="text" value={this.state.missionsSinceUpgrade} onChange={this.handleMissionsSinceUpgradeChange} />
                    <br />
                    <input type="submit" value="Create player" />
                </form>
            </div>
        )
    }
}

const domContainer = document.querySelector('#admin_control_form');
ReactDOM.render(React.createElement(AdminControl), domContainer);