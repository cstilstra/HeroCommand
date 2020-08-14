import React, { Component } from 'react'

const missionUri = 'api/Missions'
const missionComplete = 'Mission complete'
const missionNotUnderway = 'Mission not underway'

export class AvailableMissions extends Component {
    constructor(props) {
        super(props)

        this.state = {
            missions: [],
            doneTransitioningOut: false
        }
    }

    componentDidMount() {
        this.refreshMissions()
    }

    refreshMissions() {
        fetch(`${missionUri}/visibleByLevel/${this.props.player.level}`)
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
                    <AvailableMission
                        mission={mission}
                        player={this.props.player}
                        assignHeroesClicked={this.props.assignHeroesClicked}
                        missionCompleteCallback={this.props.missionCompleteCallback} />
                </tr>
            )

            return (
                <div className={`panel box-shadow fadeIn ${this.props.displayed ? '' : 'fadeOut'}`}>
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
            mission: this.props.mission
        }

        this.updateMissionStatus = this.updateMissionStatus.bind(this)
    }

    componentDidMount() {
        this.updateMissionStatus()
    }

    updateMissionStatus() {
        fetch(`${missionUri}/tryEndMission/${this.state.mission.id}?playerId=${this.props.player.id}`, {
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
        if (res === missionComplete) {
            res = missionNotUnderway
            this.props.missionCompleteCallback()
        }
        mission.response = res
        this.setState({ mission: mission })
    }

    handleAssignHeroes(mission, event) {
        this.props.assignHeroesClicked(mission)
        event.preventDefault()
    }

    // todo : refactor so that the CountdownTimer always exists and is shown or not based no state
    render() {
        var statusBlock = <td></td>
        if (this.state.mission.response === missionNotUnderway) {
            statusBlock = <td><button onClick={(e) => this.handleAssignHeroes(this.state.mission, e)}>Assign Heroes</button></td>
        } else {
            statusBlock = <td><CountdownTimer endTime={this.state.mission.response} timeUpCallback={this.updateMissionStatus} /></td>
        }

        return (
            <>
                <td>{this.state.mission.name}</td>
                <td>{this.state.mission.skillCost} skill required</td>
                <td>{this.state.mission.reward} coins for completion</td>
                {statusBlock}
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
        const timer = setTimeout(() => {
            let timeLeft = calculateTimeLeft()
            if (timeLeft < 0) props.timeUpCallback()
            else setTimeLeft(calculateTimeLeft());
        }, 1000);
        // the returned function will be called when the component unmounts
        return () => clearTimeout(timer)
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