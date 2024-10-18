import Spinner from "react-bootstrap/Spinner";
import { useSelector } from "react-redux";

const GlobalSpinner = () => {
  const isLoading = useSelector((state) => state.spinner.isLoading)
  return (
    <>
      {isLoading && (
        <div className="position-absolute top-0 start-0 d-flex justify-content-center align-items-center global-spinner">
          <Spinner animation="border" role="status" variant="light" />
        </div>
      )}
    </>
  );
};

export default GlobalSpinner;
