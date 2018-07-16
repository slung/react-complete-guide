import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

class App extends Component {
  state = {
    persons: [
      { id: "1", name: "Hany", age: 6 },
      { id: "2", name: "HanyBany", age: 7 },
      { id: "3", name: "HanyBanyBlues", age: 8 },
    ],
    showPersons: false
  }

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

  render() {

    let persons = null;
    let btnClass = '';

    if (this.state.showPersons) { 
      persons = (
        <div>
          {
            this.state.persons.map((person, index) => {
              return (
                  <Person
                  name={person.name}
                  age={person.age}
                  click={() => this.deletePersonHandler(index)}
                    changed={(event) => this.nameChangedHandler(event, person.id)}
                    key={person.id}/>
              );
            })}
        </div>);
      
      btnClass = classes.Red;
    }

    const assignedClasses = [];

    if (this.state.persons.length <= 2) { 
      assignedClasses.push(classes.red);
    }

    if (this.state.persons.length <= 1) { 
      assignedClasses.push(classes.bold);
    }

    return (
      <div className={classes.App}>
          <h1>Hi, I'm Hany</h1>
        <p className={assignedClasses.join(' ')}>HanyBanyBlues</p>
        <button
          className={btnClass}
            onClick={this.togglePersonsHandler}>Toggle Persons</button>
          {persons}    
          </div>
    );
  }
}

export default App;
