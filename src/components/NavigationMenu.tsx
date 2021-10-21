import React, { FC, useState } from 'react';
import NavigationMenuChild from '../interfaces/NavigationMenuChild';
import { ReactComponent as ChevronDown } from '../icons/chevron-down.svg';
import { ReactComponent as ChevronRight } from '../icons/chevron-right.svg';

const MenuItem: FC<{
  menuItem: NavigationMenuChild;
  isExpanded: boolean;
  toggleMenuItem: (name: string) => void;
}> = ({ menuItem: { name, children }, isExpanded, toggleMenuItem }) => {
  const isExpandable = !!children?.length;

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
        <NavigationMenu navigationMenuChildren={children} />
      ) : null}
    </li>
  );
};

const NavigationMenu: FC<{ navigationMenuChildren: NavigationMenuChild[] }> = ({
  navigationMenuChildren,
}) => {
  const [expandedStatusMap, setExpandedStatusMap] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleMenuItem = (name: string) => {
    setExpandedStatusMap({
      ...expandedStatusMap,
      [name]: !expandedStatusMap[name],
    });
  };

  console.log(expandedStatusMap);

  return (
    <ul>
      {navigationMenuChildren.map((menuItem) => (
        <MenuItem
          key={menuItem.name}
          menuItem={menuItem}
          isExpanded={expandedStatusMap[menuItem.name]}
          toggleMenuItem={toggleMenuItem}
        />
      ))}
    </ul>
  );
};

export default NavigationMenu;
