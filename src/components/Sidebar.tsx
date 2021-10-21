import { FC } from 'react';

const Sidebar: FC = ({ children }) => {
  return (
    <aside className="sm:w-1/3 md:1/4 w-full flex-shrink flex-grow-0 p-4 bg-purple-600 bg-opacity-25">
      <div className="top-0 w-full font-bold">{children}</div>
    </aside>
  );
};

export default Sidebar;
