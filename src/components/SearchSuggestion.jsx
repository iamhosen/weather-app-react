import { Component } from "react";
import PropTypes from "prop-types";

export default class SearchSuggestion extends Component {
  render() {
    const { items = [], onClickItem } = this.props;

    return (
      <div
        id="dropdownUsers"
        className="z-10 absolute top-10 left-0 bg-white rounded-lg shadow-lg w-60 "
      >
        <ul
          className="h-48 py-2 overflow-y-auto text-gray-700 "
          aria-labelledby="dropdownUsersButton"
        >
          {items.length ? (
            items?.map((item) => (
              <li key={item.id} onClick={() => onClickItem(item)}>
                <span className="flex items-center px-4 py-2 hover:bg-gray-100 ">
                  {item.name}
                </span>
              </li>
            ))
          ) : (
            <li>
              <span className="flex items-center px-4 py-2 hover:bg-gray-100 ">
                No Items Found!{" "}
              </span>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

SearchSuggestion.propTypes = {
  items: PropTypes.array,
  onClickItem: PropTypes.func,
};
