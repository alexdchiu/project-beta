import React from 'react'


class SearchAppointments extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allAppointments: [],
      inventoryVins: [],
      filteredAppointments: [],
      searchText: '',
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.handleSearchText = this.handleSearchText.bind(this)
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
        const appointments = []
        for (let appointment of appointmentData.appointments) {
            appointments.push(appointment)
        }
        const inventoryVins = []
        for (let inventoryVin of inventoryVinData.inventory_vins) {
          inventoryVins.push(inventoryVin['vin'])
        }
        this.setState({
          allAppointments: appointments,
          inventoryVins: inventoryVins,
        })
      }
    } catch (e) {
      console.error(e)
    }
  }
  
  componentDidMount () { 
    this.getAppointmentsandInventoryVins()
  }


  handleSearchText(event) {
    const value = event.target.value
    this.setState({searchText:value})
  }

  handleSearch(e) {
    e.preventDefault()
    this.getAppointmentsandInventoryVins()
    const value = {...this.state}['searchText']
    this.setState({searchText:value})
    const searchFor = value.toLowerCase()
    let currentList = this.state.allAppointments
    let resultsList = []
    for (let appointment of currentList) {
      if (appointment.vin.toLowerCase().includes(searchFor)) {
        resultsList.push(appointment)
      }
    }
    this.setState(
      {filteredAppointments: resultsList}
    )
  }

  render () {
    return (
      <div>
        <h1>Search for appointments (by VIN)</h1>
        <form id="search_appointments" onSubmit={this.handleSearch}>
          <input 
            type="text"
            className="input"
            placeholder="Enter VIN (or partial)"
            onChange={this.handleSearchText}
            value={this.state.searchText}
          />
          <button onClick={this.handleSearch}>Search</button>
        </form>
        <table className="table table-striped table-hover table-bordered">
        <caption>List of all appointments (open + closed) by VIN.</caption>
          <thead className="table-dark">
            <tr>
              <th>VIN</th>
              <th>Owner</th>
              <th>Date</th>
              <th>Time</th>
              <th>Technician</th>
              <th>Reason</th>
              <th>VIP?</th>
              <th>Current Status</th>
            </tr>
          </thead>
          <tbody>
            {this.state.filteredAppointments.map(appointment => {
              return (
                <tr key={appointment.id}>
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
                    {appointment.finished && <p>Finished</p>}
                    {appointment.finished === false && <p>Open</p>}
                  </td>
                </tr>
              )
            })
            
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default SearchAppointments

