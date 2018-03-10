import React from 'react'
import axios from 'axios';

class Board extends React.Component {
    constructor () {
        super();
        this.state = {
            status: []
        };
    }

    fetchStatus() {
        axios.get( '/candidat_status.json' )
        .then(response => {
            console.log(response);
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
            console.log(response);
        })
        .catch(error => {
        });
    }

    componentDidMount () {
        this.fetchStatus();
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
