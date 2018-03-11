import React from 'react';

class BoardElt extends React.Component {
    constructor(props) {
        super(props);
        this.onDragEvt = props.onDragEvt.bind(this) ;
        this.state = { status: props.status }
    }

    drag(ev) {
        const id = ev.target.getAttribute('status_id');
        ev.dataTransfer.setData("status_id", id);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({status: nextProps.status});
    }

    render() {
        var status = this.state.status;
        console.log(status);
        if (this.state.status) {
            return (
                <li key={status.id} draggable='true'  onDragStart={this.onDragEvt} status_id={status.id} >
                    {status.name} {status.firstname}
                </li>
            )
        }
        return (<li/>)
    }
}

export default BoardElt;
