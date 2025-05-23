"use client";

import React from "react";
import { useEffect, useState } from "react";
import { Rules } from "@/interfaces/type";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { rulesEndpoint } from "@/services/axios/endpoints/rules.endpoint";
import { apiRequest } from "@/utils/apiRequest";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import { useRules } from "@/provider/RulesProvider";
import FirstRuleModal from "./FirstRuleModal";
import { useTicketClass } from "@/provider/TicketClassProvider";
import SecondRuleModal from "./SecondRuleModal";
import ThirdRuleModal from "./ThirdRuleModal";

const RegulationsManage = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const rules = useRules();
  const ticketClasses = useTicketClass();

  useEffect(() => {
    setUpdateRulesData(rules);
  }, [rules]);

  const [thirdRegulationModal, setThirdRegulationModal] =
    useState<boolean>(false);

  const [thirdRegulation, setThirdRegulation] = useState<{
    timeBookedAtLeast: string;
  }>();

  const [updateRulesData, setUpdateRulesData] = useState<Rules>({
    airportRules: {
      minFlightDuration: 0,
      maxIntermediateAirport: 0,
      minIntermediateAirportStopDelay: 0,
      maxIntermediateAirportStopDelay: 0,
    },
    bookingRules: {
      minBookingTime: 0,
      minCancelBookingTime: 0,
    },
  });

  const handleChangeRules = async () => {
    const url = `${process.env.NEXT_PUBLIC_SERVER}${rulesEndpoint["put-modify-rules"]}`;
    const { result, error } = await apiRequest(
      url,
      "PUT",
      session?.user.token,
      JSON.stringify(updateRulesData)
    );
    if (error) {
      showErrorToast(error);
      return;
    }
    showSuccessToast("Modify rule successfully");
  };

  return (
    <div className="overflow-x-auto mt-10 p-10">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Regulations</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <td className="text-base font-semibold">Quy Định 1</td>
            <td className="text-base">
              Thời gian bay tối thiểu là {rules?.airportRules.minFlightDuration}{" "}
              giờ. Có tối đa {rules?.airportRules.maxIntermediateAirport} sân
              bay trung gian với thời gian dừng từ{" "}
              {rules?.airportRules.minIntermediateAirportStopDelay} đến{" "}
              {rules?.airportRules.maxIntermediateAirportStopDelay} phút.
            </td>
            <FirstRuleModal
              setUpdateRulesData={setUpdateRulesData}
              handleChangeRules={handleChangeRules}
            />
          </tr>
          {/* row 2 */}
          <tr>
            <td className="text-base font-semibold">Quy Định 2</td>
            <td className="text-base">
              Chỉ bán vé khi còn chỗ. Có {ticketClasses.length} hạng vé (
              {ticketClasses
                .map((regulation) => regulation.className)
                .join(", ")}
              ) . Vé{" "}
              {ticketClasses.map((regulation, index) => (
                <span key={index}>
                  <span>{regulation.className}</span> bằng giá vé gốc thêm{" "}
                  <span>{regulation.priceBonusInterest}</span>%
                  {index !== ticketClasses.length - 1 && ", "}
                </span>
              ))}{" "}
              . Mỗi chuyến bay có một giá vé riêng.
            </td>
            <SecondRuleModal />
          </tr>
          {/* row 3 */}
          <tr>
            <td className="text-base font-semibold">Quy Định 3</td>
            <td className="text-base">
              Chỉ cho đặt vé chậm nhất {rules?.bookingRules.minBookingTime} ngày
              trước khi khởi hành. Vào ngày khởi hành tất cả các phiếu đặt sẽ bị
              hủy. Chỉ cho hủy vé {rules?.bookingRules.minCancelBookingTime}{" "}
              ngày trước ngày khởi hành.
            </td>
            <ThirdRuleModal
              setUpdateRulesData={setUpdateRulesData}
              handleChangeRules={handleChangeRules}
            />
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RegulationsManage;
