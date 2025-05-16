import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useDeleteStaff } from "@/hooks/staff-hooks/useDeleteStaff";
import { useStaffRow } from "@/provider/StaffRowProvider";

type DeleteStaffAcountModalProps = {
  deleteModal: boolean;
  setDeleteModal: (state: boolean) => void;
};

const DeleteStaffAcountModal: React.FC<DeleteStaffAcountModalProps> = ({
  deleteModal,
  setDeleteModal,
}) => {
  const staff = useStaffRow();
  const { data: session } = useSession();
  const [checkDelete, setCheckDelete] = useState<boolean>(false);
  const deleteStaff = useDeleteStaff();
  const handleDeleteStaff = async () => {
    if (session?.user.token) {
      await deleteStaff(session?.user.token, staff.staffId);
    } else {
      console.error("No access token available");
    }
  };
  return (
    <div className="fixed bg-black bg-opacity-15 backdrop-blur-sm inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-10 rounded-2xl">
        <h3 className="font-bold text-2xl">Delete Staff</h3>
        <label className="inline-flex items-center  mt-5">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={checkDelete}
            onChange={(e) => setCheckDelete(e.target.checked)}
          />
          <span className="ml-2 text-black">Confirm to delete staff</span>
        </label>
        <div className="flex flex-col justify-between"></div>
        <div className="modal-action">
          <button
            className="btn btn-sm btn-ghost"
            onClick={() => {
              setCheckDelete(!checkDelete);
              setDeleteModal(!deleteModal);
            }}
          >
            Close
          </button>
          {checkDelete && (
            <button
              type="button"
              className="btn btn-sm bg-green-500 text-white"
              onClick={handleDeleteStaff}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteStaffAcountModal;
