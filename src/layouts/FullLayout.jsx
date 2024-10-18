import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "reactstrap";
import { useGetUserByIdQuery } from "../core/services/user/user";
import { useCookies } from "react-cookie";

const FullLayout = () => {
  // const [cookies] = useCookies(["USER_ID"]);
  // const userId = cookies.USER_ID || "";
  // const { data } = useGetUserByIdQuery({ userId: userId });

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div className="shadow">
        <Header style={{ height: "60px" }} />
      </div>

      <div style={{ display: "flex", flex: 1 }}>
        <div className="shadow">
          <Sidebar style={{ width: "250px", height: "100%" }} />
        </div>

        <Container fluid style={{ flex: 1, padding: "20px" }}>
          <Outlet />
        </Container>
      </div>
    </div>
  );
};

export default FullLayout;
