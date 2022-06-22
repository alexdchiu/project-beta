import React from 'react'


class AppointmentsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      appointments: [],
      inventoryVins: [],
    }
    this.getAppointmentsandInventoryVins = this.getAppointmentsandInventoryVins.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleFinish = this.handleFinish.bind(this)
  }
  
  
  async getAppointmentsandInventoryVins() {
    const appointmentUrl = 'http://localhost:8080/appointments/'
    const inventoryVinUrl = 'http://localhost:8080/inventoryvins/'

    try {
      const appointmentResponse = await fetch(appointmentUrl)
      const inventoryVinResponse = await fetch(inventoryVinUrl)
      if (appointmentResponse.ok && inventoryVinResponse.ok) {
        const appointmentData = await appointmentResponse.json()
        const inventoryVinData = await inventoryVinResponse.json()
        // console.log('appointment data', appointmentData.appointments)
        // console.log('inventory vins data', inventoryVinData.inventory_vins)
        const appointments = []
        for (let appointment of appointmentData.appointments) {
          if (appointment.finished === false) {
            appointments.push(appointment)
          }
        }
        // console.log('appointments', appointments)
        const inventoryVins = []
        for (let inventoryVin of inventoryVinData.inventory_vins) {
          inventoryVins.push(inventoryVin['vin'])
        }
        // console.log(inventoryVins)
        this.setState({
          appointments: appointments,
          inventoryVins: inventoryVins,
        })
      }
    } catch (e) {
      console.error(e)
    }
  }

  async handleDelete (e) {
    // console.log(e.target.value)
    const appointmentId = e.target.value
    const appointmentUrl = `http://localhost:8080/appointments/${appointmentId}`
    const fetchConfig = {
      method: "DELETE",
    }
    const response = await fetch(appointmentUrl, fetchConfig)
    if (response.ok) {
      this.getAppointmentsandInventoryVins()
      alert("Appointment successfully canceled!")
    }
  }  

  async handleFinish (e) {
    // console.log(e.target.id)
    const data = {...this.state};
    const appointments = data.appointments
    // console.log(appointments)
    var filtered_data = appointments.filter(obj => {
      return obj.vin === e.target.value
    })
    filtered_data[0]['finished'] = true
    const appointmentId = e.target.id
    // console.log('update', filtered_data)
    // console.log('apptId', appointmentId)

    const appointmentUrl = `http://localhost:8080/appointments/${appointmentId}`
    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify(filtered_data[0])
    }
    const response = await fetch(appointmentUrl, fetchConfig)
    if (response.ok) {
      this.getAppointmentsandInventoryVins()
      alert("Appointment successfully marked as finished!")
    }
  }  

  async componentDidMount() {
    this.getAppointmentsandInventoryVins()
  }

  render () {


    return (
      <div>
        <h1>List of open / unfinished appointments</h1>
      <table className="table table-striped table-hover table-bordered">
      <caption>List of open / unfinished appointments</caption>
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
       {this.state.appointments.map(appointment => {
        return (
          <tr key={appointment.vin}>
            <td>{appointment.vin}</td>
            <td>{appointment.owner}</td>
            <td>{appointment.date}</td>
            <td>{appointment.time}</td>
            <td>{appointment.technician.name} / {appointment.technician.number}</td>
            <td>{appointment.reason}</td>
            <td>
              {this.state.inventoryVins.includes(appointment.vin) && 
                <p>VIP</p>}
            </td>
            <td>
              <button value={appointment.id} type="button" onClick={this.handleDelete} className="btn btn-danger">Cancel</button>
              <button value={appointment.vin} id={appointment.id} type="button" onClick={this.handleFinish} className="btn btn-success">Finished</button>
            </td>
          </tr>
        )
       })}
      </tbody>
    </table>
    </div>
    )
  }
}

export default AppointmentsList