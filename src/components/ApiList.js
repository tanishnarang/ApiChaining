import { useState } from "react";
import _ from "lodash";
import Dropdown from "./Dropdown";
import { message } from "antd";
import RightContainer from "./RightContainer";
import axios from "axios";
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
        userId: "{{userApi[0].id}}",
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

  const dropdownOptions = availableApi.map((api) => {
    return { value: api.name, label: api.label };
  });
  const [messageApi, contextHolder] = message.useMessage();
  const [activeRequest, setActiveRequest] = useState({});
  const [expectedResponse, setExpectedResponse] = useState({
    title: "favourite cars",
    body: "1969 ford mustang,1960 toyota celica,1970 dodge charger",
    userId: 1,
  });

  const addApiToSequence = () => {
    setApiSequence([...apiSequence, {}]);
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

  const onRequestUpdate = (updatedRequest, apiName) => {
    const index = apiSequence.findIndex((api) => api.name === apiName);
    const updatedSequence = [...apiSequence];
    updatedSequence[index].request = updatedRequest.src;
    setApiSequence(updatedSequence);
  };
  const transformRequests = (request, responses) => {
    console.log(request);
    Object.keys(request).forEach((key) => {
      console.log(request, key, request[key], responses);
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
      .replace(/\[(\w+)\]/g, ".$1") // Convert [0] to .0, handles array index cases
      .replace(/^\./, "") // Remove leading dot, if any
      .split(".") // Split into array by dot notation
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
    const responses = {};

    for await (const api of apiSequence) {
      console.log(responses);
      const apiRequest = transformRequests(api.request, responses);
      const response = await axios({
        method: api.method,
        url: api.endPoint,
        params: api.method === "GET" ? apiRequest : {},
        data: api.method === "POST" ? apiRequest : {},
      });
      responses[api.name] = response.data;
    }
    // console.log(responses);
    // console.log(expectedResponse);
    const lastResponse = responses[apiSequence[apiSequence.length - 1].name];
    console.log(_.isEqual(lastResponse, expectedResponse));
    _.isEqual(lastResponse, expectedResponse) ? success() : error();
    console.log(lastResponse, expectedResponse);
  };
  return (
    <div className="flex">
      {contextHolder}
      <div className="ml-10 mt-20 w-1/3">
        <div className="font-bold">Select Api Sequence</div>
        <div className="flex flex-col border rounded px-4 py-2 mt-2">
          {apiSequence.map((api, index) => {
            return (
              <div className="py-1">
                <Dropdown
                  key={index}
                  options={dropdownOptions}
                  value={api.name}
                  onSelect={(selectedOption) => {
                    handleApiOptionSelect(index, selectedOption);
                  }}
                  onBlur={(value) => handleOptionClick(value)}
                  onClick={(value) => handleOptionClick(value)}
                />
              </div>
            );
          })}
          <div className="">
            <button
              className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-2"
              onClick={addApiToSequence}
            >
              Add
            </button>
          </div>
        </div>
        <button
          className="text-white bg-green-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-pink-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-2"
          onClick={handleExecute}
        >
          {" "}
          Execute
        </button>
      </div>
      <div className="border-l border-gray-300 max-h-max mt-20 ml-5 mr-5"></div>
      <RightContainer
        selectedApi={activeRequest}
        onRequestEdit={onRequestUpdate}
        expectedResponse={expectedResponse}
        setExpectedResponse={setExpectedResponse}
      />
    </div>
  );
}
