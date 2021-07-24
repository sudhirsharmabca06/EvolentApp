import React, { Component } from "react";

import { Container, Button } from "react-bootstrap";
import ContactList from "./GetContact";
import AddContact from "./AddContact";
import axios from "axios";

const apiUrl = "http://localhost:60044/api/contact/";

class ContactActionApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAddContact: false,
      error: null,
      response: {},
      contactData: {},
      isEditContact: false,
      isContactDetails: true,
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onCreate() {
    this.setState({ isAddContact: true });
    this.setState({ isContactDetails: false });
  }
  onDetails() {
    this.setState({ isContactDetails: true });
    this.setState({ isAddContact: false });
  }

  onFormSubmit(data) {
    this.setState({ isAddContact: true });
    this.setState({ isContactDetails: false });
    if (this.state.isEditContact) {
      axios.put(apiUrl + "UpdateContactDetails", data).then((result) => {
        alert(result.data);
        this.setState({
          response: result,
          isAddContact: false,
          isEditContact: false,
        });
      });
    } else {
      axios.post(apiUrl + "InsertContactDetails", data).then((result) => {
        alert(result.data);
        this.setState({
          response: result,
          isAddContact: false,
          isEditContact: false,
        });
      });
    }
  }

  editContact = (id) => {
    this.setState({ isContactDetails: false });
    axios.get(apiUrl + "GetContactDetailsById/" + id).then(
      (result) => {
        this.setState({
          isEditContact: true,
          isAddContact: true,
          contactData: result.data,
        });
      },
      (error) => {
        this.setState({ error });
      }
    );
  };

  render() {
    let ContactForm;
    if (this.state.isAddContact || this.state.isEditContact) {
      ContactForm = (
        <AddContact
          onFormSubmit={this.onFormSubmit}
          contact={this.state.contactData}
        />
      );
    }
    return (
      <div className="App">
        <Container>
          <h1 style={{ textAlign: "center" }}>
            Evolent Health Contact Data React App
          </h1>
          <hr></hr>
          {!this.state.isContactDetails && (
            <Button variant="primary" onClick={() => this.onDetails()}>
              {" "}
              Evolent Contact Details
            </Button>
          )}
          {!this.state.isAddContact && (
            <Button variant="primary" onClick={() => this.onCreate()}>
              Add Evolent Contact
            </Button>
          )}
          <br></br>
          {!this.state.isAddContact && (
            <ContactList editContact={this.editContact} />
          )}
          {ContactForm}
        </Container>
      </div>
    );
  }
}
export default ContactActionApp;
