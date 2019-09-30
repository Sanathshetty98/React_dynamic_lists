import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import Radium, { StyleRoot } from 'radium';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
class App extends Component {
  state = {
    persons: [
      { id : '1', name:'Max', age: 26 },
      { id : '2', name:'Manu', age: 29 },
      { id : '3', name:'Raju', age: 23 }
    ],
    showPersons : false
  }
  
  nameChangedHandler = (event, id) => {

    const personIndex = this.state.persons.findIndex(
      p => {return p.id === id ;}
    )
    const person = {...this.state.persons[personIndex]}
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;


    this.setState({
      persons: persons
    }
    )
  }

  deleteHandler =(perIndex) =>{
    const persons = [...this.state.persons] ;
    persons.splice(perIndex,1)
    this.setState({persons : persons})

  }

  toggleHandler = () => {
     const doesshow = this.state.showPersons;
     this.setState({showPersons : !doesshow})
  }
  render() {
    const style = {
    backgroundColor : 'green',
    color : 'white',
    font : 'inherit',
    border : ' 2px solid #eee',
    padding : '16px',
    ':hover': {
      backgroundColor : 'lightgreen',
      color : 'black'
    }
    }
    let persons = null
    if(this.state.showPersons){
    persons= (
    <div> 
    {this.state.persons.map( (person,index) => {
      return <Person
       click = {() => this.deleteHandler(index)}
       changed={(event) => this.nameChangedHandler(event,person.id)}
       name = {person.name} 
       age={person.age} 
       key={person.id}/> 
    })
    }   
    </div>
    )
    style.backgroundColor='red';
    style[':hover']={
      backgroundColor: 'salmon',
      color: 'black'
    }
    }

    const classes = [];
    if(this.state.persons.length <=2)
    {
      classes.push('red');
    }
    if(this.state.persons.length <=1)
    {
      classes.push('bold');
    }
    return(
    <StyleRoot>
    <div className='App'>
    <h1> Hi, I'm a React App</h1>
    <p className={classes.join(' ')}> This is working!!!</p>
    <button 
    style = {style}
    onClick={this.toggleHandler}> Toggle persons</button>
    
    {persons}
    </div>
    </StyleRoot>
    );
    //return React.createElement('div',{className:'App'},React.createElement('h1',null,'Does this work now ?'));
  }
}

export default Radium(App);
