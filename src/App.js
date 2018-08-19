import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    address: '',
    district: '',
    error: ''
  }

  fetchDistrict = async (e) => {
    e.preventDefault();
    const url = `https://www.googleapis.com/civicinfo/v2/representatives?key=${process.env.REACT_APP_API_KEY}&address=${this.state.address}&includeOffices=true&roles=legislatorLowerBody`;
    try {
      const result = await axios.get(url);
      const officeName = result.data.offices[0].name.split(' ');
      const district = officeName[officeName.length-1];
      console.log(result);
      this.setState({district, error: ''});
    } catch(error){
      this.setState({district: '', error:'Unable to locate that address.'})
    }
  }

  render() {
    console.log(process.env);
    return (
      <div className="App">
        <h1>District Locator</h1>
        <form onSubmit={this.fetchDistrict}>
          <label htmlFor="address">Enter Address or Zip...</label>
          <input
            onChange={(e)=>this.setState({address:e.target.value})}
            type="text"
            value={this.state.address}
            name="address"
          />
          <button type="submit">Submit</button>
        </form>
        {
          this.state.district &&
          <div className="district">Your district is: {this.state.district}</div>
        }
        {
          this.state.error &&
          <div className="error">{this.state.error}</div>
        }
      </div>
    );
  }
}

export default App;
