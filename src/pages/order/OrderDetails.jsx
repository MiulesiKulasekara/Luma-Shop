import { Row, Col, Card, Table } from "react-bootstrap";
import { OrderStatusEnum } from "../../enums/Enum";
import {
  PendingStatus,
  InprogressStatus,
  DeliveredStatus,
  CanclledStatus,
  CompletedStatus,
} from "../../componets/OrderStatus";

export const OrderDetails = ({ order }) => {
  var orderTable = order.items;
  console.log(orderTable);
  return (
    <Card className="mt-2">
      <Card.Body>
        <Row>
          <Col>
            <h2>Order Number: {order.id}</h2>
          </Col>

          <Col md={2}>
            {order.status === OrderStatusEnum.PENDING && <PendingStatus />}
            {order.status === OrderStatusEnum.INPROGRESS && (
              <InprogressStatus />
            )}
            {order.status === OrderStatusEnum.DELIVERED && <DeliveredStatus />}

            {order.status === OrderStatusEnum.CANCELLED && <CanclledStatus />}
            {order.status === OrderStatusEnum.COMPLETED && <CompletedStatus />}
          </Col>
        </Row>

        <Row>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th>Item Summary</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {orderTable.map((orders, index) => (
                  <tr key={index}>
                    <td className="table-cell">{orders.productId}</td>
                    <td className="table-cell">{orders.quantity}</td>
                    <td className="table-cell">{orders.price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>

        <Row>
          <h4>Sub Total : {order.totalAmount}</h4>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default OrderDetails;
