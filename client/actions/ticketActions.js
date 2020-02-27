/**
 * ************************************
 *
 * @module  ticketActions.js
 * @author team snapdesk
 * @date 02/22/2020
 * @description Action Creators for ticketReducer
 *
 * ************************************
 */

// import actionType constants
import axios from "axios";
import * as types from "../constants/actionTypes";

export const postTicket = (data) => ({
	type: "POST_TICKET",
	payload: data,
})

export const postTicketSocket = (socket, userId, messageInput, messageRating, roomId) => {
	return (dispatch) => {
		let ticket = {
				mentee_id: userId,
				room_id: roomId,
        message: messageInput,
        status: 'active',
        snaps_given: messageRating,
		  }
	    socket.emit('postTicket',ticket)		
	}	
}

export const updateTicket = (data) => ({
  type: "UPDATE_TICKET",
  payload: data,
})

export const updateTicketSocket = (socket, ticketId, status, mentorId) => {
  return (dispatch) => {
    let ticket = {
      ticketId: ticketId,
      status: status,
      mentorId: mentorId,
    }
    socket.emit('updateTicket', ticket)
  }
}


export const getTickets = roomId => dispatch =>
  // get all active tickets from the DB. the timer for this is configurable from FeedContainer.jsx
  axios.get("/api/tickets/" + roomId).then(({ data }) => {
    if (!data.isLoggedIn) {
      dispatch({
        type: types.USER_LOGOUT,
        payload: data
      });
    }
    // if the user is logged in, get all active tickets. if the DB request returns undefined, forward an empty array to reducer.
    else {
      dispatch({
        type: types.GET_TICKETS,
        payload: data.activeTickets || []
      });
    }
  });

export const updateMessage = event => ({
  type: types.UPDATE_MESSAGE,
  payload: event.target.value
});

export const updateRating = event => ({
  type: types.UPDATE_RATING,
  payload: event.target.value
});
