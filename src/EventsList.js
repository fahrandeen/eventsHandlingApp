import React, { Component } from 'react';
import './EventsList.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  fetchEvents,
  changePagination,
  addEvent,
  changeQueryFilter,
  removeAllEvents
} from './reducer/reducer'
import EventItem from './EventItem';

class EventsList extends Component {

  state = {
    name: '',
    address: ''
  }

  componentDidMount() {
    this.props.fetchEvents()
  }

  handleInputChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.addEvent({
      name: this.state.name,
      place: this.state.address,
    })

    this.setState({
      name: '',
      address: '',
    })

  }

  searchHandler = (event) => {
    const value = event.target.value
    this.props.changeQueryFilter(value)
  }

  changePaginationHandler = (event) => {
    const limit = +event.target.value
    console.log(limit)
    this.props.changePagination({ limit, offset: 0 })
  }

  changeOffsetPaginationHandler = (event) => {
    const offset = (+event.target.value - 1) * (this.props.limit)
    const limit = this.props.limit
    console.log("offset :" + offset)
    console.log("limit :" + limit)
    this.props.changePagination({ offset, limit })
  }

  removeAllEventsHandler = () => {
    console.log('Deleting All Events.')
    this.props.removeAllEvents()
  }

  render() {
    return (
      <div>
        <h2>My First Event Handling App</h2>
        <h3>Add New Event</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
            placeholder="Name"
          />
          <input
            type="text"
            name="address"
            value={this.state.address}
            onChange={this.handleInputChange}
            placeholder="Address"
          />
          <button
            type="submit"
            disabled={!((this.state.name.length > 0) && (this.state.address.length > 0))}
          >{this.props.addEventLoading
            ? "Adding..."
            : "Add Event"}</button>
        </form>
        {/* {this.state.name.length > 0 ? "true" : "false"}<br></br>
        {this.state.address.length > 0 ? "true" : "false"}<br/>
        {((this.state.name.length > 0) && (this.state.address.length > 0)) ? "true" : "false"} */}

        <h2>Browse Events</h2>

        <input
          value={this.props.query}
          placeholder="Search for Name..."
          onChange={this.searchHandler}
        />

        <select
          value={this.props.limit}
          onChange={this.changePaginationHandler}
        >
          <option value={10}>Limit per page: 10</option>
          <option value={50}>Limit per page: 50</option>
          <option value={100}>Limit per page: 100</option>
        </select>

        <select
          value={(this.props.offset / this.props.limit) + 1}
          onChange={this.changeOffsetPaginationHandler}
        >

          <option value={1}>Page: 1</option>
          <option value={2}>Page: 2</option>
          <option value={3}>Page: 3</option>
        </select>
        <span>   </span>

        {this.props.events.length > 0 && (
          <button
            disabled={this.props.removeAllEventsLoading}
            onClick={ this.removeAllEventsHandler}
          >
            X Delete All Events
          </button>
        )}



        {this.props.eventsLoading && <p>Fetching...</p>}

        {(this.props.events.length === 0)
          ? (<p>No Events Found</p>)
          : (
            <div style={{ opacity: this.props.eventsLoading ? 0.5 : 1 }}>
              <EventItem
                events={this.props.events}
                removeEventLoadingById={this.props.removeEventLoadingById}
              />
            </div>
          )
        }
      </div>
    )
  }
}

const ConnectedEventsList = connect(
  (state) => state.events,
  dispatch => bindActionCreators({
    fetchEvents,
    changePagination,
    addEvent,
    changeQueryFilter,
    removeAllEvents
  }, dispatch)
)(EventsList)

export default ConnectedEventsList;
