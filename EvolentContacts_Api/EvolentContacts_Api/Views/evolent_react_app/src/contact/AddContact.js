import React from "react";
import { Row, Form, Col, Button } from "react-bootstrap";

class AddContact extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      Id: "",
      FirstName: "",
      LastName: "",
      Email: "",
      Phone: "",
      Status: true,
    };

    if (props.contact.Id) {
      this.state = props.contact;
    } else {
      this.state = this.initialState;
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onFormSubmit(this.state);
    this.setState(this.initialState);
  }
  render() {
    let pageTitle;
    let actionStatus;
    if (this.state.Id) {
      pageTitle = <h2>Edit Contact</h2>;
      actionStatus = <b>Update</b>;
    } else {
      pageTitle = <h2>Add Contact</h2>;
      actionStatus = <b>Save</b>;
    }

    return (
      <div>
        <h2> {pageTitle}</h2>
        <Row>
          <Col sm={7}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="FirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="FirstName"
                  value={this.state.FirstName}
                  onChange={this.handleChange}
                  placeholder="First Name"
                />
              </Form.Group>
              <Form.Group controlId="LastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="LastName"
                  value={this.state.LastName}
                  onChange={this.handleChange}
                  placeholder="Last Name"
                />
              </Form.Group>
              <Form.Group controlId="Email">
                <Form.Label>EmailId</Form.Label>
                <Form.Control
                  type="text"
                  name="Email"
                  value={this.state.Email}
                  onChange={this.handleChange}
                  placeholder="Email"
                />
              </Form.Group>
              <Form.Group controlId="Phone">
                <Form.Label>MobileNo</Form.Label>
                <Form.Control
                  type="text"
                  name="Phone"
                  value={this.state.Phone}
                  onChange={this.handleChange}
                  placeholder="Phone"
                />
              </Form.Group>

              <Form.Group>
                <Form.Control type="hidden" name="Id" value={this.state.Id} />
                <Button variant="success" type="submit">
                  {actionStatus}
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AddContact;
