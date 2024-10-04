import { useState } from "react";
import Dropdown from "./Dropdown";
import RightContainer from "./RightContainer";
import axios from "axios";
export default function ApiList() {
  const apilist = ["User Api", "Post Api", "Comment Api"];
  const [newApiList, setApiList] = useState(apilist);
  const [textHeading, setTextHeading] = useState("Select the Api");
  const [request, setRequest] = useState("no request available at the moment");
  const [response, setResponse] = useState("no response available");

  const handleApiList = () => {
    const api = prompt("enter name of new list of api:");
    setApiList([...newApiList, api]);
  };

  const handleTextHeading = (newHeading) => {
    setTextHeading(newHeading);
  };

  const handleRequest = (newRequest) => {
    setRequest(newRequest);
  };

  const handleResponse = (newResponse) => {
    setResponse(newResponse);
  };

  const handleUserApi = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      const userArray = response.data.map((user) => {
        const name = user.name;
        const id = user.id;
        const email = user.email;

        return { name, id, email };
      });

      setResponse(userArray);
    } catch (error) {
      setResponse("error");
      console.log(error);
    }
  };

  const handlePostApi = () => {
    const data = request;
    axios
      .post("https://your-api-endpoint", data)
      .then((response) => {
        setResponse(response.data);
      })
      .catch((error) => {
        setResponse("error");
        console.log(error);
      });
  };
  const handleCommentApi = async () => {
    const postId = prompt("Enter post ID to search:");
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
      );
      setResponse(response.data);
    } catch (error) {
      setResponse("error");
      console.log(error);
    }
    return;
  };
  return (
    <div className="flex">
      <div className="ml-10 mt-20 w-1/3">
        <div className="font-bold">Select Api Sequence</div>
        <div className="flex flex-col border rounded px-4 py-2 mt-2">
          {newApiList.map((newapi, index) => {
            return (
              <div className="py-1">
                <Dropdown
                  key={index}
                  newapi={newapi}
                  onSelect={(api) => {
                    if (api === "User Api") {
                      handleUserApi();
                    } else if (api === "Post Api") {
                      handlePostApi();
                    } else if (api === "Comment Api") {
                      handleCommentApi();
                    }
                  }}
                />
              </div>
            );
          })}
          <div className="">
            <button
              className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-2"
              onClick={handleApiList}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      <div className="border-l border-gray-300 max-h-max mt-20 ml-5 mr-5"></div>
      <RightContainer
        textHeading={textHeading}
        request={request}
        response={response}
      />
    </div>
  );
}
