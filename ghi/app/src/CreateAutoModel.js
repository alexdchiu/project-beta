import React from 'react'


class CreateAutoModel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      picurl: '', 
      manufacturer: '',
    }
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handlePicURLChange = this.handlePicURLChange.bind(this)
    this.handleManufacturerChange = this.handleManufacturerChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};

    const customerURL = 'http://localhost:8100/api/models/';
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(customerURL, fetchConfig);
    if (response.ok) {
      const cleared = {
        name: '',
        picurl: '', 
        manufacturer: '',
      }
      this.setState(cleared)
    }
  }


  handleNameChange(event) {
    const value = event.target.value
    this.setState({name:value})
  }

  handlePicURLChange(event) {
    const value = event.target.value
    this.setState({picurl:value})
  }

  handleManufacturerChange(event) {
    const value = event.target.value
    this.setState({manufacturer:value})
  }

  render () {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new model</h1>
            <form onSubmit={this.handleSubmit} id="create-hat-form">
              <div className="form-floating mb-3">
                <input onChange={this.handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" value={this.state.name} />
                <label htmlFor="style">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleAddressChange} placeholder="Address" required type="text" name="address" id="address" className="form-control" value={this.state.address} />
                <label htmlFor="fabric">Picture URL</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handlePhoneChange} placeholder="Phone" required type="text" name="phone" id="phone" className="form-control" value={this.state.phone} />
                <label htmlFor="color">Manufacturer</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateAutoModel