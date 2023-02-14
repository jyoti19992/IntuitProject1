import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import moment from "moment";
import Box from "@mui/material/Box";
import "./cardStyle.css";
class CardBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { event, label, index } = this.props;
    return (
      <div
        style={{
          float: index === 0 ? "left" : "right",
        }}
        className="cardMain"
      >
        <Card
          className="card"
          sx={{ display: "flex" }}
          style={{
            backgroundColor: event.conflict ? "lightgrey" : "white",
            opacity: event.conflict ? 0.5 : 1,
            cursor: event.conflict ? "not-allowed" : "pointer",
          }}
          variant="outlined"
        >
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <CardContent sx={{ width: 40 }}>
              <Typography
                sx={{ fontSize: 50, height: "58px", alignItems: "center" }}
                color={label === "SELECT" ? "red" : "darkblue"}
              >
                {event.event_category[0]}
              </Typography>
            </CardContent>
            <CardContent
              style={{
                borderLeft:
                  label === "SELECT" ? "2px solid red" : "2px solid darkblue",
                height: "70%",
              }}
            ></CardContent>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CardContent>
                <Typography sx={{ fontSize: 25 }} color="black" gutterBottom>
                  {event.event_name}
                </Typography>
                <Typography
                  sx={{ fontSize: 11 }}
                  color={label === "SELECT" ? "red" : "darkblue"}
                >
                  ({event.event_category})
                </Typography>
                <Typography variant="body2" sx={{ fontSize: 18 }}>
                  {moment(event.start_time).format(" hA")} -{" "}
                  {moment(event.end_time).format(" hA")}
                </Typography>
                <CardActions>
                  <Button
                    variant="contained"
                    size="small"
                    className={
                      event.conflict
                        ? "buttonDisabled"
                        : label === "SELECT"
                        ? "buttonEvent"
                        : "buttonSelected"
                    }
                    onClick={() => this.props.clickHandler(event.id)}
                  >
                    {this.props.label}
                  </Button>
                </CardActions>
              </CardContent>
            </Box>
          </Box>
        </Card>
      </div>
    );
  }
}
export default CardBox;
