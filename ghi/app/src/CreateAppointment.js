import React from 'react'

class CreateAppointmentForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      vin: '',
      owner: '',
      date: '',
      time: '',
      technicians: [],
      reason: '',
    }
    this.handleVinChange = this.handleVinChange.bind(this)
    this.handleOwnerChange = this.handleOwnerChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleTimeChange = this.handleTimeChange.bind(this)
    this.handleTechnicianChange = this.handleTechnicianChange.bind(this)
    this.handleReasonChange = this.handleReasonChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    // console.log(data);
    delete data.technicians;

    const appointmentUrl = 'http://localhost:8080/appointments/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(appointmentUrl, fetchConfig);
    if (response.ok) {

      const cleared = {
        vin: '',
        owner: '',
        date: '',
        time: '',
        technician: '',
        reason: '',
      }
      this.setState(cleared)
      alert("Appointment successfully created!")
    }
  }


  handleVinChange(event) {
    const value = event.target.value
    this.setState({vin:value})
  }

  handleOwnerChange(event) {
    const value = event.target.value
    this.setState({owner:value})
  }

  handleDateChange(event) {
    const value = event.target.value
    this.setState({date:value})
  }

  handleTimeChange(event) {
    const value = event.target.value
    this.setState({time:value})
  }

  handleTechnicianChange(event) {
    const value = event.target.value
    this.setState({technician:value})
  }

  handleReasonChange(event) {
    const value = event.target.value
    this.setState({reason:value})
  }

  async componentDidMount () {
    const url = 'http://localhost:8080/technicians/'
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      // console.log(data)
      this.setState({technicians:data.technicians})
    }
  }

  render () {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new service appointment</h1>
            <form onSubmit={this.handleSubmit} id="create-service-appointment">
              <div className="form-floating mb-3">
                <input onChange={this.handleVinChange} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control" value={this.state.vin} />
                <label htmlFor="vin">VIN</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleOwnerChange} placeholder="Owner" required type="text" name="owner" id="owner" className="form-control" value={this.state.owner} />
                <label htmlFor="owner">Owner</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleDateChange} placeholder="Date" required type="date" name="date" id="date" className="form-control" value={this.state.date} />
                <label htmlFor="date">Date</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleTimeChange} placeholder="Time" required type="time" name="time" id="time" className="form-control" value={this.state.time} />
                <label htmlFor="time">Time</label>
              </div>
              <div className="mb-3">
                <select required onChange={this.handleTechnicianChange} name="technician" id="technician" className="form-select" value={this.state.technician}>
                  <option value="">Choose a technician</option>
                  {this.state.technicians.map(technician=> {
                    return (
                      <option key={technician.number} value={technician.id}>
                        {technician.name} / {technician.number}
                      </option>
                    )
                  })}
                </select>
              </div>
              <div className="mb-3">
                  <label htmlFor="reason">Reason</label>
                  <textarea onChange={this.handleReasonChange} className="form-control" required id="reason" name="reason" rows="3" value={this.state.reason}></textarea>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateAppointmentForm