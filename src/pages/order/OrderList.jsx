import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Table } from "react-bootstrap";
import OrderDetails from "./OrderDetails";
import UpdateOrder from "./UpdateOrder"; // Import the UpdateOrder component
import TablePagination from "../../componets/TablePagination";
import { orders } from "../Test/Data";
import {
  PendingStatus,
  InprogressStatus,
  DeliveredStatus,
  CanclledStatus,
  CompletedStatus,
} from "../../componets/OrderStatus";
import { OrderStatusEnum, RowsPerPageEnum } from "../../enums/Enum";
import { useGetAllOrderQuery } from "../../core/services/order/order";
import { useGetUserByIdQuery } from "../../core/services/user/user";

export const OrderList = () => {
  //Get all data
  const { data: order, isLoading, isError } = useGetAllOrderQuery();
  //console.log(order);

  //Get user data
  //const { data: userData } = useGetUserByIdQuery({ userId: order.customerId });

  const [selectedOrder, setSelectedOrder] = useState(null); // Store selected order for OrderDetails
  const [selectedUpdateOrder, setSelectedUpdateOrder] = useState(null); // Store selected order for UpdateOrder
  const [paginatedOrder, setPaginatedOrder] = useState([]);

  const rowsPerPage = RowsPerPageEnum.MAX_TABLE_ROWS;

  //Arrange data for table
  useEffect(() => {
    if (order && order.length > 0) {
      const initialPageData = order.slice(0, rowsPerPage);
      setPaginatedOrder(initialPageData);
    }
  }, [order, rowsPerPage]);

  const handleRowClick = (order) => {
    if (selectedOrder && selectedOrder.id === order.id) {
      // If the same order is clicked again, hide OrderDetails
      setSelectedOrder(null);
    } else {
      // Show the clicked order's details
      setSelectedOrder(order);
      setSelectedUpdateOrder(null); // Hide UpdateOrder if OrderDetails is displayed
    }
  };

  const handleUpdateClick = (order) => {
    if (selectedUpdateOrder && selectedUpdateOrder.id === order.id) {
      // If the same order is clicked again, hide UpdateOrder
      setSelectedUpdateOrder(null);
    } else {
      // Show the clicked order's update form
      setSelectedUpdateOrder(order);
      setSelectedOrder(null); // Hide OrderDetails if UpdateOrder is displayed
    }
  };

  const handlePageChange = (paginatedData) => {
    setPaginatedOrder(paginatedData);
    setSelectedOrder(null);
    setSelectedUpdateOrder(null);
  };

  return (
    <div className="p-4">
      <Row className="mb-2">
        <Col>
          <h2>All Orders</h2>
        </Col>
      </Row>

      <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>Order number</th>
                {/* <th>customer</th> */}
                <th>Total Amount</th>
                <th>Status</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrder.map((order,index) => (
                <tr key={index+1}>
                  <td>{order.id}</td>
                  {/* <td className="table-cell">{order.customerId}</td> */}
                  <td className="table-cell">{order.totalAmount}</td>
                  <td className="table-cell">
                    {order.status === OrderStatusEnum.PENDING && (
                      <PendingStatus />
                    )}
                    {order.status === OrderStatusEnum.INPROGRESS && (
                      <InprogressStatus />
                    )}
                    {order.status === OrderStatusEnum.DELIVERED && (
                      <DeliveredStatus />
                    )}

                    {order.status === OrderStatusEnum.CANCELLED && (
                      <CanclledStatus />
                    )}
                    {order.status === OrderStatusEnum.COMPLETED && (
                      <CompletedStatus />
                    )}
                  </td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleRowClick(order)}
                    >
                      <i className="bi bi-eye"></i>
                    </Button>{" "}
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleUpdateClick(order)} // Handle pencil icon click
                    >
                      <i className="bi bi-pencil"></i>
                    </Button>{" "}
                    <Button variant="outline-danger" size="sm">
                      <i className="bi bi-trash3"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <TablePagination
            data={orders}
            rowsPerPage={rowsPerPage}
            onPageChange={handlePageChange}
          />
        </Col>
      </Row>

      {/* Show OrderDetails if selectedOrder is set and UpdateOrder is not visible */}
      {selectedOrder && !selectedUpdateOrder && (
        <Row>
          <Col>
            <OrderDetails order={selectedOrder} />
          </Col>
        </Row>
      )}

      {/* Show UpdateOrder if selectedUpdateOrder is set and OrderDetails is not visible */}
      {selectedUpdateOrder && !selectedOrder && (
        <Row>
          <Col>
            <UpdateOrder order={selectedUpdateOrder} />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default OrderList;
