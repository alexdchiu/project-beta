import React from 'react'


class Manufacturers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      manufacturers: [],
    }
    this.getManufacturer = this.getManufacturer.bind(this)
  }
  
  
  async getManufacturer() {
    const manufacturerURL = 'http://localhost:8100/api/manufacturers/'
    try {
      const manufacturerResponse = await fetch(manufacturerURL)
      if (manufacturerResponse.ok) {
        const manufacturerData = await manufacturerResponse.json()

        this.setState({
            manufacturers: manufacturerData.manufacturers,
        })
      }
    } catch (e) {
      console.error(e)
    }
  }

  async componentDidMount() {
    this.getManufacturer()
  }

  render () {
    return (
      <table className="table table-striped table-hover table-bordered">
      <caption>List of Manufacturers</caption>
      <thead className="table-dark">
        <tr>
          <th>Manufacturer Name</th>
        </tr>
      </thead>
      <tbody>
       {this.state.manufacturers.map(manufacturer => {
        return (
          <tr key={manufacturer.id}>
            <td>{manufacturer.name}</td>
          </tr>
        )
       })}
      </tbody>
    </table>
    )
  }
}
export default Manufacturers
