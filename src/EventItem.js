import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { removeEvent } from './reducer/reducer'

const formatDate = (date) => {
    var eventDate = new Date(date).toJSON().slice(0, 10)
    return eventDate.slice(8, 10) + '/' + eventDate.slice(5, 7) + '/' + eventDate.slice(0, 4)

}

const EventItem = (props) => {

    const handleDeleteEvent = (id) => {
        console.log(id)
        props.removeEvent(id)
    }

    return (
        <div>
            <div>
            {props.events.map(event =>
                console.log(props.removeEventLoadingById[event.name])
            )}
                <table className="eventTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Place</th>
                            <th>Date</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.events.map(event =>
                            <tr key={event.id}>
                                <td>{event.id}</td>
                                <td>{event.name}</td>
                                <td>{event.place}</td>
                                <td>{formatDate(event.date)}</td>
                                <td>
                                    <span
                                        onClick={() => handleDeleteEvent(event.id)}
                        >{props.removeEventLoadingById[event.id] ? "Deleteing" : "Delete"}</span>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default connect(
    (state) => ({ events: state.events.events }),
    dispatch => bindActionCreators({
        removeEvent
    }, dispatch)
)(EventItem)