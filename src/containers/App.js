import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
  constructor(props) { 
    super(props);
    console.log('[App.js] Inside Constructor', props);
  }

  componentWillMount() { 
    console.log('[App.js] Inside componentWillMount()')
  }

  componentDidMount() { 
    console.log('[App.js] Inside componentDidMount()')
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[UPDATE App.js] Inside shouldComponentUpdate()', nextProps, nextState);
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('[UPDATE App.js] Inside componentWillUpdate()', nextProps, nextState)
  }

  componentDidUpdate() {
    console.log('[UPDATE App.js] Inside componentDidUpdate()')
  }

  state = {
    persons: [
      { id: "1", name: "Hany", age: 6 },
      { id: "2", name: "HanyBany", age: 7 },
      { id: "3", name: "HanyBanyBlues", age: 8 },
    ],
    showPersons: false
  }
  // #region Handlers
  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id
    });

    const person = { ...this.state.persons[personIndex] };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  }

  deletePersonHandler = (personIndex) => { 
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  }

  togglePersonsHandler = () => { 
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  }
  //#endregion

  render() {
    console.log('[App.js] Inside render()');

    let persons = null;

    if (this.state.showPersons) { 
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}/>);
    }

    return (
      <div className={classes.App}>
        <Cockpit
          appTitle={this.props.title}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler}/>
        {persons}    
      </div>
    );
  }
}

export default App;
