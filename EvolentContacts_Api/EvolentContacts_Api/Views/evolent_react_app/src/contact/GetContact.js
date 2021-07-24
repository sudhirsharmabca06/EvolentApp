import React from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";

const apiUrl = "http://localhost:60044/api/contact";

class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      contacts: [],
      response: {},
    };
  }

  componentDidMount() {
    axios
      .get(apiUrl + "/GetContactDetails")
      .then((response) => response.data)
      .then(
        (result) => {
          this.setState({
            contacts: result,
          });
        },
        (error) => {
          this.setState({ error });
        }
      );
  }

  deactivateContact(id) {
    const { contacts } = this.state;
    axios.delete(apiUrl + "/DeactivateContact/" + id).then((result) => {
      alert(result.data);
      this.setState({
        response: result,
        contacts: contacts.filter((contact) => contact.Id !== id),
      });
    });
  }

  render() {
    const { error, contacts } = this.state;
    if (error) {
      return <div>Error:{error.message}</div>;
    } else {
      return (
        <div>
          <Table>
            <thead className="btn-primary">
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.Id}>
                  <td>{contact.FirstName}</td>
                  <td>{contact.LastName}</td>
                  <td>{contact.Email}</td>
                  <td>{contact.Phone}</td>
                  <td>
                    <Button
                      variant="info"
                      onClick={() => this.props.editContact(contact.Id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => this.deactivateContact(contact.Id)}
                    >
                      Deactivate
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      );
    }
  }
}

export default ContactList;
