import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Table, Spinner, Alert } from "react-bootstrap";
import ProductDetails from "./ProductDetails";
import TablePagination from "../../componets/TablePagination";
import FormButton from "../../componets/FormButton";
import { RowsPerPageEnum, UserRoleEnum } from "../../enums/Enum";
import { useGetUserByIdQuery } from "../../core/services/user/user";
import { useGetAllProductsQuery } from "../../core/services/product/product";
import { useCookies } from "react-cookie";

const ProductList = () => {
  const [cookies] = useCookies(["USER_ID"]);
  const userId = cookies.USER_ID || "";
  const { data } = useGetUserByIdQuery({ userId: userId });
  //console.log("Role :", data.role);

  const { data: products, isLoading, isError } = useGetAllProductsQuery();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [paginatedProduct, setPaginatedProduct] = useState([]);

  const rowsPerPage = RowsPerPageEnum.MAX_TABLE_ROWS;

  useEffect(() => {
    if (products && products.length > 0) {
      const initialPageData = products.slice(0, rowsPerPage);
      setPaginatedProduct(initialPageData);
    }
  }, [products, rowsPerPage]);

  const handleRowClick = (product) => {
    if (selectedProduct && selectedProduct.id === product.id) {
      setSelectedProduct(null);
    } else {
      setSelectedProduct(product);
    }
  };

  const handlePageChange = (paginatedData) => {
    setPaginatedProduct(paginatedData);
  };

  // const filteredProductList =
  //   data?.role === UserRoleEnum.VENDOR
  //     ? paginatedProduct.filter((prod) => prod.vendorId === data.id)
  //     : paginatedProduct;

  /********************************************************************************/
  // Display loading, error, and empty states
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" />
      </div>
    );
  }

  if (isError) {
    return <Alert variant="danger">Failed to load products.</Alert>;
  }

  if (!products || products.length === 0) {
    return <Alert variant="warning">No products found.</Alert>;
  }
  /********************************************************************************/

  return (
    <div className="p-4">
      <Row className="mb-2">
        <Col>
          <h2>All Products</h2>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col className="d-flex justify-content-end">
          {data?.role === UserRoleEnum.VENDOR && (
            <Link to="/admin/product/add">
              <FormButton text="+ Add a Product" type="submit"></FormButton>
            </Link>
          )}
        </Col>
      </Row>

      <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>price</th>
                <th>Quantity</th>
                {/* <th>Vendor</th> */}
                <th>Material</th>
                <th>Description</th>
                {data?.role === UserRoleEnum.VENDOR ? (
                  <th>Edit</th>
                ) : (
                  <th>View</th>
                )}
              </tr>
            </thead>
            <tbody>
              {paginatedProduct.map((product, index) => (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td className="table-cell">{product.name}</td>
                  <td className="table-cell">{product.price}</td>
                  <td className="table-cell">{product.stockQuantity}</td>
                  {/* <td className="table-cell">{product.vendorId}</td> */}
                  <td className="table-cell">{product.material}</td>
                  <td className="table-cell">{product.description}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleRowClick(product)}
                    >
                      <i className="bi bi-eye"></i>
                    </Button>{" "}
                    {data?.role === UserRoleEnum.VENDOR && (
                      <Link
                        to={`/admin/product/update/${product.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Button variant="outline-secondary" size="sm">
                          <i className="bi bi-pencil"></i>
                        </Button>
                      </Link>
                    )}{" "}
                    {data?.role === UserRoleEnum.VENDOR && (
                      <Button variant="outline-danger" size="sm">
                        <i className="bi bi-trash3"></i>
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <TablePagination
            data={products}
            rowsPerPage={rowsPerPage}
            onPageChange={handlePageChange}
          />
        </Col>
      </Row>

      {selectedProduct && (
        <Row>
          <Col>
            <ProductDetails product={selectedProduct} />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ProductList;
