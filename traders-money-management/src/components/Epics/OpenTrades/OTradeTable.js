import React, { useState } from "react";
import CustomTable from "../../GlobalComponents/Table/CustomTable";
import {
  faFileAlt,
  faRupeeSign,
  faBoxOpen,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

const OTradeTable = ({ openTrade }) => {
  const [columns, setColumns] = useState([
    {
      render: "Entry Date",
      id: "entryDate",
      icon: faCalendarAlt,
    },
    {
      render: "Script",
      id: "script",
      icon: faFileAlt,
    },
    {
      render: "Long/Short",
      id: "longOrShort",
    },
    {
      render: "Entry Price",
      id: "entryPrice",
      icon: faRupeeSign,
    },
    {
      render: "Quantity",
      id: "quantity",
      icon: faBoxOpen,
    },
    {
      render: "Initial Stop Loss",
      id: "initialStopLoss",
      icon: faRupeeSign,
    },
    {
      render: "Current Stop Loss",
      id: "currentStopLoss",
      icon: faRupeeSign,
    },
    {
      render: "Target",
      id: "target",
    },
    {
      render: "C.M.P",
      id: "cmp",
      icon: faRupeeSign,
    },
    {
      render: "Abs. Ret",
      id: "absRet",
    },
    {
      render: "Actions",
      id: "actions",
    },
  ]);
  return (
    <div>
      <CustomTable dataSource={openTrade} columns={columns} />
    </div>
  );
};

export default OTradeTable;
