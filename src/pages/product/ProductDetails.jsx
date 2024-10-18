import { Row, Col, Card } from "react-bootstrap";
import { UserStatusEnum } from "../../enums/Enum";
import {
  ActiveStatus,
  InactiveStatus,
  PendingStatus,
} from "../../componets/UserStatus";
import productImg from "../../assets/images/product/default.jpeg";
import {
  useGetUserProductsQuery,
  useUpdateProductMutation,
} from "../../core/services/product/product";

function ProductDetails({ product }) {

  //const { data: user } = useGetUserByIdQuery({ userId: userId });


  return (
    <Card className="mt-2">
      <Card.Body>
        <Row>
          <Col
            md={5}
            style={{
              backgroundImage: `url(${productImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "100%",
              minHeight: "80vh",
            }}
          ></Col>

          <Col>
            <div style={{ fontSize: "40px", fontWeight: "500" }}>
              {product.name}
            </div>
            <div
              className="d-flex"
              style={{ fontSize: "13px", fontWeight: "400" }}
            >
              <div className="me-2">Living Room Furniture - </div>
              <div>{product.category}</div>
            </div>

            <p className="mt-2" style={{ fontSize: "30px", fontWeight: "500" }}>
              {product.price} LKR
            </p>

            <p>{product.description}</p>

            <div className="d-flex">
              <p style={{ fontWeight: "500" }} className="me-2">
                Quantity:
              </p>
              <p>{product.stockQuantity}</p>
            </div>

            <div className="d-flex">
              <p style={{ fontWeight: "500" }} className="me-2">
                Material:
              </p>
              <p>{product.material}</p>
            </div>

            {/* <div className="d-flex">
              <p style={{ fontWeight: "500" }} className="me-2">
                Vendor:
              </p>
              <p>{product.vendorId}</p>
            </div> */}

            <div className="d-flex">
              <p style={{ fontWeight: "500" }} className="me-2">
                Color:
              </p>

              {product.colorOptions.map((color, index) => (
                <div
                  key={index}
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: color,
                    borderRadius: "50%",
                    marginRight: "10px",
                    border: `1px solid ${
                      color.toLowerCase() === "#ffff" ||
                      color.toLowerCase() === "white"
                        ? "#000"
                        : color
                    }`,
                  }}
                ></div>
              ))}
            </div>

            <div className="d-flex">
              <p style={{ fontWeight: "500" }} className="me-2">
                Dimensions :{" "}
              </p>

              <i className="me-2">Width: {product.dimensions.width} m |</i>
              <i className="me-2">Height: {product.dimensions.height} m |</i>
              <i className="me-2">Depth: {product.dimensions.depth} m</i>
            </div>

            <div className="d-flex">
              <p style={{ fontWeight: "500" }} className="me-2">
                Weight:
              </p>
              <i className="me-2">{product.weight} Kg</i>
            </div>

            <div className="d-flex">
              <p style={{ fontWeight: "500" }} className="me-2">
                Warranty:
              </p>
              <i className="me-2">{product.warrantyPeriod} months</i>
            </div>

            {/* <div className="d-flex">
              <i className="me-2">isArchived: {product.isArchived} |</i>
              <i className="me-2">isFeatured: {product.isFeatured} |</i>
              <i className="me-2">listingId: {product.assemblyRequired} </i>
            </div> */}

            <div className="d-flex">
              <i className="me-2">Archived |</i>
              <i className="me-2">Featured |</i>
              <i className="me-2">Assembly Required</i>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default ProductDetails;
