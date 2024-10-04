import { Menu, MenuButton } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function Dropdown({ newapi, onSelect }) {
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left w-full">
        <div>
          <MenuButton
            onClick={onSelect(newapi)}
            className="inline-flex w-full justify-between items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 text-left"
          >
            {newapi}
            <ChevronDownIcon
              aria-hidden="true"
              className="-mr-1 h-5 w-5 text-gray-400"
            />
          </MenuButton>
        </div>
      </Menu>
    </div>
  );
}
