/**
 * ************************************
 *
 * @module  roomsReducer
 * @author team snapdesk
 * @date 02/25/20
 * @description reducer for rooms data
 *
 * ************************************
 */

import * as types from "../constants/actionTypes";

const roomState = {
  activeRoom: { id: null, name: "Choose a room", admin: null },
  rooms: []
};

const roomsReducer = (state = roomState, action) => {
  switch (action.type) {
    case types.LOAD_ROOMS:
      return {
        ...state,
        activeRoom: action.payload.activeRoom,
        rooms: action.payload.rooms
      };

    case types.ADD_ROOM:
      return {
        ...state,
        activeRoom: action.payload.activeRoom
      };

    default:
      return state;
  }
};

export default roomsReducer;
