import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import moment from "moment";
import "./cardStyle.css";

class CardBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { event } = this.props;
    return (
      <div
        style={{
          width: "45%"
        }}
      >
        <Card
          className="card"
          style={{
            backgroundColor: event.conflict
              ? "lightgrey"
              : "rgba(31,177,255,0.1)",
            opacity: event.conflict ? 0.5 : 1,
            cursor: event.conflict ? "not-allowed" : "pointer"
          }}
          variant="outlined"
        >
          <CardContent>
            <Typography sx={{ fontSize: 20 }} color="black" gutterBottom>
              {event.event_name}
            </Typography>
            <Typography sx={{ fontSize: 11 }} color="text.secondary">
              ({event.event_category})
            </Typography>
            <Typography variant="body2">
              {moment(event.start_time).format(" hA")} -{" "}
              {moment(event.end_time).format(" hA")}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              size="small"
              className={
                event.conflict
                  ? "buttonDisabled"
                  : this.props.label === "SELECT"
                  ? "buttonEvent"
                  : "buttonSelected"
              }
              onClick={() => this.props.clickHandler(event.id)}
            >
              {this.props.label}
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default CardBox;
