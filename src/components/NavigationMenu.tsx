import React, { FC, useState } from 'react';
import NavigationMenuChild from '../interfaces/NavigationMenuChild';
import { ReactComponent as ChevronDown } from '../icons/chevron-down.svg';
import { ReactComponent as ChevronRight } from '../icons/chevron-right.svg';

type ExpandedStatusMap = { [name: string]: boolean };

const NavigationMenu: FC<{
  navigationMenuChildren: NavigationMenuChild[];
}> = ({ navigationMenuChildren }) => {
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
      navigationMenuChildren={navigationMenuChildren}
    />
  );
};

const MenuItem: FC<{
  menuItem: NavigationMenuChild;
  toggleMenuItem: (name: string) => void;
  expandedStatusMap: ExpandedStatusMap;
}> = ({ menuItem: { name, children }, toggleMenuItem, expandedStatusMap }) => {
  const isExpandable = !!children?.length;
  const isExpanded = expandedStatusMap[name];

  return (
    <li
      key={name}
      onClick={(e) => {
        e.stopPropagation();
        if (isExpandable) toggleMenuItem(name);
      }}
      className={`ml-2 ${isExpandable ? 'cursor-pointer' : 'cursor-text'}`}
    >
      <div className="flex align-center">
        {name}{' '}
        {isExpandable ? (
          <>{isExpanded ? <ChevronDown /> : <ChevronRight />}</>
        ) : null}
      </div>
      {isExpandable && isExpanded ? (
        <Menu
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
}> = ({ navigationMenuChildren, expandedStatusMap, toggleMenuItem }) => {
  return (
    <ul>
      {navigationMenuChildren.map((menuItem) => (
        <MenuItem
          key={menuItem.name}
          menuItem={menuItem}
          toggleMenuItem={toggleMenuItem}
          expandedStatusMap={expandedStatusMap}
        />
      ))}
    </ul>
  );
};

export default NavigationMenu;
