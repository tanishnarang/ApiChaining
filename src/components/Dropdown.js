import React from "react";
import { Select, Space } from "antd";

const Dropdown = ({ onSelect }) => {
  const handleChange = (value) => {
    onSelect(value);
  };

  return (
    <Space wrap>
      <Select
        defaultValue="Option"
        style={{
          maxWidth: "inherit",
        }}
        onChange={handleChange}
        options={[
          {
            value: "User Api",
            label: "User Api",
          },
          {
            value: "Post Api",
            label: "Post Api",
          },
          {
            value: "Comment Api",
            label: "Comment Api",
          },
        ]}
      />
    </Space>
  );
};

export default Dropdown;
