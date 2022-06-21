import React from 'react'
// import handleDelete from './DeleteAppointment'

class AppointmentsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      appointmentRows: [],
    }
    this.getAppointments = this.getAppointments.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  
  
  async getAppointments() {
    const url = 'http://localhost:8080/appointments/'

    try {
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        console.log('data', data.appointments)
        const appointmentRows = []
        for (let appointment of data.appointments) {
          appointmentRows.push(appointment)
        }
        this.setState({appointmentRows: appointmentRows})
      }
    } catch (e) {
      console.error(e)
    }
  }

  async handleDelete ({getAppointments, appointment}) {
    console.log(e.target.value)
    const appointmentId = e.target.value
    const appointmentUrl = `http://localhost:8080/appointments/${appointmentId}`
    const fetchConfig = {
      method: "DELETE",
    }
    const response = await fetch(appointmentUrl, fetchConfig)
    if (response.ok) {
      getAppointments()
      alert("Appointment successfully canceled!")
    }
  }  

  async componentDidMount() {
    this.getAppointments()
  }

  render () {
    return (
      <table className="table table-striped table-hover table-bordered">
      <caption>List of appointments</caption>
      <thead className="table-dark">
        <tr>
          <th>VIN</th>
          <th>Owner</th>
          <th>Date</th>
          <th>Time</th>
          <th>Technician</th>
          <th>Reason</th>
          <th>VIP?</th>
          <th>Update Status</th>
        </tr>
      </thead>
      <tbody>
       {this.state.appointmentRows.map(appointment => {
        return (
          <tr key={appointment.vin}>
            <td>{appointment.vin}</td>
            <td>{appointment.owner}</td>
            <td>{appointment.date}</td>
            <td>{appointment.time}</td>
            <td>{appointment.technician.name} / {appointment.technician.number}</td>
            <td>{appointment.reason}</td>
            <td>
              <button value={appointment.id} type="button" onClick={this.handleDelete} className="btn btn-danger">Cancel</button>
            </td>
          </tr>
        )
       })}
      </tbody>
    </table>
    )
  }
}

export default AppointmentsList