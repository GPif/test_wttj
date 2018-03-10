import React from 'react';
import axios from 'axios';
import actionCable from 'actioncable';

class Board extends React.Component {
    constructor () {
        super();
        this.CableApp = {};
        //Will not fit in production
        this.CableApp.cable = actionCable.createConsumer(`ws://127.0.0.1:3000/cable`);
        this.state = {
            status: []
        };
    }

    fetchStatus() {
        axios.get( '/candidat_status.json' )
        .then(response => {
            this.setState({status: response.data.candidat_status});
        })
        .catch(error => {
        });
    }

    updateStatus(id, status) {
        axios.put('/candidat_status/' + id,
        {
            id: id,
            candidat_status: {status: status}
        })
        .then(response => {
        })
        .catch(error => {
        });
    }

    componentDidMount () {
        this.fetchStatus();
        this.CableApp.cable.subscriptions.create({channel: "CandidatStatusChannel" , board: 'board_1'}, {
            connect: () => { console.log("connect"); },
            received: (newLine) => {
                console.log(newLine)
            }
        })
    }

    render () {
        const li = this.state.status.map((x)=> { return (
            <li key={x.id} >
                {x.name} {x.firstname} {x.status}
                <button onClick={this.updateStatus.bind(this, x.id, 1)}>A Voir</button>
                <button onClick={this.updateStatus.bind(this, x.id, 2)}>Entretiens</button>
            </li>)
        })
        return <div>
            <ul>{li}</ul>
        </div>;
    }
}

export default Board
