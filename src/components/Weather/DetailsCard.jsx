import PropTypes from "prop-types";

const DetailsCard = ({ title, value, unit, children }) => {
  return (
    <div className="bg-white rounded-lg flex flex-col p-2 pb-6 items-center">
      <span className="self-start text-gray-400 text-sm mb-2">{title}</span>
      {children}
      <div className="text-center">
        {value}
        {unit && <span className="ml-1 text-xs">{unit}</span>}
      </div>
    </div>
  );
};

DetailsCard.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  unit: PropTypes.string,
};

export default DetailsCard;
