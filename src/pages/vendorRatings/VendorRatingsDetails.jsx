import { Row, Card } from "react-bootstrap";
import StarRating from "../../componets/StarRating";

const VendorRatingsDetails = ({ ratings }) => {
  return (
    <div>
      <Card className="mt-2">
        <Card.Body>
          <Row>
            <h3>Vendor ID : {ratings.vendorId}</h3>
          </Row>
          <Row>
            <h3 className="mt-2">
              <StarRating rating={ratings.rating} />
            </h3>
          </Row>

          <div className="d-flex">
            <p style={{ fontWeight: "500" }} className="me-2">Customer ID : </p>
            <p>{ratings.customerId}</p>
          </div>

          <p>{ratings.comment}</p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default VendorRatingsDetails;
