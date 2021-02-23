import './App.css';
import contactsJson from './contacts.json';
import {
  Component
} from 'react';

class App extends Component {

  state = {
    contacts: contactsJson.slice(0, 5)
  }

  findRandomContact = () => {
    let randomIndex = Math.floor(Math.random() * contactsJson.length);
    let randomPerson = contactsJson[randomIndex];

    this.setState({
      contacts: [...this.state.contacts, randomPerson]
    });
  };

  sortByName = () => {
    let clonedContacts = [...this.state.contacts];
    clonedContacts.sort((firstContact, secondContact) => {
      if (firstContact.name < secondContact.name) {
        return -1;
      }
      if (firstContact.name > secondContact.name) {
        return 1;
      }
      return 0;
    });

    this.setState({
      contacts: clonedContacts
    });
  };

  sortByPopularity = () => {
    let clonedContacts = [...this.state.contacts];
    clonedContacts.sort((firstContact, secondContact) => secondContact.popularity - firstContact.popularity);

    this.setState({
      contacts: clonedContacts
    });
  };

  deletePerson = (id) => {
    let newContacts = this.state.contacts.filter((singlePerson) => singlePerson.id !== id);

     this.setState({
       contacts: newContacts
     })
  }

  render() {
    return (
      <>
      <h1>Iron Contacts</h1>
      <button onClick={this.findRandomContact}>Add Random Contact</button>
      <button onClick={this.sortByName}>Sort By Name</button>
      <button onClick={this.sortByPopularity}>Sort By Popularity</button>
      <table>
      <thead>
      <tr>
        <th>Picture</th>
        <th>Name</th>
        <th>Popularity</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      {
      this.state.contacts.map((singlePerson, index) =>
      <tr key={index}>
        <td><img src={singlePerson.pictureUrl} alt=""></img></td>
        <td>{singlePerson.name}</td>
        <td>{singlePerson.popularity}</td>
        <td><button onClick={() => this.deletePerson(singlePerson.id)}>Delete</button></td>
      </tr>
      )}
      </tbody>
      </table>
      </>
    )
  };

}

export default App;