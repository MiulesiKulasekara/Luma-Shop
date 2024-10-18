import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Container, Row, Col, Form } from "react-bootstrap";
import { adminsigninvalidationSchema } from "../schema/ValidationSchema";
import FormInput from "../componets/FormInput";
import FormButton from "../componets/FormButton";
import { useLoginUserMutation } from "../core/services/auth/auth";
import "../css/admin-auth.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { requestForToken } from "../core/services/firebase/firebase";

const AdminSignin = () => {
  const [loginService] = useLoginUserMutation();
  const navigate = useNavigate()
  const [cookies, setCookie] = useCookies(["AUTH_TOKEN_KEY", "USER_ID"]);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: adminsigninvalidationSchema,

    onSubmit: async (values) => {
      try {
        const payload = {
          email: values.email,
          password: values.password,
        };
        const result = await loginService({ body: payload }).unwrap();

        if (result.success) {
          setCookie("AUTH_TOKEN_KEY", result.accessToken);
          setCookie("USER_ID", result.userId);
          console.log("Login Successful:");
          navigate("/admin")
        } else {
          const errorData = await result.json();
          console.log("Error occurred: ", errorData);
        }
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

  //handle admin signup
  //const navigate = useNavigate();

  // const handleSignUp = () => {
  //   const roleNum = 1;
  //   navigate("/admin-signup", { state: { roleNum } });
  // };

  return (
    <div className="login-page">
      <Container>
        <Row className="align-items-center justify-content-center min-vh-100">
          <Col md={6}></Col>
          <Col md={4} className="login-form">
            <h2>Admin Portal</h2>
            <button onClick={()=>requestForToken()}>firebase</button>
            <p className="login-guide">Please login with your email address and password</p>

            <Form onSubmit={handleSubmit}>
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
              <FormButton className="mt-2 w-100" text="Signin" type="submit" />
            </Form>

            <div className="d-flex justify-content-between mt-3">
              <a href="/#" className="login-forgotpwd">
                Forgot Password?
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminSignin;
