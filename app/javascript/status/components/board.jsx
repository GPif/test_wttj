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

    componentDidMount () {
        this.fetchStatus();
    }

    render () {
        const li = this.state.status.map((x)=> { return <li key={x.name} > {x.name} {x.firstname} {x.status} </li> })
        return <div>
            <ul>{li}</ul>
        </div>;
    }
}

export default Board
