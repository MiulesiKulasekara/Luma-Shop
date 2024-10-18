import React, { useState } from 'react';
import { Pagination } from 'react-bootstrap';

const TablePagination = ({ data, rowsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [visiblePages, setVisiblePages] = useState([1, 2]); // Track visible pages
  
  // Calculate total pages
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    
    // Calculate the current rows for this page
    const indexOfLastRow = pageNumber * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

    onPageChange(currentRows); // Pass the paginated rows back to the parent

    // Adjust visible pages dynamically as user clicks on next/prev pages
    if (pageNumber >= visiblePages[1] && pageNumber !== totalPages) {
      setVisiblePages([pageNumber, Math.min(pageNumber + 1, totalPages)]);
    } else if (pageNumber <= visiblePages[0] && pageNumber !== 1) {
      setVisiblePages([Math.max(pageNumber - 1, 1), pageNumber]);
    }
  };

  // Jump to first page
  const goToFirstPage = () => {
    setVisiblePages([1, 2]);
    handlePageChange(1);
  };

  // Jump to last page
  const goToLastPage = () => {
    setVisiblePages([totalPages - 1, totalPages]);
    handlePageChange(totalPages);
  };

  return (
    <div className="d-flex justify-content-end">
      <Pagination>
        <Pagination.First 
          onClick={goToFirstPage} 
          disabled={currentPage === 1} 
        />
        
        <Pagination.Prev 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1} 
        />

        {visiblePages[0] > 1 && (
          <Pagination.Ellipsis 
            onClick={() => handlePageChange(visiblePages[0] - 1)} 
          />
        )}
        
        {visiblePages.map((pageNumber) => (
          <Pagination.Item
            key={pageNumber}
            active={pageNumber === currentPage}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </Pagination.Item>
        ))}
        
        {visiblePages[1] < totalPages && (
          <Pagination.Ellipsis 
            onClick={() => handlePageChange(visiblePages[1] + 1)} 
          />
        )}

        <Pagination.Next 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages} 
        />

        <Pagination.Last 
          onClick={goToLastPage} 
          disabled={currentPage === totalPages} 
        />
      </Pagination>
    </div>
  );
};

export default TablePagination;


