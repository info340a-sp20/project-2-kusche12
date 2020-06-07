import React from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import '../homePage.css';

export default class Feedback extends React.Component {
  render() {
    return (
      <div className="feedback">
        <div className="title">Contact Us</div>
        <hr />
        <Form>
          <FormGroup className="fb-form-wrapper mb-3">
            <Input type="text" name="name" className="fb-input" placeholder="Name" />
            <Input type="email" name="email" className="fb-input" placeholder="Email" />
            <Input type="textarea" name="text" id="Text" placeholder="Enter Questions or Comments here" />
          </FormGroup>
          <Button>Submit</Button>
        </Form>

      </div>
    )
  }
}