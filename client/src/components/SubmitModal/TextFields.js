import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Styled from "styled-components";
import MenuItem from "@material-ui/core/MenuItem";
// import axios from "axios";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 550,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

const ButtonWrapper = Styled.div`
  display: grid;
  grid-template-columns: 120px 120px;
  justify-content: end;
  justify-items: center;
  margin-top: 20px;
  
`;

const categories = [
  {
    value: "Community Needs",
  },
  {
    value: "Events",
  },
  {
    value: "Carpool",
  },
  {
    value: "General",
  },
  {
    value: "Equipment/Tools",
  },
  {
    value: "Skills/Services",
  },
];

class TextFields extends React.Component {
  state = {
    title: "",
    body: "",
    category: "",
    userId: "",
    location: "",
    name: "",
  };

  componentDidMount = () => {
    fetch("/api/session", {
      method: "Get", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "include", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: "follow", // manual, *follow, error
      referrer: "client", // no-referrer, *client
    })
      .then(res => res.json())
      .then(
        result => {
          console.log(result.data.user);
          this.setState({
            userId: result.data.user,
            location: result.data.loc,
            name: result.data.name,
          });
          console.log(this.state);
        },
        error => {
          console.log(error);
        }
      );
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = () => {
    const newPost = {
      userId: this.props.id,
      title: this.state.title,
      content: this.state.body,
      location: this.props.location,
      name: this.props.name,
      category: this.state.category,
    };

    fetch("/api/posts", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "include", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(newPost), // body data type must match "Content-Type" header
    }).then(
      result => {
        this.props.updatePosts();
      },

      error => {
        console.log(error);
      }
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="title"
            label="Title"
            className={classes.textField}
            value={this.state.title}
            onChange={this.handleChange("title")}
            margin="normal"
            helperText="Enter a title!"
          />
          <TextField
            id="standard-multiline-flexible"
            label="Post"
            multiline
            rowsMax="8"
            value={this.state.body}
            onChange={this.handleChange("body")}
            className={classes.textField}
            margin="normal"
          />
          <TextField
            id="standard-select-currency"
            select
            label="Select"
            className={classes.textField}
            value={this.state.category}
            onChange={this.handleChange("category")}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Please select a category for your post."
            margin="normal"
          >
            {categories.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </form>
        <label htmlFor="contained-button-file">
          <ButtonWrapper>
            <Button
              variant="outlined"
              color="secondary"
              onClick={this.props.closeModal}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              variant="outlined"
              component="span"
              className={classes.button}
              onClick={() => {
                this.handleSubmit();
                this.props.closeModal();
              }}
            >
              Submit
            </Button>
          </ButtonWrapper>
        </label>
      </div>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
