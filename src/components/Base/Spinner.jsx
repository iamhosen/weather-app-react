import PropTypes from "prop-types";

const Spinner = ({ width = "1rem", color = "gray" }) => {
  const style = {
    width: width,
    height: width,
    borderTopColor: color,
  };
  return <span className="loader" style={style}></span>;
};

Spinner.propTypes = {
  width: PropTypes.string,
  color: PropTypes.string,
};

export default Spinner;
