import PropTypes from "prop-types";
import React from "react";
import "./Pagination.css";

Pagination.propTypes = {
  pagination: PropTypes.object.isRequired,
  onPageChanged: PropTypes.func,
};

Pagination.defaultProps = {
  onPageChanged: null,
};

function Pagination(props) {
  const { pagination, onPageChanged } = props;
  const { page, limit, totalRows } = pagination;
  const totalPages = Math.ceil(totalRows / limit) || 1;

  // console.log(page, limit, totalPages);
  function handlePageChanged(newPage) {
    if (onPageChanged) {
      onPageChanged(newPage);
    } else console.log("error");
  }

  return (
    <div className="pagination-container">
      <button
        className="btn-pagination"
        type="button"
        disabled={page <= 1}
        onClick={() => handlePageChanged(page - 1)}
      >
        Prev
      </button>
      {Array.from(Array(5)).map((item, index) => (
        <button
          key={index}
          className="btn-pagination"
          type="button"
          onClick={() => handlePageChanged(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className="btn-pagination"
        type="button"
        disabled={page >= totalPages}
        onClick={() => handlePageChanged(page + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
