import React from "react";

interface PaginationProps {
  totalItems: number;
  currentPage: number;
  setPage: (page: number) => void;
}
const MAX_PAGE_BUTTONS = 5;
const MAX_LENGTH_COL = 9;

const PaginationControl: React.FC<PaginationProps> = ({
  totalItems,
  currentPage,
  setPage,
}) => {
  const totalPages = Math.ceil(totalItems / MAX_LENGTH_COL);
  const startPage = Math.max(1, currentPage - Math.floor(MAX_PAGE_BUTTONS / 2));
  const endPage = Math.min(totalPages, startPage + MAX_PAGE_BUTTONS - 1);
  const adjustedStartPage = Math.max(1, endPage - MAX_PAGE_BUTTONS + 1);

  return (
    <div className="flex justify-between p-3">
      <p className="font-medium">Total: {totalItems} </p>
      <div className="join">
        <button
          className="join-item btn btn-xs btn-ghost"
          onClick={() => setPage(1)}
        >
          «
        </button>
        {[...Array(endPage - adjustedStartPage + 1).keys()].map((index) => {
          const pageNumber = adjustedStartPage + index;
          return (
            <button
              key={pageNumber}
              className={`join-item btn btn-xs ${
                pageNumber === currentPage ? "btn-active" : ""
              }`}
              onClick={() => setPage(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
        <button
          className="join-item btn btn-xs btn-ghost"
          onClick={() => setPage(totalPages)}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default PaginationControl;
