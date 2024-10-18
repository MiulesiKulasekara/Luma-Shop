import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

export const testvalidationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces")
    .required("Name is required"),
});

export const adminsigninvalidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must contain 8 or more characters")
    .minLowercase(1, "Password must contain at least 1 lower case letter")
    .minUppercase(1, "Password must contain at least 1 upper case letter")
    .minNumbers(1, "Password must contain at least 1 number")
    .minSymbols(1, "Password must contain at least 1 special character")
    .required("Password is required"),
});

export const adminsignupvalidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "First name can only contain letters")
    .required("First name is required"),
  lastName: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Last name can only contain letters")
    .required("First name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must contain 8 or more characters")
    .minLowercase(1, "Password must contain at least 1 lower case letter")
    .minUppercase(1, "Password must contain at least 1 upper case letter")
    .minNumbers(1, "Password must contain at least 1 number")
    .minSymbols(1, "Password must contain at least 1 special character")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const uservalidationSchema = (roleNum) => {
  return Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password too short")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),

    // Conditionally validate firstName and lastName if roleNum is 1, 3, or 4
    firstName:
      roleNum === 1 || roleNum === 3 || roleNum === 4
        ? Yup.string().required("First name is required")
        : Yup.string(),

    lastName:
      roleNum === 1 || roleNum === 3 || roleNum === 4
        ? Yup.string().required("Last name is required")
        : Yup.string(),

    // Conditionally validate companyName if roleNum is 2
    companyName:
      roleNum === 2
        ? Yup.string().required("Company name is required")
        : Yup.string(),

    // Conditionally validate description if roleNum is 2
    description:
      roleNum === 2
        ? Yup.string().required("Description is required")
        : Yup.string(),
  });
};

export const productListvalidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

export const updateproductListvalidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  //vendorId: Yup.string().required("Vendor is required"),
  // isActive: Yup.string().required("Status is required"),
});

export const productvalidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  price: Yup.string().required("Price is required"),
  listingId: Yup.string().required("List is required"),
  stockQuantity: Yup.string().required("Quantity is required"),
  category: Yup.string().required("Category is required"),
  description: Yup.string().required("Description is required"),
});

export const ordervalidationSchema = Yup.object().shape({
  //name: Yup.string().required("Status is required"),
});
