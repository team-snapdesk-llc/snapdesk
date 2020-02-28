/**
 * ************************************
 *
 * @module  Wrapper
 * @author team snapdesk
 * @date 02/22/2020
 * @description component that renders Navbars, FeedContainer and TicketCreator
 *
 * ************************************
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import * as userActions from "../actions/userActions";
import * as roomActions from "../actions/roomActions";
import * as ticketActions from "../actions/ticketActions";
import LeftNav from "../components/LeftNav";
import RightNav from "../components/RightNav";
import FeedContainer from "./FeedContainer";
import { bindActionCreators } from "redux";

const mapStateToProps = state => ({
  totalSnaps: state.tickets.totalSnaps,
  leaderBoard: state.tickets.leaderBoard,
  ticketsCount: state.tickets.ticketsCount,
  userAvatar: state.user.userAvatar,
  userName: state.user.userName,
  userId: state.user.userId,
  activeRoom: state.rooms.activeRoom,
  rooms: state.rooms.rooms,
  newRoom: state.rooms.newRoom,
  joinRoomName: state.rooms.joinRoomName
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...userActions, ...roomActions, ...ticketActions }, dispatch);

class Wrapper extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUserData();
    setTimeout(() => this.props.getRooms(this.props.userId), 1000);
  }

  componentDidUpdate() {
    if (this.props.activeRoom.id) {
      // console.log('ACTIVE ROOM: ', this.props.activeRoom.id);
      setTimeout(() => this.props.getTickets(this.props.activeRoom.id), 0);
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className="row align-items-start">
          <div className="col-2">
            <LeftNav
              url={this.props.userAvatar}
              userName={this.props.userName}
              userId={this.props.userId}
              activeRoom={this.props.activeRoom}
              rooms={this.props.rooms}
              addRoom={this.props.addRoom}
              newRoom={this.props.newRoom}
              updateNewRoom={this.props.updateNewRoom}
              updateActiveRoom={this.props.updateActiveRoom}
              updateJoinRoomName={this.props.updateJoinRoomName}
              joinRoomName={this.props.joinRoomName}
              joinRoom={this.props.joinRoom}
            />
          </div>
          <div className="col-8">
            <FeedContainer {...this.props} />
          </div>
          <div className="col-2">
            <RightNav
              ticketsCount={this.props.ticketsCount}
              activeRoom={this.props.activeRoom}
              userId={this.props.userId}
              banUser={this.props.banUser}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
