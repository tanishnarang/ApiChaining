import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";

export default function RightContainer({
  selectedApi,
  onRequestEdit,
  expectedResponse,
  setExpectedResponse,
}) {
  const handleEdits = (params) => {
    onRequestEdit(params, selectedApi.name);
    console.log(params);
  };

  const getUpdatedJsonValue = (json) => {
    return json.src ?? json.newValue;
  };

  return (
    <div className="container border border-gray-700 rounded mt-20 mr-10 h-full flex flex-col px-2 py-2 bg-gray-900 text-white shadow-md">
      <div className="mx-1 my-2 border border-gray-700 rounded">
        <div className="flex flex-row justify-between border-b-2 border-gray-700 bg-gray-800 py-2 px-3">
          <div className="text-lg font-semibold text-gray-300">
            {selectedApi?.label} Request
          </div>
        </div>
        <div className="w-full h-50 overflow-y-auto shadow-inner bg-black text-gray-300">
          <JsonView
            src={selectedApi?.request ?? {}}
            editable={{ add: false, edit: true, delete: false }}
            enableClipboard={false}
            onEdit={handleEdits}
            style={{ backgroundColor: "#1f1f1f", color: "#ffffff" }}
          />
        </div>
      </div>
      <div className="mx-1 my-2 border border-gray-700 rounded">
        <div className="flex flex-row justify-between border-b-2 border-gray-700 bg-gray-800 py-2 px-3">
          <div className="text-lg font-semibold text-gray-300">
            Expected Response
          </div>
        </div>
        <div className="w-full h-50 overflow-y-auto shadow-inner bg-black text-gray-300">
          <JsonView
            src={expectedResponse || {}}
            editable={true}
            enableClipboard={false}
            onEdit={(json) => {
              setExpectedResponse(getUpdatedJsonValue(json));
            }}
            onDelete={(data) => {
              setExpectedResponse(data.updated_src);
            }}
            style={{ backgroundColor: "#1f1f1f", color: "#ffffff" }}
          />
        </div>
      </div>
    </div>
  );
}
