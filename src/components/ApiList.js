import { useState } from "react";
import _ from "lodash";
import Dropdown from "./Dropdown";
import { message } from "antd";
import RightContainer from "./RightContainer";
import axios from "axios";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function ApiList() {
  const availableApi = [
    {
      name: "userApi",
      label: "User Api",
      request: {},
      endPoint: "https://jsonplaceholder.typicode.com/users",
      method: "GET",
    },
    {
      name: "postApi",
      label: "Post Api",
      request: {
        title: "favourite cars",
        body: "1969 ford mustang,1960 toyota celica,1970 dodge charger",
        userId: 1,
      },
      endPoint: "https://jsonplaceholder.typicode.com/posts",
      method: "POST",
    },
    {
      name: "commentApi",
      label: "Comment Api",
      request: { postId: 4 },
      endPoint: "https://jsonplaceholder.typicode.com/comments",
      method: "GET",
    },
  ];

  const [apiSequence, setApiSequence] = useState([availableApi[0]]);
  const [messageApi, contextHolder] = message.useMessage();
  const [activeRequest, setActiveRequest] = useState({});
  const [expectedResponse, setExpectedResponse] = useState({
    title: "favourite cars",
    body: "1969 ford mustang,1960 toyota celica,1970 dodge charger",
    userId: 1,
  });

  const dropdownOptions = availableApi.map((api) => {
    return { value: api.name, label: api.label };
  });

  const addApiToSequence = () => {
    if (apiSequence.length < 3) {
      setApiSequence([...apiSequence, {}]);
    } else {
      messageApi.open({
        type: "warning",
        content: "You can only add up to 3 APIs.",
      });
    }
  };

  const handleApiOptionSelect = (index, option) => {
    const selectedOption = availableApi.find((api) => api.name === option);
    const updatedSequence = [...apiSequence];
    updatedSequence[index] = selectedOption;
    setApiSequence(updatedSequence);
  };

  const handleOptionClick = (value) => {
    const selectedOption = apiSequence.find((api) => api.name === value);
    setActiveRequest(selectedOption);
  };

  const removeApiFromSequence = (index) => {
    const updatedSequence = [...apiSequence];
    updatedSequence.splice(index, 1);
    setApiSequence(updatedSequence);
  };

  const transformRequests = (request, responses) => {
    Object.keys(request).forEach((key) => {
      if (request[key]?.toString()?.startsWith("{{")) {
        const accessBy = request[key].substring(
          request[key].indexOf("{{") + 2,
          request[key].lastIndexOf("}}")
        );
        request[key] = getFieldByAccessor(responses, accessBy);
      }
    });
    return request;
  };

  const getFieldByAccessor = (obj, accessor) => {
    return accessor
      .replace(/\[(\w+)\]/g, ".$1")
      .replace(/^\./, "")
      .split(".")
      .reduce(
        (o, key) => (o && o[key] !== undefined ? o[key] : undefined),
        obj
      );
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Test Passed!",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Test Failed!",
    });
  };

  const handleExecute = async () => {
    if (apiSequence.length === 0) {
      messageApi.open({
        type: "error",
        content: "Please add at least one API to the sequence.",
      });
      return;
    }

    const responses = {};

    for await (const api of apiSequence) {
      const apiRequest = transformRequests(api.request, responses);
      const response = await axios({
        method: api.method,
        url: api.endPoint,
        params: api.method === "GET" ? apiRequest : {},
        data: api.method === "POST" ? apiRequest : {},
      });
      responses[api.name] = response.data;
    }

    const lastResponse = responses[apiSequence[apiSequence.length - 1].name];
    _.isEqual(lastResponse, expectedResponse) ? success() : error();
    console.log("last:", lastResponse);
    console.log("expect:", expectedResponse);
  };

  const onRequestUpdate = (updatedRequest, apiName) => {
    const index = apiSequence.findIndex((api) => api.name === apiName);
    const updatedSequence = [...apiSequence];
    updatedSequence[index].request = updatedRequest.src;
    setApiSequence(updatedSequence);
  };

  return (
    <div className="flex bg-black text-white min-h-screen">
      {contextHolder}
      <div className="ml-10 mt-20 w-1/3">
        <div className="font-bold text-lg text-gray-300">
          Select API Sequence
        </div>
        <div className="flex flex-col border border-gray-700 rounded px-4 py-2 mt-2 bg-gray-800 shadow-md">
          {apiSequence.map((api, index) => {
            return (
              <div className="py-1 flex items-center" key={index}>
                <Dropdown
                  options={dropdownOptions}
                  value={api.name}
                  onSelect={(selectedOption) => {
                    handleApiOptionSelect(index, selectedOption);
                  }}
                  onBlur={(value) => handleOptionClick(value)}
                  onClick={(value) => handleOptionClick(value)}
                  className="flex-grow min-w-0"
                />
                <TrashIcon
                  className="w-6 h-6 text-red-500 cursor-pointer ml-2"
                  onClick={() => removeApiFromSequence(index)}
                />
              </div>
            );
          })}
          <button
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 mt-2"
            onClick={addApiToSequence}
          >
            Add API
          </button>
        </div>
        <button
          className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-500 font-medium rounded-lg text-sm px-5 py-2.5 mt-4"
          onClick={handleExecute}
        >
          Execute Sequence
        </button>
      </div>
      <div className="border-l-2 border-gray-600 max-h-max ml-5 mr-5"></div>
      <RightContainer
        selectedApi={activeRequest}
        onRequestEdit={onRequestUpdate}
        expectedResponse={expectedResponse}
        setExpectedResponse={setExpectedResponse}
      />
    </div>
  );
}
