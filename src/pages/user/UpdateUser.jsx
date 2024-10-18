import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Form, Row, Col } from "react-bootstrap";
import FormInput from "../../componets/FormInput";
import FormButton from "../../componets/FormButton";
import { UserStatusEnum, UserRoleEnum } from "../../enums/Enum";
import {
  useUpdateUserMutation,
  useGetUserByIdQuery,
} from "../../core/services/user/user";
import emailjs from "@emailjs/browser";

const UpdateUser = ({ user }) => {
  const userId = user.id;
  const navigate = useNavigate();

  const [updateUser, { isLoading, isError, isSuccess }] =
    useUpdateUserMutation();
  const { data: userData } = useGetUserByIdQuery({ userId });

  // Handle user role display
  let userRole = "a User";
  if (user.role === UserRoleEnum.CUSTOMER) {
    userRole = "a Customer";
  } else if (user.role === UserRoleEnum.VENDOR) {
    userRole = "a Vendor";
  } else if (user.role === UserRoleEnum.ADMIN) {
    userRole = "an Admin";
  } else if (user.role === UserRoleEnum.CSR) {
    userRole = "a CSR";
  }

  // States for email, name, and status
  const [firstName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  // Update user data when fetched
  useEffect(() => {
    if (userData) {
      setName(userData.firstName);
      setEmail(userData.email);
      setStatus(userData.status);
    }
  }, [userData]);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        email: userData?.email,
        companyName: userData?.companyName,
        description: userData?.description,
        status: userData?.status,
      },

      onSubmit: async (values) => {
        const payload = {
          firstName: values.firstName,
          lastName: values.lastName,
          companyName: values.companyName,
          description: values.description,
          status: Number(values.status), // Update only the status
        };

        try {
          // Update user status
          const response = await updateUser({
            userId: userId,
            body: payload,
          }).unwrap();
          navigate("/admin/users");

          // EmailJS configuration
          /*
          const serviceId = "service_6l8fxvq";
          const templateId = "template_nvhhuco";
          const publicKey = "SFXsEsLqyL2KzUpt9";
          */

          // Determine the status text based on the numeric value
          /*
          let statusNew;
          if (Number(values.status) === UserStatusEnum.PENDING) {
            statusNew = "Pending";
          } else if (Number(values.status) === UserStatusEnum.ACTIVE) {
            statusNew = "Active";
          } else if (Number(values.status) === UserStatusEnum.INACTIVE) {
            statusNew = "Deactivate";
          }

          // Template params for email
          const templateParams = {
            email: values.email,
            status: statusNew,
          };

          // Send email via EmailJS
          emailjs
            .send(serviceId, templateId, templateParams, publicKey)
            .then((response) => {
              console.log("Email sent successfully!", response);
              setEmail("");
              setStatus("");
            })
            .catch((error) => {
              console.error("Error sending email:", error);
            });
            */
        } catch (error) {
          console.log(error);
        }
      },

      enableReinitialize: true,
    });

  // Input focus handlers
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
    <div className="p-4">
      <h3 className="mb-4">{`Update ${userRole} Status`}</h3>
      {user.role === UserRoleEnum.VENDOR ? (
        <p className="mb-4" style={{ color: "red" }}>
          {`You are updating ${user.companyName} - ${userRole}`}
        </p>
      ) : (
        <p className="mb-4" style={{ color: "red" }}>
          {`You are updating ${user.firstName} ${user.lastName} - ${userRole}`}
        </p>
      )}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
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
              onFocus={() => handleFocus("status")}
              onChange={handleChange}
              isFocused={isFocusStates.status}
              options={[
                { value: UserStatusEnum.PENDING, label: "Pending" },
                { value: UserStatusEnum.ACTIVE, label: "Active" },
                { value: UserStatusEnum.INACTIVE, label: "Inactive" },
              ]}
              error={touched.status && errors.status}
              errorMessage={errors.status}
            />
          </Col>
        </Row>

        <FormButton
          className="mt-2 mb-4"
          text={`Update ${userRole}`}
          type="submit"
        />
      </Form>

      {isLoading && <p>Updating user...</p>}
      {isError && <p>Error updating user</p>}
      {isSuccess && (
        <span style={{ color: "green" }}>User updated successfully!</span>
      )}
    </div>
  );
};

export default UpdateUser;
