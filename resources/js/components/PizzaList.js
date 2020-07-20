import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import PizzaContainer from './PizzaContainer'

class PizzaList extends Component {

  constructor(props){
    super(props);
    this.state = {
      pizzas: []
    }
  };


  componentDidMount() {
    //get the pizzas from api
    axios.get('api/pizzas')
    .then((response) => {
      let pizzas = response.data;
      this.setState({
        pizzas: pizzas
      });
    })
    .catch((error) => {
      console.log(error)
    });
  }

  render () {
    const pizzas = this.state.pizzas.map(pizza => {
        return <PizzaContainer key={pizza.id} pizza={pizza}/>
      }
    )


      return (
        <div className="container mt-4">
          <div className="row">
            {pizzas}
          </div>
        </div>
      )
    }

}

export default PizzaList;
