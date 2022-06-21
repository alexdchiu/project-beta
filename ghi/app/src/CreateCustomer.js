import React from 'react'
import { UNSAFE_LocationContext } from 'react-router-dom'

class CreateCustomerForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      address: '', 
      phone: '',
    }
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleAddressChange = this.handleAddressChange.bind(this)
    this.handlePhoneChange = this.handlePhoneChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    // console.log(data)

    const customerURL = 'http://localhost:8090/customer/new/';
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
        address: "", 
        phone: "",
      }
      this.setState(cleared)
    }
  }


  handleNameChange(event) {
    const value = event.target.value
    this.setState({name:value})
  }

  handleAddressChange(event) {
    const value = event.target.value
    this.setState({address:value})
  }

  handlePhoneChange(event) {
    const value = event.target.value
    this.setState({phone:value})
  }

  render () {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new customer</h1>
            <form onSubmit={this.handleSubmit} id="create-hat-form">
              <div className="form-floating mb-3">
                <input onChange={this.handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" value={this.state.name} />
                <label htmlFor="style">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleAddressChange} placeholder="Address" required type="text" name="address" id="address" className="form-control" value={this.state.address} />
                <label htmlFor="fabric">Address</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handlePhoneChange} placeholder="Phone" required type="text" name="phone" id="phone" className="form-control" value={this.state.phone} />
                <label htmlFor="color">Phone</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateCustomerForm