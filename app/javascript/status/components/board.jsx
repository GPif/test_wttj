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
            status_to_meet: [],
            status_meeting: []
        };
    }

    fetchStatus() {
        axios.get( '/candidat_status.json' )
        .then(response => {
            const new_status_to_meet = [];
            const new_status_meeting = [];
            response.data.candidat_status.forEach((x)=>{
                if (x.status === 1) {
                    new_status_to_meet.push(x);
                } else {
                    new_status_meeting.push(x);
                }
            })
            this.setState({status_to_meet: new_status_to_meet, status_meeting: new_status_meeting });
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

    onUpdateStatus(status) {
        const new_status_meeting = this.state.status_meeting.slice();
        const new_status_to_meet = this.state.status_to_meet.slice();
        if (status.status === 1) {
            var idx = new_status_meeting.map((x)=>{return x.id}).indexOf(status.id);
            var s = new_status_meeting[idx];
            s.status = 1;
            new_status_meeting.splice(idx,1);
            new_status_to_meet.push(s);
        } else {
            var idx = new_status_to_meet.map((x)=>{return x.id}).indexOf(status.id);
            var s = new_status_to_meet[idx];
            s.status = 2;
            new_status_to_meet.splice(idx,1);
            new_status_meeting.push(s);
        }
        this.setState({status_meeting: new_status_meeting, status_to_meet: new_status_to_meet});
    }

    componentDidMount () {
        this.fetchStatus();
        this.CableApp.cable.subscriptions.create({channel: "CandidatStatusChannel" , board: 'board_1'}, {
            connect: () => { console.log("connect"); },
            received: (data) => {
                this.onUpdateStatus(data.status)
            }
        })
    }

    drag(ev) {
        const id = ev.target.getAttribute('status_id');
        ev.dataTransfer.setData("status_id", id);
    }

    genLi(status) {
        return (
            <li key={status.id} draggable='true'  onDragStart={this.drag} status_id={status.id} >
                {status.name} {status.firstname} {status.status}
                <button onClick={this.updateStatus.bind(this, status.id, 1)}>A Voir</button>
                <button onClick={this.updateStatus.bind(this, status.id, 2)}>Entretiens</button>
            </li>
        )
    }

    allowDrop(ev) {
        ev.preventDefault();
    }

    drop(ev) {
        ev.preventDefault();
        const id = Number(ev.dataTransfer.getData("status_id"));
        if (ev.target.id === "to_meet" ) {
            this.updateStatus(id, 1);
        } else if (ev.target.id === "meeting" ) {
            this.updateStatus(id, 2);
        }
    }

    render () {
        const li_tm = this.state.status_to_meet.map((x)=> { return this.genLi(x) });
        const li_me = this.state.status_meeting.map((x)=> { return this.genLi(x) });
        return <div id="board">
            <div className="to_meet" id="to_meet" onDrop={this.drop.bind(this)} onDragOver={this.allowDrop}>
                <ul>{li_tm}</ul>
            </div>
            <div className="meeting" id="meeting" onDrop={this.drop.bind(this)} onDragOver={this.allowDrop}>
                <ul>{li_me}</ul>
            </div>
        </div>;
    }
}

export default Board
