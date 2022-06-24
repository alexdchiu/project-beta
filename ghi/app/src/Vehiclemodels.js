import React from 'react'


class VehicleModels extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      vehiclemodels: [],
    }
    this.getVehicleModel = this.getVehicleModel.bind(this)
  }
  
  
  async getVehicleModel() {
    const vehicleURL = 'http://localhost:8100/api/models/'
    try {
      const vehiclemodelResponse = await fetch(vehicleURL)
      if (vehiclemodelResponse.ok) {
        const vehiclemodelData = await vehiclemodelResponse.json()
        this.setState({
            vehiclemodels: vehiclemodelData.models,
        })
      }
    } catch (e) {
      console.error(e)
    }
  }

  async componentDidMount() {
    this.getVehicleModel()
  }

  render () {
    return (
      <table className="table table-striped table-hover table-bordered">
      <caption>List of Vehicle Models</caption>
      <thead className="table-dark">
        <tr>
          <th>Name</th>
          <th>Manufacturer</th>
          <th>Picture</th>
        </tr>
      </thead>
      <tbody>
       {this.state.vehiclemodels.map(vehiclemodel => {
        return (
          <tr key={vehiclemodel.id}>
            <td>{vehiclemodel.name}</td>
            <td>{vehiclemodel.manufacturer.name}</td>
            <td><img src={vehiclemodel.picture_url} alt="car" width="259" height="180"/>
            </td>
          </tr>
        )
       })}
      </tbody>
    </table>
    )
  }
}
export default VehicleModels
