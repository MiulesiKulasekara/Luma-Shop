import { useState } from "react";
import { Row, Col, Button, Table } from "react-bootstrap";
import VendorRatingsDetails from "./VendorRatingsDetails";
import TablePagination from "../../componets/TablePagination";
import { ratings } from "../Test/Data";
import { RowsPerPageEnum } from "../../enums/Enum";

const VendorRatingsList = () => {
  const [selectedRatings, setSelectedRatings] = useState(null);
  const [paginatedRatings, setPpaginatedRatings] = useState(
    ratings.slice(0, RowsPerPageEnum.MAX_TABLE_ROWS)
  );

  const rowsPerPage = RowsPerPageEnum.MAX_TABLE_ROWS;

  const handleRowClick = (ratings) => {
    if (selectedRatings && selectedRatings.id === ratings.id) {
      setSelectedRatings(null);
    } else {
      setSelectedRatings(ratings);
    }
  };

  const handlePageChange = (paginatedData) => {
    setPpaginatedRatings(paginatedData);
  };

  return (
    <div className="p-4">
      <Row className="mb-2">
        <Col>
          <h2>All Ratings</h2>
        </Col>
      </Row>

      <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Customer</th>
                <th>Vendor</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRatings.map((ratings,index) => (
                <tr key={index}>
                  <td>{ratings.id}</td>
                  <td className="table-cell">{ratings.customerId}</td>
                  <td className="table-cell">{ratings.vendorId}</td>
                  <td className="table-cell">{ratings.rating}</td>
                  <td className="table-cell">{ratings.comment}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleRowClick(ratings)}
                    >
                      <i className="bi bi-eye"></i>
                    </Button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <TablePagination
            data={ratings}
            rowsPerPage={rowsPerPage}
            onPageChange={handlePageChange}
          />
        </Col>
      </Row>

      {selectedRatings && (
        <Row className="">
          <Col>
            <VendorRatingsDetails ratings={selectedRatings} />
          </Col>
        </Row>
      )}
    </div>
  );
};


export default VendorRatingsList;
