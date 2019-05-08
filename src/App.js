import React, { Component } from 'react';
import './App.css';

import Dropdown from './components/Dropdown/Dropdown.js';
//import Test from './components/Test/Test.js';


// Define our App
class App extends Component {
  state = {
  	apiData: null,
		selections: [],
		currencies: [],
		relativeValues: {},
		values: {},		
	}

	componentDidMount() {
		fetch("https://api.exchangeratesapi.io/latest?base=USD")
			.then(response => response.json())
			.then(data => {
				console.log("got data", data);
				const rates = data.rates;
				const currencies = Object.keys(rates);
				this.setState({
					apiData: data,
					currencies: currencies,
				});
			});
		console.log('fetch');
	}

	handleClear = () => {
    console.log('clear');
    this.heightToZero();
    setTimeout(() => this.eraseBars(), 400);
    
  }
	
	heightTo100 = () => {
		let fadeInBars;
		fadeInBars = document.querySelector('.BodyBox-graph-lower');
    fadeInBars.style.height = 100 + '%';
	}

	heightToZero = () => {
		let zeroBars;		
		zeroBars = document.querySelector('.BodyBox-graph-lower');
    zeroBars.style.height = 0 + '%';
	}
		
	handleChange = () => {
		this.heightToZero();
		setTimeout(() => this.makeBars(), 400);
	}
	
	eraseBars = () => {
	  this.setState({
      selections: [],
    });
  }
	
	wait = () => {
		console.log('wait');
		setTimeout(() => this.heightTo100(), 20);
	}
	
	makeBars = () => {	
		console.log('change start');
		let tempSelections = [];
		let five = [1,2,3,4,5];
		for (let num of five) {
			tempSelections.push(document.querySelector('.select' + num).value);
		}
		let valuesArray = [];
		let rawValue;
		let shortRelativeValue;
		let shortValue;
    for (let selection of tempSelections) {
	 		if (selection !== 'Currency') {
	    rawValue = this.state.apiData.rates[selection];
		  valuesArray.push(rawValue);
	  	}
   	}
		let highest = Math.max(...valuesArray);
		let relativeHeight;
		let tempRelativeValues = {};
		let tempValues = {};
  	for (let selection of tempSelections) {
		  if (selection !== 'Currency') {
		      rawValue = this.state.apiData.rates[selection];
					relativeHeight = rawValue / highest;
		     	shortRelativeValue = relativeHeight.toFixed(2);
					tempRelativeValues[selection] = shortRelativeValue;
					shortValue = rawValue.toFixed(2);
					tempValues[selection] = shortValue;
			}
		}
		this.setState({
			relativeValues: tempRelativeValues,
			selections: tempSelections,
			values: tempValues,
		});
		this.wait();
		}			

  render() {
		let five = [1,2,3,4,5];
		let bars = this.state.selections.map((selection) => {
			return selection !== 'Currency' ?					
				<div className="BodyBox-graph-lower-bar" style={{height: this.state.relativeValues[selection] * 100 + '%'}}>
					<p> 
						{selection}
					</p>  
					<p className="BodyBox-graph-lower-bar-invisibleText">
						1 USD is worth {this.state.values[selection]} {selection}					
					</p>
				</div>
			: null
		})
    return (
      <div className="App">
    		<div className="Body-div">
		      <div className="Header">
		          <div className="Header-content">
		              Amounts Of Foreign Currencies Equal To One United States Dollar
		          </div>
		      </div>
		      <div className="SidebarAndBodyBox">
		          <div className="SidebarBox">
		              <div className="InputBox">
		                <form className ="InputBox">
		                  <input onClick={this.handleClear} type="reset" value="Clear Selections" /> 
										  {five.map((num) =>
											  <Dropdown 
											  identifier={'select' + num}
											  onChange={this.handleChange}
											  options={this.state.currencies} 
										  />)}  
										</form>               
		              </div>
		          </div>
		          <div className="BodyBox">
		              <div className="BodyBox-graph">
		                  <div className="BodyBox-graph-upper">
		                  </div>
		                  <div className="ContainerOfGraphLower">		
												<div className="BodyBox-graph-lower">
													{bars}
												</div>						
		                  </div> 
		              </div> 
		          </div>       
		      </div> 
				</div>   
			</div>
    );


  }





}

export default App;
