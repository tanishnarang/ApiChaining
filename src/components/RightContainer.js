import { PencilSquareIcon } from "@heroicons/react/20/solid";
import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";
export default function RightContainer({
  selectedApi,
  onRequestEdit,
  expectedResponse,
  setExpectedResponse,
}) {
  const request = {
    title: "favourite cars",
    body: "1969 ford mustang,1960 toyota celica,1970 dodge charger",
    userId: 1,
  };

  const handleEdits = (params) => {
    onRequestEdit(params, selectedApi.name);
    console.log(params);
  };
  return (
    <div className="container border rounded mt-20 mr-10 h-full flex flex-col px-2 py-2">
      {/* <div className="heading">{textHeading}</div> */}
      <div className="mx-1 my-2 border rounded">
        <div className="flex flex-row justify-between border-b-2">
          <div className="ml-3">{selectedApi?.label} request</div>
          <div className="mr-3 flex">
            <PencilSquareIcon
              aria-hidden="true"
              className="mr-1 h-5 w-5 text-gray-400"
            ></PencilSquareIcon>
          </div>
        </div>
        <div className="w-full h-50 overflow-y-auto shadow">
          <JsonView
            src={selectedApi?.request ?? {}}
            editable={{ add: false, edit: true, delete: false }}
            enableClipboard={false}
            onEdit={handleEdits}
          />
        </div>
      </div>
      <div className="mx-1 my-2 border rounded">
        <div className="flex flex-row justify-between border-b-2">
          <div className="ml-3">Expected response</div>
          <div className="mr-3">
            <PencilSquareIcon
              aria-hidden="true"
              className="-mr-1 h-5 w-5 text-gray-400"
            ></PencilSquareIcon>
          </div>
        </div>
        <div className="w-full h-50 overflow-y-auto shadow">
          <JsonView
            src={expectedResponse}
            editable={true}
            onEdit={(json) => {
              setExpectedResponse(json.src);
              console.log("json", json);
            }}
          />
        </div>
      </div>
    </div>
  );
}
