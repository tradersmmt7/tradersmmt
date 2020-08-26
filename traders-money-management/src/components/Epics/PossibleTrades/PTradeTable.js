import React, { useState } from "react";
import CustomTable from "../../GlobalComponents/Table/CustomTable";
import {
  faFileAlt,
  faRupeeSign,
  faBoxOpen,
} from "@fortawesome/free-solid-svg-icons";
const PTradeTable = ({ possibleTrade }) => {
  const [columns, setColumns] = useState([
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
      render: "Stop Loss",
      id: "stopLoss",
      icon: faRupeeSign,
    },
    {
      render: "Risk",
      id: "risk",
      icon: faRupeeSign,
    },
    {
      render: "Quantity",
      id: "quantity",
      icon: faBoxOpen,
    },
    {
      render: "Actions",
      id: "actions",
    },
  ]);
  return (
    <div>
      <CustomTable dataSource={possibleTrade} columns={columns} />
    </div>
  );
};

export default PTradeTable;
