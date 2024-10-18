import { useState } from "react";
import { useFormik } from "formik";
import { Row, Col, Card, Table,Form } from "react-bootstrap";
import FormButton from "../../componets/FormButton";
import FormInput from "../../componets/FormInput";
import { OrderStatusEnum } from "../../enums/Enum";
import { ordervalidationSchema } from "../../schema/ValidationSchema";

const UpdateOrder = ({ order }) => {

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        status: OrderStatusEnum.PENDING,
      },

      validationSchema: ordervalidationSchema,

      onSubmit: async (values) => {
        try {
          console.log(values);
          //resetForm();
        } catch (error) {
          console.log(error);
        }
      },
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
    </Card>
  );
};

export default UpdateOrder;
