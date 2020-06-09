const playerUri = 'api/Players'
const heroUri = 'api/Heroes'
const missionUri = 'api/Missions'

class Gameplay extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            playerId: sessionStorage.getItem('playerId'),
            isLoaded: false,
            player: null
        }
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

    render() {
        if (this.state.isLoaded) {
            return (
                <div>
                    <CurrentPlayer player={this.state.player} />
                    <br />
                    <AvailableMissions player={this.state.player} />
                    <br />
                    <AvailableHeroes player={this.state.player} />                    
                </div>
            )
        } else {
            return (
                <div>
                    Fetching game data...
                </div>    
            )
        }
    }
}

class CurrentPlayer extends React.Component {
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

class AvailableHeroes extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            player: this.props.player,
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

    getAdjustedHeroSkill(hero) {
        let matches = this.state.heroesToPlayer.filter(
            function (element) {
                return (element.heroId == hero.id)
            }
        )
        let htp = (matches.length > 0) ? matches[0] : { heroAdditionalSkill: 0 }
        return hero.skill + htp.heroAdditionalSkill
    }

    render() {
        const heroesItems = this.state.heroes.map((hero) =>
            <tr key={hero.id}>
                <td>{hero.name}</td>
                <td>{this.getAdjustedHeroSkill(hero)}</td>
                <td>{hero.hireCost} coins</td>
            </tr>
        )

        return (
            <div className = "panel" >
                <b>Heroes for Hire</b>
                <br />
                <table>
                    <tbody id="existingHeroesForm">
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

class AvailableMissions extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            player: this.props.player,
            missions: []
        }
    }

    componentDidMount() {
        this.refreshMissions()
    }

    refreshMissions() {
        fetch(`${missionUri}/visibleByLevel/${this.state.player.level}`)
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        missions: data
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

    render() {
        const missionsItems = this.state.missions.map((mission) =>
            <tr key={mission.id}>
                <td>{mission.name}</td>
                <td>{mission.skillCost} skill required</td>
                <td>{mission.reward} coins for completion</td>
            </tr>
        )

        return (
            <div className="panel" >
                <b>Missions Available</b>
                <br />
                <table>
                    <tbody id="existingHeroesForm">
                        <tr>
                            <th>Name</th>
                            <th>Skill Requirement</th>
                            <th>Reward</th>
                        </tr>
                        {missionsItems.length > 0 ? missionsItems : <tr><td>Searching for missions...</td></tr>}
                    </tbody>
                </table>
            </div>
        )
    }
}

const domContainer = document.querySelector('#main_play_form');
ReactDOM.render(React.createElement(Gameplay), domContainer);