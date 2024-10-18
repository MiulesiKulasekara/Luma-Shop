import { useState } from "react";
import { useFormik } from "formik";
import { Form, Container, Row, Col } from "react-bootstrap";
import { adminsignupvalidationSchema } from "../schema/ValidationSchema";
import FormInput from "../componets/FormInput";
import FormButton from "../componets/FormButton";
import { UserRoleEnum} from "../enums/Enum";
import { UserStatusEnum } from "../enums/Enum";

const AdminSignup = () => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: UserRoleEnum.ADMIN,
        status: UserStatusEnum.INACTIVE
      },

      validationSchema: adminsignupvalidationSchema,

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
    <div className="register-page">
      <Container
        className="d-flex align-items-center"
        style={{ minHeight: "100vh", paddingLeft: "100px" }}
      >
        <div
          className="shadow p-5 bg-white rounded"
          style={{ maxWidth: "700px", width: "100%" }}
        >
          <h3 className="text-center mb-4">Sign Up</h3>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <FormInput
                  label="First Name"
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={values.firstName}
                  onBlur={(e) => {
                    manageBlur("firstName");
                    handleBlur(e);
                  }}
                  onFocus={() => {
                    handleFocus("firstName");
                  }}
                  onChange={handleChange}
                  isFocused={isFocusStates.firstName}
                  placeholder="Enter First Name"
                  error={touched.firstName && errors.firstName}
                  errorMessage={errors.firstName}
                />
              </Col>
              <Col md={6}>
                <FormInput
                  label="Last Name"
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={values.lastName}
                  onBlur={(e) => {
                    manageBlur("lastName");
                    handleBlur(e);
                  }}
                  onFocus={() => {
                    handleFocus("lastName");
                  }}
                  onChange={handleChange}
                  isFocused={isFocusStates.lastName}
                  placeholder="Enter Last Name"
                  error={touched.lastName && errors.lastName}
                  errorMessage={errors.lastName}
                />
              </Col>
            </Row>

            <FormInput
              label="Email address"
              id="email"
              name="email"
              type="email"
              value={values.email}
              onBlur={(e) => {
                manageBlur("email");
                handleBlur(e);
              }}
              onFocus={() => {
                handleFocus("email");
              }}
              onChange={handleChange}
              isFocused={isFocusStates.email}
              placeholder="Enter email"
              error={touched.email && errors.email}
              errorMessage={errors.email}
            />

            <Row className="mt-3">
              <Col md={6}>
                <FormInput
                  label="Password"
                  id="password"
                  name="password"
                  type="password"
                  value={values.password}
                  onBlur={(e) => {
                    manageBlur("password");
                    handleBlur(e);
                  }}
                  onFocus={() => {
                    handleFocus("password");
                  }}
                  onChange={handleChange}
                  isFocused={isFocusStates.password}
                  placeholder="Enter password"
                  error={touched.password && errors.password}
                  errorMessage={errors.password}
                />
              </Col>
              <Col md={6}>
                <FormInput
                  label="Confirm Password"
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  onBlur={(e) => {
                    manageBlur("confirmPassword");
                    handleBlur(e);
                  }}
                  onFocus={() => {
                    handleFocus("confirmPassword");
                  }}
                  onChange={handleChange}
                  isFocused={isFocusStates.confirmPassword}
                  placeholder="Enter password again"
                  error={touched.confirmPassword && errors.confirmPassword}
                  errorMessage={errors.confirmPassword}
                />
              </Col>
            </Row>

            <div className="d-flex justify-content-center mt-3">
              <FormButton
                className="w-50" // Set button width to 50%
                text="Sign Up"
                type="submit"
              />
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default AdminSignup;
