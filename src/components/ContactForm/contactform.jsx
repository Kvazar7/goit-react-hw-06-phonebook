import PropTypes from 'prop-types';
import { useState } from 'react';
import css from '../ContactForm/contactform.module.css'

function ContactForm ({ onSubmit }) {
  
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');  
  

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name': {
        setName(value);
        break;
      }
      case 'number': {
        setNumber(value);
        break;
      }
      default:
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setName('');
    setNumber('');
    onSubmit({ name, number});
  };

  
    return (
      <form onSubmit={handleSubmit} autoComplete="off" className={css.phonebook_form}>
        <label htmlFor="" className={css.phonebook_form__label}>
          Name:
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={handleChange}
            className={css.phonebook_form__input}
          />
        </label>
        <label htmlFor="" className={css.phonebook_form__label}>
          Number:
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={handleChange}
            className={css.phonebook_form__input}
          />
        </label>
        <button type="submit" className={css.phonebook_form__button}>Add contact</button>
      </form>
    );
  
}

export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};