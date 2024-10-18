import { useState } from "react";
import { useFormik } from "formik";
import { Form, Row, Col } from "react-bootstrap";
import { productListvalidationSchema } from "../../schema/ValidationSchema";
import FormInput from "../../componets/FormInput";
import FormButton from "../../componets/FormButton";
import { useGetUserByIdQuery } from "../../core/services/user/user";
import { useCookies } from "react-cookie";
import { useCreateProductListingMutation } from "../../core/services/productListing/productListing";

export const AddProductList = () => {
  const [cookies] = useCookies(["USER_ID"]);
  const userId = cookies.USER_ID || "";
  const { data:userData } = useGetUserByIdQuery({ userId: userId });

  const [createProductListing, { isLoading, isError, isSuccess }] =
    useCreateProductListingMutation();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        description: "",
        vendorId: userData?.id,
      },

      validationSchema: productListvalidationSchema,

      onSubmit: async (values, { resetForm }) => {
        try {
          await createProductListing({ body: values }).unwrap();
          console.log("Product List created successfully");
          //console.log(values);
          resetForm();
        } catch (error) {
          console.log(error);
        }
      },
    });

  //input focus
  const [isFocusStates, setIsFocusStates] = useState({
    name: false,
    description: false,
  });

  const handleFocus = (field) => {
    setIsFocusStates((prev) => ({ ...prev, [field]: true }));
  };

  const manageBlur = (field) => {
    setIsFocusStates((prev) => ({ ...prev, [field]: false }));
  };

  return (
    <div className="p-4">
      <h3 className="mb-4">Add a Product List</h3>
      <Form onSubmit={handleSubmit}>
        {" "}
        <Row>
          <Col>
            <FormInput
              label="Name"
              id="name"
              name="name"
              type="text"
              value={values.name}
              onBlur={(e) => {
                manageBlur("name");
                handleBlur(e);
              }}
              onFocus={() => {
                handleFocus("name");
              }}
              onChange={handleChange}
              isFocused={isFocusStates.name}
              placeholder="Enter Name"
              error={touched.name && errors.name}
              errorMessage={errors.name}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <FormInput
              label="Description"
              id="description"
              name="description"
              type="textarea"
              value={values.description}
              onBlur={(e) => {
                manageBlur("description");
                handleBlur(e);
              }}
              onFocus={() => {
                handleFocus("description");
              }}
              onChange={handleChange}
              isFocused={isFocusStates.description}
              placeholder="Enter Description"
              rows={5}
              error={touched.description && errors.description}
              errorMessage={errors.companyName}
            />
          </Col>
        </Row>
        <FormButton className="mt-2" text="Add a Product List" type="submit" />
      </Form>
    </div>
  );
};

export default AddProductList;
