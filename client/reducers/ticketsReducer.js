/**
 * ************************************
 *
 * @module  ticketsReducer
 * @author
 * @date
 * @description reducer for ticket data
 *
 * ************************************
 */

import * as types from '../constants/actionTypes';

const ticketState = {
  totalSnaps: 0,
  messageInput: '',
  messageRating: '',
  activeTickets: [],
  ticketsCount: 0,
  //roomId: ''
};

const ticketsReducer = (state = ticketState, action) => {
  let idx;
  switch (action.type) {
    case types.USER_LOGOUT:
      return {
        totalSnaps: 0,
        messageInput: '',
        messageRating: '',
        activeTickets: [],
        ticketsCount: 0,
      }
      
    case types.GET_TICKETS:
      return { ...state,
        activeTickets: action.payload,
        ticketsCount: action.payload.length,
      }

    case types.POST_TICKET:
      // build new ticket object to be inserted into activeTickets array (use props from FeedContainer)
      const newTicket = {
        messageInput: state.messageInput,
        messageRating: state.messageRating,
        messageId: action.payload.ticketId,
        menteeId: action.payload.menteeId,
        timestamp: action.payload.timestamp,
        status: 'active',
        mentorId: '',
        roomId: action.payload.roomId,
      };
      // make a shallow copy of existing array and push new ticket to it
      let updatedTickets = state.activeTickets.slice();
      updatedTickets.push(newTicket);
      // return updated state and reset message input/ratings to blank
      return {
        ...state,
        activeTickets: updatedTickets,
        ticketsCount: state.ticketsCount + 1,
        nextTicketId: state.nextTicketId + 1,
        messageInput: '',
      };

    case types.UPDATE_TICKET:
      updatedTickets = state.activeTickets.map((ticket, index) => {
        if (ticket.messageId === action.payload.messageId) {
          idx = index;
        }
        return ticket;
      });
      //update the ticket's status to pending and messageId to mentor id
      updatedTickets[idx] =  {
        ...updatedTickets[idx],
        messageId: action.payload.ticketId,
        status: action.payload.status,
        mentorId: action.payload.mentorId,
      };
      return { //return updated state
        ...state,
        activeTickets: updatedTickets };
        
    case types.UPDATE_MESSAGE:
      return { ...state, messageInput: action.payload };

    case types.UPDATE_RATING:
      return { ...state, messageRating: action.payload };

    default:
      return state;
  }
};

export default ticketsReducer;
