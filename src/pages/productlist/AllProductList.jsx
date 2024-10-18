import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Table, Spinner, Alert,Form } from "react-bootstrap";
import ProductListDetails from "./ProductListDetails";
import TablePagination from "../../componets/TablePagination";
import FormButton from "../../componets/FormButton";
import { RowsPerPageEnum, UserRoleEnum } from "../../enums/Enum";
import { useGetUserByIdQuery } from "../../core/services/user/user";
import {
  useGetAllProductListingsQuery,
  useDeleteProductListingMutation,
} from "../../core/services/productListing/productListing";
import { useCookies } from "react-cookie";

const AllProductList = () => {
  const [cookies] = useCookies(["USER_ID"]);
  const userId = cookies.USER_ID || "";
  const { data } = useGetUserByIdQuery({ userId: userId });

  //Get all data
  const {
    data: productList,
    isLoading,
    isError,
  } = useGetAllProductListingsQuery();

  //Delete data
  const [deleteProductList] = useDeleteProductListingMutation();

  const [selectedProductList, setSelectedProductList] = useState(null);
  const [paginatedProductList, setPaginatedProductList] = useState([]);
  const [filteredProductList, setFilteredProductList] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search

  const rowsPerPage = RowsPerPageEnum.MAX_TABLE_ROWS;

  //Arrange data for table
  useEffect(() => {
    if (productList && productList.length > 0) {
      const filteredProductList =
        data?.role === UserRoleEnum.VENDOR
          ? productList.filter(
              (productList) => productList.vendorId === data.id
            )
          : productList;
      setFilteredProductList(filteredProductList);
      const initialPageData = filteredProductList.slice(0, rowsPerPage);
      setPaginatedProductList(initialPageData);
    }
  }, [productList, data, rowsPerPage]);

  //View mode handling
  const handleRowClick = (productList) => {
    if (selectedProductList && selectedProductList.id === productList.id) {
      setSelectedProductList(null);
    } else {
      setSelectedProductList(productList);
    }
  };

  //Handle page changes due to paginations
  const handlePageChange = (paginatedData) => {
    setPaginatedProductList(paginatedData);
  };

  const handleDeleteUser = async (productListingId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this product list?"
    );
    if (isConfirmed) {
      try {
        await deleteProductList({ productListingId: productListingId });
        {
          isSuccessDelete && (
            <span style={{ color: "green" }}>Product List deleted successfully!</span>
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // load product list
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" />
      </div>
    );
  }

  if (isError) {
    return <Alert variant="danger">Failed to load product list.</Alert>;
  }

  if (!productList || productList.length === 0) {
    return <Alert variant="warning">No product list found.</Alert>;
  }

  return (
    <div className="p-4">
      <Row className="mb-2">
        <Col>
          <h2>All Product List</h2>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col className="d-flex justify-content-end">
          {data?.role === UserRoleEnum.VENDOR && (
            <Link to="/admin/product/list/add">
              <FormButton text="+ Add a product List" type="submit" />
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
                {data?.role !== UserRoleEnum.VENDOR && <th>Vendor</th>}
                <th>Status</th>
                <th>Description</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProductList.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="table-cell">{product.name}</td>
                  {data?.role !== UserRoleEnum.VENDOR && (
                    <td className="table-cell">
                      {product.vendorId.companyName}
                    </td>
                  )}
                  <td className="table-cell">
                    {product.isActive === true ? "Active" : "Deactive"}
                  </td>
                  <td className="table-cell">{product.description}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleRowClick(product)}
                    >
                      <i className="bi bi-eye"></i>
                    </Button>{" "}
                    <Link
                      to={`/admin/product/list/update/${product.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button variant="outline-secondary" size="sm">
                        <i className="bi bi-pencil"></i>
                      </Button>{" "}
                    </Link>
                    {data?.role === UserRoleEnum.VENDOR && (
                      <Button variant="outline-danger" size="sm" onClick={() => handleDeleteUser(product?.id)}>
                        <i className="bi bi-trash3"></i>
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {filteredProductList && (
            <TablePagination
              data={filteredProductList}
              rowsPerPage={rowsPerPage}
              onPageChange={handlePageChange}
            />
          )}
        </Col>
      </Row>

      {selectedProductList && (
        <Row className="">
          <Col>
            <ProductListDetails productListDetails={selectedProductList} />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default AllProductList;
