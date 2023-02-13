import * as React from "react";
import EventContainer from "./EventContainer";
import axios from "axios";
import swal from "@sweetalert/with-react";
import "./mainContainer.css";

class MainContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      allEvents: [],
      selectedEvents: [],
      conflictEvents: [],
      dataLoading: true
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios
      .get("https://run.mocky.io/v3/2744c231-8991-4ae8-bc45-1f645437585a")
      .then(
        (response) => {
          var result = response.data;
          this.setState({ allEvents: result, dataLoading: false });
        },
        (error) => {
          console.log(error);
        }
      );
  };

  updateConflicts = () => {
    const { allEvents, selectedEvents } = this.state;
    let updatedAllEvents = allEvents.map((event) => {
      event.conflict = false;
      for (let i = 0; i < selectedEvents.length; i++) {
        if (
          event.start_time >= selectedEvents[i].start_time &&
          event.start_time < selectedEvents[i].end_time
        ) {
          event.conflict = true;
          break;
        }
        if (
          event.end_time > selectedEvents[i].start_time &&
          event.end_time <= selectedEvents[i].end_time
        ) {
          event.conflict = true;
          break;
        }
      }
      return event;
    });
    this.setState({ allEvents: updatedAllEvents });
  };

  selectEvents = (id) => {
    let { allEvents, selectedEvents } = this.state;
    let tempEvent;
    allEvents.forEach((event) => {
      if (id === event.id) {
        tempEvent = event;
      }
    });
    // Check if the selected event is a conflict event
    if (tempEvent.conflict) {
      swal({
        title: "This event conflicts with another selected event.",
        icon: "warning",
        dangerMode: true,
      });
      return;
    }
    //  user can only select  maximum of 3 events.
    if (selectedEvents.length >= 3) {
      swal({
        title: "You can only select a maximum of 3 events.",
        icon: "warning",
        dangerMode: true,
      });
      return;
    }
    allEvents.splice(allEvents.indexOf(tempEvent), 1);
    this.setState(
      {
        allEvents: allEvents,
        selectedEvents: [...selectedEvents, tempEvent],
      },
      () => this.updateConflicts()
    );
  };

  removeEvents = (id) => {
    const { allEvents, selectedEvents } = this.state;
    let tempEvent;
    selectedEvents.forEach((event, idx) => {
      if (id === event.id) {
        tempEvent = event;
        selectedEvents.splice(idx, 1);
      }
    });

    this.setState(
      {
        allEvents: [...allEvents, tempEvent],
        selectedEvents: selectedEvents,
      },
      () => this.updateConflicts()
    );
  };
  render() {
    const { allEvents, selectedEvents, conflictEvents } = this.state;

    return (
      <div className="container">
        <div className="divContainer">
          <div className="gridContainer">
            <h1 className="heading">All Events</h1>
            <EventContainer
              events={allEvents}
              conflict={conflictEvents}
              clickHandler={this.selectEvents}
              button="SELECT"
            />
          </div>
          <div className="gridContainer">
            <h1 className="heading">Selected Events</h1>
            <EventContainer
              events={selectedEvents}
              clickHandler={this.removeEvents}
              button="REMOVE"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;
