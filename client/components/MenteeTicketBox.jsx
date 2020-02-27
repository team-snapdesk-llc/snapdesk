/**
 * ************************************
 *
 * @module  MenteeTicketBox
 * @author
 * @date
 * @description  component that renders a single ticketbox for each mentee
 *
 * ************************************
 */

import React, { Component } from 'react';
import { Button, Nav, NavDropdown, FormControl, InputGroup } from 'react-bootstrap';



class MenteeTicketBox extends Component {
  constructor(props) {
    super(props);
  }

  
  render () {
    let buttons;    
    /////////////////////////
    let resolveDropDown = (
    <InputGroup className="feedbackInput">
    <FormControl
      id="feedbackForm"
      type="text"
      placeholder="Feedback"
      /*value={}*/
      onChange={e => {
        (e.target.value);
      }}
    />
    <InputGroup.Append>
      <Button
        onClick={e => {
          e.preventDefault();
          //props.addRoom();
        }}
      >
        Submit
      </Button>
    </InputGroup.Append>
    </InputGroup>
    );
    //////////////////////////

    if (this.props.ticket.status === 'active') {
      //if the ticket is active and this user is the mentee (user who posted it), disable resolve until someone accepts it
      buttons = (
        <span>
          {resolveDropDown}
          <Button disabled type="button" className="btn btn-secondary">Resolve(disabled)</Button>
          <Button onClick={() => this.props.deleteTicket(this.props.ticket.messageId)} type="button" className="btn btn-success">Delete</Button>
        </span>
      )
    } else {
      //if someone does accept it, enable resolve and disable the delete button
      buttons = (
        <span>
          {resolveDropDown}
          <Button /*onClick={
            this.props.postFeedback(this.props.ticket.messageId)
            this.props.resolveTicket(this.props.ticket.messageId)}*/
            type="button" className="btn btn-secondary">
              Resolve
          </Button>
          <Button disabled type="button" className="btn btn-success">Delete(disabled)</Button>
          {}
        </span>
      )
    }
    return (
    //post the message with input text and expected difficulty
    <div className="MenteeTicketBox ticketbox">
      <p>Request: {this.props.messageInput}</p>
      <p>Expected Snaps: {this.props.messageRating}</p>
      {buttons}
    </div>
    )
  }
}

export default MenteeTicketBox;
