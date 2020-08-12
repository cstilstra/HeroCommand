import React, { Component } from 'react'

const playerUri = 'api/Players'

export class CreatePlayer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isAdmin: props.isAdmin,
            name: 'Player Name',
            level: 1,
            coin: 0,
            missionsSinceUpgrade: 0
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

    handleMissionsSinceUpgradeChange(event) {
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
                    name: this.props.name,
                    level: this.props.level,
                    coin: this.props.coin,
                    missionsSinceUpgrade: this.props.missionsSinceUpgrade
                })
                console.log(`${player.name} created`)
                this.updatePlayers()
            })
            .catch(error => console.error('Unable to add item.', error));

        event.preventDefault()
    }

    render() {
        if (this.state.isAdmin) {
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
        } else {
            return (
                <div className="panel box-shadow">
                    <h4>New Player</h4>
                    <form onSubmit={this.handleSubmit}>
                        <label>Name</label>
                        <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                        <br />
                        <input type="submit" value="Create player" />
                    </form>
                </div>
            )
        }
    }
}