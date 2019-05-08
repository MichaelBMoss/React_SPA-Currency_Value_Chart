import React, { Component } from 'react';
import './Dropdown.css';

/*
Props:
	options
	onchange
	identifier
*/

class Dropdown extends Component {
  render() {
		const options = this.props.options.map((option) =>
  		<option value={option}>{option}</option>
		);
    return (
			  <select onChange={this.props.onChange} className={this.props.identifier}>
				  <option value="Currency"> Currency</option>	
				  {options}
			  </select>
		);
  }
}
export default Dropdown;

