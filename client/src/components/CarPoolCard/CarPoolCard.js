import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Reply from "@material-ui/icons/Reply";

const styles = theme => ({
  card: {
    minWidth: "100%",
    margin: "5px",
    backgroundColor: "white",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  actions: {
    display: "flex",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "#4db6ac",
  },
});

class CarPoolCard extends React.Component {
  state = {
    expanded: false,
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {this.props.name.split("", 1)}
            </Avatar>
          }
          action={
            <IconButton
              onClick={() => {
                this.props.updateReply(this.props.name, this.props.id);
                this.props.openModal();
              }}
            >
              <Reply />
            </IconButton>
          }
          title={this.props.name}
          subheader={this.props.title}
        />
        {/* <CardMedia
          className={classes.media}
          image="/static/images/cards/paella.jpg"
          title="Paella dish"
        /> */}
        <CardContent>
          <Typography component="p">{this.props.content}</Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing />
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Body:</Typography>
            <Typography paragraph>{this.props.content}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

CarPoolCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CarPoolCard);
