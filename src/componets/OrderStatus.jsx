import React from "react";
import { Badge } from "react-bootstrap";

const PendingStatus = () => {
  return (
    <div className="d-flex">
      <Badge pill bg="secondary" className="w-50 text-white text-center">
        Pending
      </Badge>
    </div>
  );
};

const InprogressStatus = () => {
  return (
    <div className="d-flex">
      <Badge pill bg="warning" className="w-50 text-white text-center">
        Inprogress
      </Badge>
    </div>
  );
};

const DeliveredStatus = () => {
  return (
    <div className="d-flex">
      <Badge pill bg="primary" className="w-50 text-white text-center">
        Delivered
      </Badge>
    </div>
  );
};

const CanclledStatus = () => {
    return (
      <div className="d-flex">
        <Badge pill bg="danger" className="w-50 text-white text-center">
          Cancel
        </Badge>
      </div>
    );
  };

  const CompletedStatus = () => {
    return (
      <div className="d-flex">
        <Badge pill bg="success" className="w-50 text-white text-center">
          Complete
        </Badge>
      </div>
    );
  };

export { PendingStatus, InprogressStatus, DeliveredStatus, CanclledStatus, CompletedStatus };
