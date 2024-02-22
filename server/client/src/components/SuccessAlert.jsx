import { useState } from "react";

const SuccessAlert = ({ msg }) => {
  //Show message
  const [show, setShow] = useState(true);

  setTimeout(() => setShow(false), 1500);

  return (
    <div>
      {show && (
        <div className="bg-green-500 text-white rounded-md mt-2 p-2 mb-4 ">
          <i className="fa-solid fa-circle-check pr-1"></i> {msg}
        </div>
      )}
    </div>
  );
};

export default SuccessAlert;
