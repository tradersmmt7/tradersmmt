import React from "react";
import { FontAwesomeIcons } from "../../GlobalComponents/Icons";
import { CustomtableWrapper } from "./style";
const calc = (data) => data.toString().match(/^-?\d+(?:\.\d{0,4})?/)[0];

const CustomTable = ({ dataSource, columns }) => {
  console.log(columns);
  return (
    <CustomtableWrapper striped bordered hover responsive variant="light">
      <thead>
        <tr>
          {columns.map((col, index) => {
            return <th>{col.render}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {dataSource.map((data, index) => {
          return (
            <tr>
              {columns.map((col, index) => {
                return (
                  <td>
                    {typeof data[col.id] == "number" ? (
                      <>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "start",
                          }}
                        >
                          <div style={{ marginRight: "5px" }}>
                            <FontAwesomeIcons icon={col.icon} />
                          </div>
                          <div>{calc(data[col.id])}</div>
                        </div>
                      </>
                    ) : (
                      <>
                        {col.icon ? (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "start",
                            }}
                          >
                            <div style={{ marginRight: "5px" }}>
                              <FontAwesomeIcons icon={col.icon} />
                            </div>
                            <div>{data[col.id]}</div>
                          </div>
                        ) : (
                          data[col.id]
                        )}
                      </>
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </CustomtableWrapper>
  );
};

export default CustomTable;
