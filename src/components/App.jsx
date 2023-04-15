import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import ContactForm from '../components/ContactForm/contactform'
import ContactList from '../components/ContactList/contactlist'
import Filter from '../components/Filter/filter'
import css from '../components/app.module.css'

function App() {

  const [contacts, setContacts] = useState([
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ])
  const [filter, setFilter] = useState('')
  
  const formSubmit = ( {name, number} ) => {
    const isMatch = contacts.find(
      el => el.name.toLowerCase() === name.toLowerCase()
    );
    if (isMatch) {
      Notiflix.Notify.warning(`${name} is already in contacts list!`);
      return;
    }

    const contact = { id: nanoid(), name, number };

    setContacts(prevState => [...prevState, contact])
    };
  
  const filteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()));
  };

  const contactSearch = e => {
    setFilter(e.currentTarget.value.trim()
    );
  };

  const contactDel = id => {
    setContacts(contacts.filter(contact => contact.id !== id),
    );
  };

  
  useEffect(() => {
    setContacts(JSON.parse(localStorage.getItem('contacts')))
  },[])

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  })

  return (
      <div className={css.contact_book}>
        <h2 className={css.contact_book__head}>Phonebook</h2>
        <ContactForm onSubmit={formSubmit} />
        <h2 className={css.contact_book__head}>Contacts</h2>
        <Filter value={filter} onChange={contactSearch} />
        <ContactList contacts={filteredContacts()} onClick={contactDel} />
      </div>
  )
    
}

export default App