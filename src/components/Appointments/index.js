import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    Name: '',
    date: '',
    filter: false,
  }

  addAppointment = event => {
    const {Name, date} = this.state
    event.preventDefault()
    const addAppointment = {
      id: uuidv4(),
      Name,
      date,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, addAppointment],
      Name: '',
      date: '',
    }))
  }

  oninputNameChange = event => {
    this.setState({Name: event.target.value})
  }

  oninputDateChange = event => {
    this.setState({date: event.target.value})
  }

  checkStartStatus = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  filterStarred = () => {
    this.setState(prevState => ({filter: !prevState.filter}))
  }

  filtered = () => {
    const {appointmentsList} = this.state
    const filterList = appointmentsList.filter(
      eachItem => eachItem.isStarred === true,
    )
    return filterList
  }

  render() {
    const {appointmentsList, Name, date, filter} = this.state
    const finalAppointments = filter ? this.filtered() : appointmentsList
    return (
      <div className="bg-container">
        <div className="container">
          <div className="content-container">
            <form className="form" onSubmit={this.addAppointment}>
              <h1 className="heading">Add Appointment</h1>
              <label htmlFor="Title" className="title">
                TITLE
              </label>
              <br />
              <input
                type="text"
                name="Title"
                id="Title"
                className="input"
                onChange={this.oninputNameChange}
                value={Name}
              />
              <br />
              <label htmlFor="Date" className="date">
                DATE
              </label>
              <br />
              <input
                type="date"
                name="Date"
                id="Date"
                className="date-input"
                onChange={this.oninputDateChange}
                value={date}
              />
              <br />
              <button type="submit" className="button">
                Add
              </button>
            </form>

            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="img"
            />
          </div>
          <hr className="line" />
          <div className="appointment-container">
            <div className="appointment-header">
              <h1 className="appointment">Appointments</h1>
              <button
                type="button"
                className={filter ? 'starred-button color' : 'starred-button'}
                onClick={this.filterStarred}
              >
                starred
              </button>
            </div>
            <ul className="list-container">
              {finalAppointments.map(eachItem => (
                <AppointmentItem
                  appointmentObj={eachItem}
                  key={eachItem.id}
                  dateFormat={format}
                  checkStartStatus={this.checkStartStatus}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
