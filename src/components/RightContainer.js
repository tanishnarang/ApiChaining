import { PencilSquareIcon, TagIcon } from "@heroicons/react/20/solid";
export default function RightContainer({ textHeading, request, response }) {
  return (
    <div className="container border rounded mt-20 mr-10 h-full flex flex-col px-2 py-2">
      <div className="heading">{textHeading}</div>
      <div className="mx-1 my-2 border rounded">
        <div className="flex flex-row justify-between border-b-2">
          <div className="ml-3">request</div>
          <div className="mr-3 flex">
            <PencilSquareIcon
              aria-hidden="true"
              className="mr-1 h-5 w-5 text-gray-400"
            ></PencilSquareIcon>
            <TagIcon
              aria-hidden="true"
              className="mr-1 h-5 w-5 text-gray-400"
            ></TagIcon>
          </div>
        </div>
        <div className="h-20">{request}</div>
      </div>
      <div className="mx-1 my-2 border rounded">
        <div className="flex flex-row justify-between border-b-2">
          <div className="ml-3">Expected output</div>
          <div className="mr-3">
            <PencilSquareIcon
              aria-hidden="true"
              className="-mr-1 h-5 w-5 text-gray-400"
            ></PencilSquareIcon>
          </div>
        </div>
        <div className="w-full h-20 overflow-y-auto shadow">
          {JSON.stringify(response)}
        </div>
      </div>
    </div>
  );
}
