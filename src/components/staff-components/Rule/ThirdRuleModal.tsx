import { useRules } from "@/provider/RulesProvider";
import { Rules } from "@/interfaces/type";
import React, { useState } from "react";

interface FirstRuleModalProps {
  setUpdateRulesData: React.Dispatch<React.SetStateAction<Rules>>;
  handleChangeRules: () => void;
}

const ThirdRuleModal: React.FC<FirstRuleModalProps> = ({
  setUpdateRulesData,
  handleChangeRules,
}) => {
  const rules = useRules();
  const [thirdRegulationModal, setThirdRegulationModal] =
    useState<boolean>(false);
  const [changeModeRule3, setChangeModeRule3] = useState<boolean>(false);
  const handleChangeInputRules = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (changeModeRule3) {
      const { name, value } = e.target;
      setUpdateRulesData((prevRules: any) => ({
        ...prevRules,
        [name]: Number(value),
      }));
    }
  };
  return (
    <td>
      <button onClick={() => setThirdRegulationModal(!thirdRegulationModal)}>
        <svg
          className="w-4 h-4 hover:opacity-50 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 50"
          fill="none"
        >
          <circle cx="25" cy="25" r="25" fill="#2F2F2F" />
          <circle cx="100" cy="25" r="25" fill="#2F2F2F" />
          <circle cx="175" cy="25" r="25" fill="#2F2F2F" />
        </svg>
      </button>
      {thirdRegulationModal && (
        <div className="fixed bg-black bg-opacity-15 backdrop-blur-sm inset-0 flex items-center justify-center z-50">
          <div className="bg-white max-w-2xl p-10 rounded-2xl">
            <h3 className="font-bold text-2xl">Update Airport Rules</h3>

            <table className="table flex justify-center ">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              {!changeModeRule3 ? (
                <tbody>
                  <tr>
                    <td>Thời gian đặt vé chậm nhất trước khi cất cánh: </td>
                    <td>{rules?.bookingRules.minBookingTime} ngày</td>
                  </tr>
                  <tr>
                    <td>Thời gian hủy vé chậm nhất trước khi cất cánh: </td>
                    <td>{rules?.bookingRules.minCancelBookingTime} ngày</td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td>Thời gian đặt vé chậm nhất trước khi cất cánh: </td>
                    <td>
                      <input
                        type="text"
                        name="minBookingTime"
                        value={rules?.bookingRules.minBookingTime}
                        className="input input-bordered input-sm w-[50px] max-w-xs"
                        onChange={handleChangeInputRules}
                      />
                      <span className="ml-3">ngày</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Thời gian hủy vé chậm nhất trước khi cất cánh: </td>
                    <td>
                      <input
                        type="text"
                        name="minCancelBookingTime"
                        value={rules?.bookingRules.minCancelBookingTime}
                        className="input input-bordered input-sm w-[50px] max-w-xs"
                        onChange={handleChangeInputRules}
                      />

                      <span className="ml-3">ngày</span>
                    </td>
                  </tr>
                </tbody>
              )}
            </table>

            <div className="modal-action">
              {!changeModeRule3 ? (
                <button
                  className="btn btn-sm"
                  onClick={() => setChangeModeRule3(!changeModeRule3)}
                >
                  Change Rule
                </button>
              ) : (
                <button
                  className="btn btn-sm text-white bg-green-500"
                  onClick={() => handleChangeRules()}
                >
                  Save
                </button>
              )}

              <button
                className="btn btn-sm"
                onClick={() => {
                  setThirdRegulationModal(!thirdRegulationModal);
                  setUpdateRulesData(rules);
                  setChangeModeRule3(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </td>
  );
};

export default ThirdRuleModal;
