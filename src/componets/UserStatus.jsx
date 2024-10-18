import React from "react";
import { Badge } from "react-bootstrap";

const ActiveStatus = () => {
  return (
    <div className="d-flex">
      <Badge pill bg="success" className="w-50 text-white text-center">
        Active
      </Badge>
    </div>
  );
};

const InactiveStatus = () => {
  return (
    <div className="d-flex">
      <Badge pill bg="warning" className="w-50 text-white text-center">
        Inactive
      </Badge>
    </div>
  );
};

const PendingStatus = () => {
  return (
    <div className="d-flex">
      <Badge pill bg="primary" className="w-50 text-white text-center">
        Pending
      </Badge>
    </div>
  );
};

export { ActiveStatus, InactiveStatus, PendingStatus };
