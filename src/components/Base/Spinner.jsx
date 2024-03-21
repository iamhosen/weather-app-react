import { Component } from "react";
import PropTypes from "prop-types";

export default class Spinner extends Component {
  render() {
    const { width = "1rem", color = "gray" } = this.props;

    const style = {
      width: width,
      height: width,
      borderTopColor: color,
    };

    return <span className="loader" style={style}></span>;
  }
}

Spinner.propTypes = {
  width: PropTypes.string,
  color: PropTypes.string,
};
