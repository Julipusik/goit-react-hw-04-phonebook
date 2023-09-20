import {useState, useEffect} from "react";
import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";

export const App = () => {
  const [contacts, setContacts] = useState(() => JSON.parse(localStorage.getItem('contacts')));
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    const isExist = contacts.find(
      contact => contact.name === newContact.name
    );

    if (isExist) {
      Report.warning('Oops!', `${newContact.name} is already in contacts.`);
      return;
    }
    setContacts(prev => [...prev, { id: nanoid(), ...newContact }]);
  };

  const deleteContact = evt => {
    setContacts(prev =>
      prev.filter(element => {
        return element.id !== evt.target.id;
      })
    );
  };

  const changeFilter = evt => {
    setFilter(evt.target.value);
  };

  const filteredContacts = () => {
    if (!filter) {
      return contacts;
    }

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />

      <h2>Contacts</h2>
      <Filter filter={filter} changeFilter={changeFilter} />
      <ContactList deleteContact={deleteContact} filteredContacts={filteredContacts} />
    </>
  );
};