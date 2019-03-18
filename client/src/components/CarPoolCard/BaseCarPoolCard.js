import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CarPoolCard from "./CarPoolCard";
import LoadingCircle from "./LoadingCircle";
import thumbtackRed from "../Card/assets/thumbtackred.png";
import Styled from "styled-components";
import { Link } from "react-router-dom";

const styles = theme => ({
  card: {
    minWidth: 600,
    width: "100%",
    backgroundColor: "#81c784",
    borderRadius: "10px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const linkStyle = {
  textDecoration: "none",
  backgroundColor:"white",
  borderRadius: "10px"
};

const ImageWrapper = Styled.div`
  display: grid;
  grid-template-columns: repeat(1,1fr);
  justify-items: center;
  align-items: center;
  max-width: 100%;
`;

class BaseCarPoolCard extends Component {
  renderCards = () => {
    const posts = this.props.posts;
    return posts
      .filter(post => post.category === "Carpool")
      .slice(0, 9)
      .map((post, index) => {
        return (
          <CarPoolCard
            key={index}
            id={post.userId}
            name={post.name}
            title={post.title}
            content={post.content}
            updateReply={this.props.updateReply}
            openModal={this.props.openModal}
          />
        );
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card} square>
        <ImageWrapper>
          <img
            className={classes.tack}
            alt=""
            src={thumbtackRed}
            width="50px"
          />
        </ImageWrapper>
        <ImageWrapper>
          <Link to="/carpool" style={linkStyle}>
            <Button color="default" className={classes.button} size="large">
              {this.props.category}
            </Button>
          </Link>
        </ImageWrapper>
        <CardContent>
          {this.props.posts.length ? this.renderCards() : <LoadingCircle />}
        </CardContent>
        <CardActions />
      </Card>
    );
  }
}

BaseCarPoolCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BaseCarPoolCard);
