import { useRules } from "@/provider/RulesProvider";
import { Rules } from "@/interfaces/type";
import React, { useState } from "react";

interface FirstRuleModalProps {
  setUpdateRulesData: React.Dispatch<React.SetStateAction<Rules>>;
  handleChangeRules: () => void;
}

const FirstRuleModal: React.FC<FirstRuleModalProps> = ({
  setUpdateRulesData,
  handleChangeRules,
}) => {
  const rules = useRules();
  const [changeMode, setChangeMode] = useState<boolean>(false);
  const [firstRegulationModal, setFirstRegulationModal] =
    useState<boolean>(false);
  const handleChangeInputRules = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (changeMode && rules) {
      const { name, value } = e.target;
      setUpdateRulesData({
        ...rules,
        [name]: Number(value),
      });
    }
  };
  //
  return (
    <td>
      <button onClick={() => setFirstRegulationModal(true)}>
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
      {firstRegulationModal && (
        <>
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
                {!changeMode ? (
                  <tbody>
                    <tr>
                      <td>Thời gian bay tối thiểu:</td>
                      <td>{rules?.airportRules.minFlightDuration} giờ</td>
                    </tr>
                    <tr>
                      <td>Số sân bay trung gian tối đa:</td>
                      <td>
                        {rules?.airportRules.maxIntermediateAirport} sân bay
                      </td>
                    </tr>
                    <tr>
                      <td>Thời gian dừng tối thiểu:</td>
                      <td>
                        {rules?.airportRules.minIntermediateAirportStopDelay}{" "}
                        phút
                      </td>
                    </tr>
                    <tr>
                      <td>Thời gian dừng tối đa:</td>
                      <td>
                        {rules?.airportRules.maxIntermediateAirportStopDelay}{" "}
                        phút
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody>
                    <tr>
                      <td>Thời gian bay tối thiểu:</td>
                      <td>
                        <input
                          type="text"
                          name="minFlightDuration"
                          value={rules?.airportRules.minFlightDuration}
                          className="input input-bordered input-sm w-[50px] max-w-xs"
                          onChange={handleChangeInputRules}
                        />
                        <span className="ml-3">giờ</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Số sân bay trung gian tối đa:</td>
                      <td>
                        <input
                          type="text"
                          name="maxIntermediateAirport"
                          value={rules?.airportRules.maxIntermediateAirport}
                          className="input input-bordered input-sm w-[50px] max-w-xs"
                          onChange={handleChangeInputRules}
                        />
                        <span className="ml-3">sân bay</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Thời gian dừng tối thiểu:</td>
                      <td>
                        <input
                          type="text"
                          name="minIntermediateAirportStopDelay"
                          value={
                            rules?.airportRules.minIntermediateAirportStopDelay
                          }
                          className="input input-bordered input-sm w-[50px] max-w-xs"
                          onChange={handleChangeInputRules}
                        />
                        <span className="ml-3">phút</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Thời gian dừng tối đa:</td>
                      <td>
                        <input
                          type="text"
                          name="maxIntermediateAirportStopDelay"
                          value={
                            rules?.airportRules.maxIntermediateAirportStopDelay
                          }
                          className="input input-bordered input-sm w-[50px] max-w-xs"
                          onChange={handleChangeInputRules}
                        />
                        <span className="ml-3">phút</span>
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>

              <div className="modal-action">
                {!changeMode ? (
                  <button
                    className="btn btn-sm"
                    onClick={() => setChangeMode(!changeMode)}
                  >
                    Change Rule
                  </button>
                ) : (
                  <button
                    className="btn btn-sm bg-green-500 text-white"
                    onClick={handleChangeRules}
                  >
                    Save
                  </button>
                )}

                <button
                  className="btn btn-sm"
                  onClick={() => {
                    setFirstRegulationModal(false);
                    if (rules) setUpdateRulesData(rules);
                    setChangeMode(false);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </td>
  );
};

export default FirstRuleModal;
