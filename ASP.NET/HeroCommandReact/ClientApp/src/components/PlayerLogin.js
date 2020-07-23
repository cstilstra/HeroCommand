import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { CreatePlayer } from './CreatePlayer'

const playerUri = 'api/Players'

export class PlayerLogin extends Component{
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            players: []
        }

        this.refreshPlayers = this.refreshPlayers.bind(this)
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
                    <CreatePlayer isAdmin={false}
                        updatePlayers={this.refreshPlayers} />
                    <br />
                    <ExistingPlayers players={players} />                    
                </div>
            )
        }            
    }
}

class ExistingPlayers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toGameplay: false
        }
    }

    setPlayerIdToSessionData(playerId) {
        sessionStorage.setItem("playerId", playerId)
        this.setState({
            toGameplay: true
        });
        //window.location.href = '/player.html'        
    }

    render() {
        if (this.state.toGameplay === true) {
            return <Redirect to='/gameplay' push={true} />
        } else {


            const playersItems = this.props.players.map((player) =>
                <tr key={player.id}>
                    <td>
                        <button onClick={() => this.setPlayerIdToSessionData(player.id)}>
                            {player.name}, level {player.level}
                        </button>
                    </td>
                </tr>
            );

            return (
                <div className="panel">

                    <h4>Existing Players</h4>
                    <p>{playersItems.length} players found</p>
                    <table>
                        <tbody id="existing_players">
                            {playersItems.length > 0 ? playersItems : <tr><td>Searching for players...</td></tr>}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}