import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Table, Spinner, Alert, Form } from "react-bootstrap";
import UserDetails from "./UserDetails";
import UpdateUser from "./UpdateUser";
import TablePagination from "../../componets/TablePagination";
import FormButton from "../../componets/FormButton";
import {
  ActiveStatus,
  InactiveStatus,
  PendingStatus,
} from "../../componets/UserStatus";
import {
  UserStatusEnum,
  RowsPerPageEnum,
  UserRoleEnum,
} from "../../enums/Enum";
import {
  useGetUserByIdQuery,
  useGetAllUsersQuery,
  useDeleteUserMutation,
} from "../../core/services/user/user";
import { useCookies } from "react-cookie";

function UserList() {
  const [cookies] = useCookies(["USER_ID"]);
  const userId = cookies.USER_ID || "";

  //Get user data from logged user
  const { data: userData } = useGetUserByIdQuery({ userId: userId });

  //Get all data
  const { data: users, isLoading, isError } = useGetAllUsersQuery();

  //Delete data
  const [deleteUser] = useDeleteUserMutation();

  const [selectedUser, setSelectedUser] = useState(null);
  const [paginatedUsers, setPaginatedUsers] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search

  const rowsPerPage = RowsPerPageEnum.MAX_TABLE_ROWS;

  //Arrange data for table
  useEffect(() => {
    if (users && users.length > 0) {
      const initialPageData = users.slice(0, rowsPerPage);
      setPaginatedUsers(initialPageData);
    }
  }, [users, rowsPerPage]);

  //Edit and view mode handling
  const handleRowClick = (user) => {
    if (selectedUser && selectedUser.id === user.id && !isEditMode) {
      // Toggle off if already selected in view mode
      setSelectedUser(null);
    } else {
      setSelectedUser(user);
      setIsEditMode(false); // Switch to view mode
    }
  };

  //Handle update
  const handleUpdateClick = (user) => {
    if (selectedUser && selectedUser.id === user.id && isEditMode) {
      // Toggle off if already selected in edit mode
      setSelectedUser(null);
      setIsEditMode(false);
    } else {
      setSelectedUser(user);
      setIsEditMode(true); // Switch to edit mode
    }
  };

  //Handle page changes due to paginations
  const handlePageChange = (paginatedData) => {
    setPaginatedUsers(paginatedData);
  };

  //Delete user
  const handleDeleteUser = async (userId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (isConfirmed) {
      try {
        await deleteUser({ userId: userId });
        {
          isSuccessDelete && (
            <span style={{ color: "green" }}>User deleted successfully!</span>
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Display loading, error, and empty states
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" />
      </div>
    );
  }

  //Handle user data loading
  if (isError) {
    return <Alert variant="danger">Failed to load users.</Alert>;
  }

  if (!users || users.length === 0) {
    return <Alert variant="warning">No users found.</Alert>;
  }

  return (
    <div className="p-4">
      <Row className="mb-2">
        <Col>
          <h2>All Users</h2>
        </Col>
      </Row>
      <Row className="mb-4 mt-4">
        <Col className="d-flex justify-content-end">
          {userData?.role === UserRoleEnum.ADMIN && (
            <Link to="/admin/users/roles">
              <FormButton text="+ Add a user" type="submit"></FormButton>
            </Link>
          )}
        </Col>
      </Row>

      <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="table-cell">
                    {user?.role !== UserRoleEnum.ADMIN &&
                    user?.role !== UserRoleEnum.CSR &&
                    user?.role !== UserRoleEnum.CUSTOMER
                      ? user.companyName
                      : `${user.firstName} ${user.lastName}`}
                  </td>
                  <td className="table-cell">{user.email}</td>
                  <td className="table-cell">
                    {user?.role === UserRoleEnum.ADMIN
                      ? "ADMIN"
                      : user?.role === UserRoleEnum.VENDOR
                      ? "VENDOR"
                      : user?.role === UserRoleEnum.CSR
                      ? "CSR"
                      : "CUSTOMER"}
                  </td>
                  <td className="table-cell">
                    {user.status === UserStatusEnum.ACTIVE && <ActiveStatus />}
                    {user.status === UserStatusEnum.INACTIVE && (
                      <InactiveStatus />
                    )}
                    {user.status === UserStatusEnum.PENDING && (
                      <PendingStatus />
                    )}
                  </td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleRowClick(user)}
                    >
                      <i className="bi bi-eye"></i>
                    </Button>{" "}
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleUpdateClick(user)}
                    >
                      <i className="bi bi-pencil"></i>
                    </Button>{" "}
                    {/* </Link> */}
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteUser(user?.id)}
                    >
                      <i className="bi bi-trash3"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <TablePagination
            data={users}
            rowsPerPage={rowsPerPage}
            onPageChange={handlePageChange}
          />
        </Col>
      </Row>

      {selectedUser && !isEditMode && (
        <Row className="">
          <Col>
            <UserDetails user={selectedUser} />
          </Col>
        </Row>
      )}

      {selectedUser && isEditMode && (
        <Row className="">
          <Col>
            <UpdateUser user={selectedUser} />
          </Col>
        </Row>
      )}
    </div>
  );
}

export default UserList;
