import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import {
  Container,
  Form,
  Label,
  InputField,
  SubmitButton,
} from './ContactForm.styled';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  formSubmitHandler = data => {
    const id = nanoid();
    const contact = {
      name: data.name,
      number: data.number,
      id: id,
    };
    this.props.contactsAdder(contact);
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.formSubmitHandler(this.state);
    this.reset();
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Label>
            Name{' '}
            <InputField
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={this.state.name}
              onChange={this.handleChange}
            />
          </Label>
          <Label>
            Number{' '}
            <InputField
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={this.state.number}
              onChange={this.handleChange}
            />
          </Label>
          <SubmitButton type="submit">Add contact</SubmitButton>
        </Form>
      </Container>
    );
  }
}

ContactForm.propTypes = {
  contactsAdder: PropTypes.func.isRequired,
};
