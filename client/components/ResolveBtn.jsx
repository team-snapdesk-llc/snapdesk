/**
 * ************************************
 *
 * @module  ResolveBtn
 * @author
 * @date
 * @description  component that renders resolve button 
 *
 * ************************************
 */

import React, { Component } from 'react';
import { Button, Dropdown, Form, FormControl, InputGroup } from 'react-bootstrap';

class ResolveBtn extends Component { 
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Dropdown className="btnResolve">
        <Dropdown.Toggle variant="success">
          RESOLVE
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {/*update rating*/}
            Update Snaps:
          <Form.Group onChange={this.props.updateRating}>
            <Form.Check
            inline label="1" type="radio" id="snapUpdate1" name="snap-form" value={1}
            />
            <Form.Check
            inline label="2" type="radio" id="snapUpdate2" name="snap-form" value={2}
            />
            <Form.Check
            inline label="3" type="radio" id="snapUpdate3" name="snap-form" value={3}
            />
            <Form.Check
            inline label="4" type="radio" id="snapUpdate4" name="snap-form" value={4}
            />
            <Form.Check
            inline label="5" type="radio" id="snapUpdate5" name="snap-form" value={5}
            />
          </Form.Group>

          {/*feedback form*/}
          <InputGroup className="feedbackInput">
            <FormControl
            id="feedbackForm"
            type="text"
            placeholder="Feedback"
            /*value={}*/
            onChange={e => {
              // console.log('typing');
              this.props.updateFeedback(e);}}
            />
            <InputGroup.Append>
              <Button onClick={e => {
                  e.preventDefault();
                  this.props.resolveTicket();
                }}
              >
                Submit
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

export default ResolveBtn;