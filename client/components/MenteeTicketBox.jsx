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
import { Button } from 'react-bootstrap';

//import resolve btn and its functionalities
import ResolveBtn from './ResolveBtn.jsx';

class MenteeTicketBox extends Component {
  constructor(props) {
    super(props);
  }

  
  render () {
    let buttons;    

    if (this.props.ticket.status === 'active') {
      //if the ticket is active and this user is the mentee (user who posted it), disable resolve until someone accepts it
      buttons = (
        <span>
          <Button disabled type="button" className="btn btn-secondary">Resolve(disabled)</Button>
          <Button onClick={() => this.props.deleteTicket(this.props.ticket.messageId)} type="button" className="btn btn-success">Delete</Button>
        </span>
      )
    } else {
      //if someone does accept it, enable resolve and disable the delete button
      buttons = (
        <span>
          {/* <Button type="button" className="btn btn-secondary">
              Resolve
          </Button> */}
          {/*resolve button testing*/}
          <ResolveBtn 
            messageId={this.props.ticket.messageId} //passes specific ticket Id
            updateRating={this.props.updateRating} //to update snaps
            updateFeedback={this.props.updateFeedback} //updates feedback based on user input
            postFeedback={this.props.postFeedback}  //to send feedback to database
            resolveTicket={this.props.resolveTicket} //submit button finally invokes resolveTicket
          />
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
