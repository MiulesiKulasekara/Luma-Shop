import { Row, Col, Card } from "react-bootstrap";
import { UserRoleEnum } from "../../enums/Enum";
import { useGetUserByIdQuery } from "../../core/services/user/user";
import { useCookies } from "react-cookie";

const ProductListDetails = ({ productListDetails }) => {
  const [cookies] = useCookies(["USER_ID"]);
  const userId = cookies.USER_ID || "";
  const { data: user } = useGetUserByIdQuery({ userId: userId });

  return (
    <div>
      <Card className="mt-2">
        <Card.Body>
          <Row className="mb-2">
            <Col>
              <h2>{productListDetails.name}</h2>
            </Col>
          </Row>
          <Row>
            {user?.role !== UserRoleEnum.VENDOR ? (
              <Col md={2}>
                <h5>Vendor</h5>
                <p>{productListDetails.vendorId}</p>
              </Col>
            ) : null}
            <Col md={2}>
              <h5>Status</h5>
              <p>{productListDetails.isActive === true ? "Active" : "Deactive"}</p>
            </Col>
            <Col>
              <h5>Description</h5>
              <p>{productListDetails.description}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductListDetails;
