import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { PortfolioStatsWrapper } from "./styles";
import CustomTable from "../../GlobalComponents/Table/CustomTable";
import {
  faRupeeSign,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";

export const PorfolioStats = ({ portfolioStats }) => {
  const [columns, setcolumns] = useState([
    {
      render: "Starting Capital",
      id: "startingCapital",
      icon: faRupeeSign,
    },
    {
      render: "W.C.S",
      id: "worstCaseScenarioData",
      icon: faFileAlt,
    },
    {
      render: "Risk/Trade",
      id: "riskPerTradeData",
      icon: faFileAlt,
    },
    {
      render: "Open P&L",
      id: "openPandL",
      icon: faRupeeSign,
    },
    {
      render: "Booked P&L",
      id: "bookedPandL",
      icon: faRupeeSign,
    },
    {
      render: "Current Capital",
      id: "currentCapital",
      icon: faRupeeSign,
    },

    {
      render: "Withdraw",
      id: "withdraw",
      icon: faRupeeSign,
    },
    {
      render: "Charges",
      id: "charges",
      icon: faRupeeSign,
    },
  ]);

  return (
    <PortfolioStatsWrapper>
      <CustomTable dataSource={portfolioStats} columns={columns} />
    </PortfolioStatsWrapper>
  );
};
