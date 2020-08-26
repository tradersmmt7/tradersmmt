import React, { useState } from "react";
import CustomTable from "../../GlobalComponents/Table/CustomTable";
import {
  faFileAlt,
  faRupeeSign,
  faBoxOpen,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

const BTradeTable = ({ bookedTrade }) => {
  const [columns, setColumns] = useState([
    {
      render: "Entry Date",
      id: "entryDate",
      icon: faCalendarAlt,
    },
    {
      render: "Exit Date",
      id: "exitDate",
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
      render: "Exit Price",
      id: "exitPrice",
      icon: faRupeeSign,
    },
    {
      render: "Entry Value",
      id: "entryValue",
      icon: faRupeeSign,
    },
    {
      render: "Exit value",
      id: "exitValue",
      icon: faRupeeSign,
    },
    {
      render: "Abs. P&L",
      id: "absPandL",
    },
    {
      render: "Initial Risk Taken",
      id: "initialRiskTaken",
      icon: faRupeeSign,
    },
    {
      render: "RRR",
      id: "rrr",
    },
    {
      render: "Charges",
      id: "charges",
      icon: faRupeeSign,
    },
    {
      render: "Actions",
      id: "actions",
    },
  ]);
  return (
    <div>
      <CustomTable dataSource={bookedTrade} columns={columns} />
    </div>
  );
};

export default BTradeTable;
