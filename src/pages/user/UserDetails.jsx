import { Row, Col, Card } from "react-bootstrap";
import { UserStatusEnum, UserRoleEnum } from "../../enums/Enum";
import {
  ActiveStatus,
  InactiveStatus,
  PendingStatus,
} from "../../componets/UserStatus";

function UserDetails({ user }) {
  return (
    <Card className="mt-2">
      <Card.Body>
        <Row>
          <Col>
            <h2>
              {user?.role !== UserRoleEnum.ADMIN &&
              user?.role !== UserRoleEnum.CSR
                ? user.companyName
                : `${user.firstName} ${user.lastName}`}
            </h2>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <h5>Email</h5>
            <p>{user.email}</p>
          </Col>
          <Col md={4}>
            <h5>Role</h5>
            <p>
              {user?.role === UserRoleEnum.ADMIN
                ? "ADMIN"
                : user?.role === UserRoleEnum.VENDOR
                ? "VENDOR"
                : "CSR"}
            </p>
          </Col>
          <Col md={2}>
            <h5>Status</h5>
            <div>
              {user.status === UserStatusEnum.ACTIVE && <ActiveStatus />}
              {user.status === UserStatusEnum.INACTIVE && <InactiveStatus />}
              {user.status === UserStatusEnum.PENDING && <PendingStatus />}
            </div>
          </Col>
        </Row>
        <Row>
          {user?.role === UserRoleEnum.VENDOR ? (
            <Col>
              <h5 className="mt-2">Description</h5>
              <p>{user.description}</p>
            </Col>
          ) : null}
        </Row>
      </Card.Body>
    </Card>
  );
}

export default UserDetails;
