import React, { Component } from 'react'

const missionUri = 'api/Missions'

export class AvailableMissions extends Component {
    constructor(props) {
        super(props)

        this.state = {
            player: this.props.player,
            assignHeroesClicked: this.props.assignHeroesClicked,
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
                (error) => {
                    this.setState({
                        error
                    });
                })
    }

    render() {
        const missionsItems = this.state.missions.map((mission) =>
            <tr key={mission.id}>
                <AvailableMission mission={mission} player={this.state.player} assignHeroesClicked={this.state.assignHeroesClicked} />
            </tr>
        )

        return (
            <div className="panel" >
                <b>Missions Available</b>
                <br />
                <table>
                    <tbody id="existing_missions">
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

class AvailableMission extends Component {
    constructor(props) {
        super(props)

        this.state = {
            mission: this.props.mission,
            player: this.props.player,
            assignHeroesClicked: this.props.assignHeroesClicked,
        }
    }

    componentDidMount() {
        this.updateMissionStatus()
    }

    updateMissionStatus() {
        fetch(`${missionUri}/tryEndMission/${this.state.mission.id}?playerId=${this.state.player.id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => this.handleMissionUnderway(this.state.mission, res))
    }

    handleMissionUnderway(mission, res) {
        // try to convert res to date
        var finishesAt = new Date(res)

        mission.response = res
        this.setState({ mission: mission})
    }

    handleAssignHeroes(mission, event) {
        this.state.assignHeroesClicked(mission)
        event.preventDefault()
    }

    render() {
        return (
            <>
                <td>{this.state.mission.name}</td>
                <td>{this.state.mission.skillCost} skill required</td>
                <td>{this.state.mission.reward} coins for completion</td>
                <td><button onClick={(e) => this.handleAssignHeroes(this.state.mission, e)}>Assign Heroes</button></td>
                <td><CountdownTimer endTime={this.state.mission.response} /></td>
            </>
        )
    }
}

function CountdownTimer(props) {
    const calculateTimeLeft = () => {
        const difference = new Date(props.endTime) - new Date();
        let timeLeft = Math.floor(difference / 1000)
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());

    React.useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
    });

    if (isNaN(timeLeft)) {
        return (
            <div>
                {props.endTime}
            </div>
        )
    }

    return (
        <div>
            {timeLeft} seconds until mission complete
        </div>
    );
}