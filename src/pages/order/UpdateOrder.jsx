import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Row, Col, Card, Table, Form } from "react-bootstrap";
import FormButton from "../../componets/FormButton";
import FormInput from "../../componets/FormInput";
import { OrderStatusEnum } from "../../enums/Enum";
import { ordervalidationSchema } from "../../schema/ValidationSchema";
import {
  useUpdateOrderMutation,
  useGetOrdersByIdQuery,
} from "../../core/services/order/order";
import { useGetUserByIdQuery } from "../../core/services/user/user";
import emailjs from "@emailjs/browser";

const UpdateOrder = ({ order }) => {
  const orderId = order.id;
  const userId = order.customerId;
  //console.log(order);

  const [updateOrder, { isLoading, isError, isSuccess }] =
    useUpdateOrderMutation();
  const { data: orders } = useGetOrdersByIdQuery({
    orderId: orderId,
  });
  const { data: userData } = useGetUserByIdQuery({ userId });

  // States for email, name, and status
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  // Update user data when fetched
  useEffect(
    () => {
      if (order) {
        setStatus(order.status);
      }
      if (userData) {
        setEmail(userData.email);
      }
    },
    [order],
    [userData]
  );

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        customerId: order?.customerId,
        items: [
          {
            productId: order?.productId,
            quantity: order?.quantity,
            price: order?.price,
          },
        ],
        totalAmount: order?.totalAmount,
        status: order?.status,
      },

      validationSchema: ordervalidationSchema,

      onSubmit: async (values) => {
        const payload = {
          customerId: values.customerId,
          items: [
            {
              productId: values.productId,
              quantity: values.quantity,
              price: values.price,
            },
          ],
          totalAmount: values.totalAmount,
          status: Number(values.status),
        };
        try {
          const response = await updateOrder({
            orderId: orderId,
            body: payload,
          }).unwrap();

          // EmailJS configuration

          const serviceId = "service_bsp5jbo";
          const templateId = "template_vx5919q";
          const publicKey = "XJEAh0wFZnx63vv4n";

          let statusNew;
          if (Number(values.status) === OrderStatusEnum.PENDING) {
            statusNew = "Pending";
          } else if (Number(values.status) === OrderStatusEnum.INPROGRESS) {
            statusNew = "Inprogress";
          } else if (Number(values.status) === OrderStatusEnum.DELIVERED) {
            statusNew = "Delivered";
          }else if (Number(values.status) === OrderStatusEnum.CANCELLED) {
            statusNew = "Canclled";
          }else if (Number(values.status) === OrderStatusEnum.COMPLETED) {
            statusNew = "Completed";
          }

          // Template params for email
          const templateParams = {
            email: email,
            status: statusNew,
          };

          // Send email via EmailJS
          emailjs
            .send(serviceId, templateId, templateParams, publicKey)
            .then((response) => {
              console.log("Email sent successfully!", response);
              setEmail("");
              setStatus("");
            });
        } catch (error) {
          console.log(error);
        }
      },
      enableReinitialize: true,
    });

  //input focus
  const [isFocusStates, setIsFocusStates] = useState({
    email: false,
    password: false,
  });

  const handleFocus = (field) => {
    setIsFocusStates((prev) => ({ ...prev, [field]: true }));
  };

  const manageBlur = (field) => {
    setIsFocusStates((prev) => ({ ...prev, [field]: false }));
  };

  return (
    <>
      <Card className="mt-2">
        <Card.Body>
          <Row>
            <Col>
              <h2>Update Order</h2>
              <p className="mb-4">Order Number: {order.id}</p>
            </Col>

            <Form onSubmit={handleSubmit}>
              <FormInput
                id="status"
                label="Status"
                name="status"
                type="select"
                value={values.status}
                onBlur={(e) => {
                  manageBlur("status");
                  handleBlur(e);
                }}
                onFocus={() => {
                  handleFocus("status");
                }}
                onChange={handleChange}
                isFocused={isFocusStates.status}
                options={[
                  { value: OrderStatusEnum.PENDING, label: "Pending" },
                  { value: OrderStatusEnum.INPROGRESS, label: "In Progress" },
                  { value: OrderStatusEnum.DELIVERED, label: "Delivered" },
                  { value: OrderStatusEnum.CANCELLED, label: "Cancelled" },
                  { value: OrderStatusEnum.COMPLETED, label: "Completed" },
                ]}
                error={touched.status && errors.status}
                errorMessage={errors.status}
              />

              <FormButton className="mt-2" text="Update order" type="submit" />
            </Form>
          </Row>
        </Card.Body>
        {isError && <p>Error updating order</p>}
        {isSuccess && (
          <span style={{ color: "green", margin: "18px" }}>
            User updated successfully!
          </span>
        )}
      </Card>
    </>
  );
};

export default UpdateOrder;
