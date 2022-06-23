import React from 'react'
// import App from './App'

class SearchAppointments extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allAppointments: [],
      inventoryVins: [],
      filteredAppointments: [],
      searchText: '',
    }
    // this.handleChange = this.handleChange.bind(this)
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
        // console.log('appointment data', appointmentData.appointments)
        // console.log('inventory vins data', inventoryVinData.inventory_vins)
        const appointments = []
        for (let appointment of appointmentData.appointments) {
            appointments.push(appointment)
        }
        // console.log('appointments', appointments)
        const inventoryVins = []
        for (let inventoryVin of inventoryVinData.inventory_vins) {
          inventoryVins.push(inventoryVin['vin'])
        }
        // console.log(inventoryVins)
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

  // handleChange(e) {
  //   let currentList = this.state.allAppointments
  //   let currentVins = currentList.map(appointment => appointment.vin)
  //   console.log('currentVins', currentVins)
  //   let newList = []
  //   let resultsList = []

  //   if (e.target.value !== "") {
  //     // console.log('currentList', currentList)
  //     newList = currentVins.filter( (v,i) => {
  //       const lc = v.toLowerCase()
  //       const filter = e.target.value.toLowerCase()
  //       // console.log('v', v, 'filter', filter)
  //       return lc.includes(filter)
  //     })
  //   } else {
  //     resultsList = []
  //   }
  //   for (let vin of newList) {
  //     resultsList.push(currentList[currentVins.indexOf(vin)])
  //   }
  //   console.log('resultsList', resultsList)
  //   this.setState({
  //     filteredAppointments: resultsList
  //   })
  //   // console.log(this.state)
  //   // console.log('e value',e.target.value) 
  // }

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
      // console.log('appointment.vin', appointment.vin, 'searchFor', searchFor)
      if (appointment.vin.toLowerCase().includes(searchFor)) {
        resultsList.push(appointment)
      }
    }
    this.setState(
      {filteredAppointments: resultsList}
    )
    // console.log('resultsList', resultsList)
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
            // onChange={this.handleChange}
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

