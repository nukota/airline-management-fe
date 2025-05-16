import { useDeleteCustomer } from "@/hooks/customer-hooks/useDeleteCustomer";
import { useCustomerRow } from "@/provider/CustomerRowProvider";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

type DeleteCustomerAccountModalProps = {
  canceledModal: boolean;
  setDeletedModal: (state: boolean) => void;
};

const DeleteCustomerAccountModal: React.FC<DeleteCustomerAccountModalProps> = ({
  canceledModal,
  setDeletedModal,
}) => {
  const { data: session } = useSession();
  const deleteCustomer = useDeleteCustomer();
  const customer = useCustomerRow();

  const [checkDelete, setCheckDelete] = useState<boolean>(false);
  const handleDeleteBooking = async () => {
    if (session?.user.token) {
      await deleteCustomer(session?.user.token, customer.customerId);
    } else {
      console.error("No access token available");
    }
  };
  return (
    <div className="fixed bg-black bg-opacity-15 backdrop-blur-sm inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-10 rounded-2xl">
        <h3 className="font-bold text-2xl">Delete Account</h3>
        <label className="inline-flex items-center  mt-5">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={checkDelete}
            onChange={(e) => setCheckDelete(e.target.checked)}
          />
          <span className="ml-2 text-black">
            Confirm to delete customer account
          </span>
        </label>
        <div className="flex flex-col justify-between"></div>
        <div className="modal-action">
          <button
            className="btn btn-sm btn-ghost"
            onClick={() => {
              setCheckDelete(!checkDelete);
              setDeletedModal(!canceledModal);
            }}
          >
            Close
          </button>
          {checkDelete && (
            <button
              type="button"
              className="btn btn-sm bg-green-500 text-white"
              onClick={handleDeleteBooking}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteCustomerAccountModal;
