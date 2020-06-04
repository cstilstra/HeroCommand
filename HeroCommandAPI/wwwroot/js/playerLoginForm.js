const playerUri = 'api/Players'

class PlayerLogin extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            players: []
        }

        this.playerAdded = this.playerAdded.bind(this)
    }

    playerAdded() {
        this.refreshPlayers()
    }

    componentDidMount() {
        this.refreshPlayers()
    }

    refreshPlayers() {
        fetch(playerUri)
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        players: data
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, players } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else {
            return (
                <div>
                    <CreatePlayer name="Player Name" playerAdded={this.playerAdded}/>
                    <br />
                    <ExistingPlayers players={players} />                    
                </div>
            )
        }            
    }
}

class ExistingPlayers extends React.Component {   
    render() {
        const playersItems = this.props.players.map((player) =>
            <tr key={player.id}>           
                <td>
                    <button onClick={() => setPlayerIdToSessionData(player.id)}>
                        {player.name}, level {player.level}
                    </button>
                </td>
            </tr>
        );

        return (
            <div className="panel">

                <h4>Existing Players</h4>
                
                <table>
                    <tbody id="existingPlayersForm">
                        {playersItems.length>0 ? playersItems : <tr><td>Searching for players...</td></tr>}
                    </tbody>
                </table>
            </div>
        )
    }
}

function setPlayerIdToSessionData(playerId) {
    console.log(`you've chosen player id: ${playerId}`)
    sessionStorage.setItem("playerId", playerId)
    window.location.href = '/player.html'
}

class CreatePlayer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.name
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    playerAdded() {
        this.props.playerAdded()
    }

    handleChange(event) {
        this.setState({ name: event.target.value })
    }

    handleSubmit(event) {
        const player = {
            name: this.state.name,
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
                this.setState({name: 'Player Name'})
                console.log(`${player.name} created`)
                this.playerAdded()
            })
            .catch(error => console.error('Unable to add item.', error));

        event.preventDefault()
    }

    render() {
        return (
            <div className="panel">
                <h4>New Player</h4>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.name} onChange={this.handleChange} />
                    <input type="submit" value="Create player"/>
                </form>
            </div>
        )
    }
}


const domContainer = document.querySelector('#player_login_form');
ReactDOM.render(React.createElement(PlayerLogin), domContainer);