import React, { FC, useState } from 'react';
import NavigationMenuChild from '../interfaces/NavigationMenuChild';
import { ReactComponent as ChevronDown } from '../icons/chevron-down.svg';
import { ReactComponent as ChevronRight } from '../icons/chevron-right.svg';

type ExpandedStatusMap = { [name: string]: boolean };

const NavigationMenu: FC<{
  navigationMenuChildren: NavigationMenuChild[];
  setSelectedNode: (name: string) => void;
  selectedNode: string;
}> = (props) => {
  const [expandedStatusMap, setExpandedStatusMap] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleMenuItem = (name: string) => {
    setExpandedStatusMap({
      ...expandedStatusMap,
      [name]: !expandedStatusMap[name],
    });
  };

  return (
    <Menu
      toggleMenuItem={toggleMenuItem}
      expandedStatusMap={expandedStatusMap}
      {...props}
    />
  );
};

const MenuItem: FC<{
  menuItem: NavigationMenuChild;
  toggleMenuItem: (name: string) => void;
  expandedStatusMap: ExpandedStatusMap;
  setSelectedNode: (name: string) => void;
  selectedNode: string;
}> = ({
  menuItem: { name, children },
  toggleMenuItem,
  expandedStatusMap,
  setSelectedNode,
  selectedNode,
}) => {
  const isExpandable = !!children?.length;
  const isExpanded = expandedStatusMap[name];
  const isSelected = selectedNode === name;

  return (
    <li
      key={name}
      onClick={(e) => {
        e.stopPropagation();
        if (isExpandable) {
          toggleMenuItem(name);
        } else {
          setSelectedNode(name);
        }
      }}
      className="ml-2 cursor-pointer"
    >
      <div
        className={`flex items-center hover:text-gray-500	${
          isSelected ? 'text-gray-600' : ''
        }`}
      >
        {name}{' '}
        {isExpandable ? (
          <>{isExpanded ? <ChevronDown /> : <ChevronRight />}</>
        ) : null}
      </div>
      {isExpandable && isExpanded ? (
        <Menu
          selectedNode={selectedNode}
          setSelectedNode={setSelectedNode}
          navigationMenuChildren={children}
          expandedStatusMap={expandedStatusMap}
          toggleMenuItem={toggleMenuItem}
        />
      ) : null}
    </li>
  );
};

const Menu: FC<{
  navigationMenuChildren: NavigationMenuChild[];
  expandedStatusMap: ExpandedStatusMap;
  toggleMenuItem: (name: string) => void;
  setSelectedNode: (name: string) => void;
  selectedNode: string;
}> = ({ navigationMenuChildren, ...props }) => {
  return (
    <ul className="text-black">
      {navigationMenuChildren.map((menuItem) => (
        <MenuItem key={menuItem.name} menuItem={menuItem} {...props} />
      ))}
    </ul>
  );
};

export default NavigationMenu;
