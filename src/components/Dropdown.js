import React from "react";
import { Select, Space } from "antd";

const Dropdown = ({ onSelect, options, value, onClick, onBlur }) => {
  return (
    <Space wrap>
      <Select
        value={value}
        placeholder="select option"
        style={{
          width: "250px",
        }}
        onChange={onSelect}
        options={options}
        onClick={() => onClick(value)}
        onBlur={() => onBlur(value)}
      />
    </Space>
  );
};

export default Dropdown;
