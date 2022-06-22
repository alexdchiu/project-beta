import React from 'react'


class CreateAutomobile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      color: '',
      year: '',
      vin: '',
      sold: false,
      models: [],
    }
    this.handleColorChange = this.handleColorChange.bind(this)
    this.handleYearChange = this.handleYearChange.bind(this)
    this.handleVinChange = this.handleVinChange.bind(this)
    this.handleSoldChange = this.handleSoldChange.bind(this)
    this.handleModelChange = this.handleModelChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleColorChange(event) {
    const value = event.target.value
    this.setState({color:value})
  }

  handleYearChange(event) {
    const value = event.target.value
    this.setState({year:value})
  }

  handleVinChange(event) {
    const value = event.target.value
    this.setState({vin:value})
  }

  handleSoldChange() {
    this.setState({
      sold: !this.state.sold
    })
  }

  handleModelChange(event) {
    const value = event.target.value
    this.setState({modelId:value})
  }

  async handleSubmit(e) {
    e.preventDefault()
    const data = {...this.state}
    data.model_id = data.modelId
    delete data.modelId
    delete data.models
    console.log(data)

    const automobileUrl = 'http://localhost:8100/api/automobiles/'
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(automobileUrl, fetchConfig);
    if (response.ok) {

      const cleared = {
        color: '',
        year: '',
        vin: '',
        model: '',
        sold: false
      }
      this.setState(cleared)
    }
  }

  async componentDidMount () {
    const url = 'http://localhost:8100/api/models/'
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      // console.log(data)
      this.setState({models:data.models})
    }
  }


  render () {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add an automobile to inventory</h1>
            <form onSubmit={this.handleSubmit} id="create-manufacturer-form">
              <div className="form-floating mb-3">
                <input onChange={this.handleColorChange} placeholder="Color" required type="text" name="color" id="color" className="form-control" value={this.state.color} />
                <label htmlFor="color">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleYearChange} placeholder="Year" required type="number" name="year" id="year" className="form-control" value={this.state.year} />
                <label htmlFor="year">Year</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleVinChange} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control" value={this.state.vin} />
                <label htmlFor="vin">VIN</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleSoldChange} placeholder="sold" required type="checkbox" name="sold" id="sold" value={this.state.sold} />
                <label htmlFor="sold">Sold?</label>
              </div>
              <div className="mb-3">
                <select required onChange={this.handleModelChange} name="model" id="model" className="form-select" value={this.state.model}>
                  <option value="">Choose a model</option>
                  {this.state.models.map(model => {
                    return (
                      <option key={model.id} value={model.id}>
                        {model.name}
                      </option>
                    )
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    )
  }

}

export default CreateAutomobile