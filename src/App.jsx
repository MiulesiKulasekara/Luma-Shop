import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import FullLayout from "./layouts/FullLayout";

// componets
import Test from "./pages/Test/Test";

//pages
// admin
import AdminSignin from "./pages/AdminSignin";
import AdminSignup from "./pages/AdminSignup";

//user management
import AddUser from "./pages/user/AddUser";
import UserList from "./pages/user/UserList";
import UpdateUser from "./pages/user/UpdateUser";
import SelectRoles from "./pages/user/SelectRoles";

//product list management
import AddProductList from "./pages/productlist/AddProductList";
import AllProductList from "./pages/productlist/AllProductList";
import UpdateProductList from "./pages/productlist/UpdateProductList";

//product management
import AddProduct from "./pages/product/AddProduct";
import ProductList from "./pages/product/ProductList";
import UpdateProduct from "./pages/product/UpdateProduct";

//order management
import OrderList from "./pages/order/OrderList";
import UpdateOrder from "./pages/order/UpdateOrder";

//vendor ratings management
import VendorRatingsList from "./pages/vendorRatings/VendorRatingsList";

//Test
//import MultiColorPickerExample from "./pages/Test/MultiColorPickerExample";
import StarRating from "./componets/StarRating";

import "./css/styles.css";
// import { useCookies } from "react-cookie";
// import { useGetUserByIdQuery } from "./core/services/user/user";

//Protected route
import ProtectedRoute from "./layouts/ProtectedRoute";

import { UserRoleEnum } from "./enums/Enum";

function App() {
  // const [cookies] = useCookies(["USER_ID"]);
  // const userId = cookies.USER_ID || "";
  // const { data } = useGetUserByIdQuery({ userId: userId });
  //console.log("Role :", data?.role);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminSignin />}></Route>
        {/* <Route path="/admin/signup" element={<AdminSignup />}></Route> */}

        <Route
          element={
            <ProtectedRoute
              allowedRoles={[
                UserRoleEnum.ADMIN,
                UserRoleEnum.CSR,
                UserRoleEnum.VENDOR,
              ]}
            />
          }
        >
          <Route path="/admin" element={<FullLayout />}>
            <Route index element={<Dashboard />} />

            {/* ******************************************************************************************** */}
            {/* user management */}
            <Route
              element={<ProtectedRoute allowedRoles={[UserRoleEnum.ADMIN, UserRoleEnum.CSR]}/>}>
              <Route path="users" element={<UserList />}></Route>
              <Route path="users/roles" element={<SelectRoles />}></Route>
              <Route path="users/update/:id" element={<UpdateUser />}></Route>
            </Route>
            <Route element={<ProtectedRoute allowedRoles={[UserRoleEnum.ADMIN]} />}>
              <Route path="users/add" element={<AddUser />}></Route>
            </Route>
            {/* ******************************************************************************************** */}

            {/* ******************************************************************************************** */}
            {/* product list management */}
            <Route element={<ProtectedRoute allowedRoles={[UserRoleEnum.ADMIN,UserRoleEnum.CSR,UserRoleEnum.VENDOR]} />}>
            <Route path="product/list" element={<AllProductList />}></Route>
            </Route>
            <Route element={<ProtectedRoute allowedRoles={[UserRoleEnum.VENDOR]} />}>
            <Route path="product/list/add" element={<AddProductList />}></Route>
            </Route>
            <Route element={<ProtectedRoute allowedRoles={[UserRoleEnum.ADMIN,UserRoleEnum.VENDOR]} />}>
            <Route path="product/list/update/:id" element={<UpdateProductList />}></Route>
            </Route>
            {/* ******************************************************************************************** */}

            {/* ******************************************************************************************** */}
            {/* product management */}
            <Route element={<ProtectedRoute allowedRoles={[UserRoleEnum.ADMIN,UserRoleEnum.CSR,UserRoleEnum.VENDOR]} />}>
            <Route path="product" element={<ProductList />}></Route>
            </Route>
            <Route element={<ProtectedRoute allowedRoles={[UserRoleEnum.VENDOR]} />}>
            <Route path="product/add" element={<AddProduct />}></Route>
            </Route>
            <Route element={<ProtectedRoute allowedRoles={[UserRoleEnum.VENDOR]} />}>
            <Route path="product/update/:id" element={<UpdateProduct />}></Route>
            </Route>
            {/* ******************************************************************************************** */}

            {/* order management */}
            {/* ******************************************************************************************** */}
            <Route element={<ProtectedRoute allowedRoles={[UserRoleEnum.ADMIN,UserRoleEnum.CSR,UserRoleEnum.VENDOR]} />}>
            <Route path="order" element={<OrderList />}></Route>
            </Route>
            <Route path="order/update/:id" element={<UpdateOrder />}></Route>
            {/* ******************************************************************************************** */}

            {/* vendor ratings management */}
            {/* ******************************************************************************************** */}
            <Route
              path="vendor/ratings"
              element={<VendorRatingsList />}
            ></Route>
            {/* ******************************************************************************************** */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
