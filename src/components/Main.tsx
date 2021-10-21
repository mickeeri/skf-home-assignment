import { FC } from 'react';

const Main: FC = ({ children }) => {
  return (
    <main className="w-full h-full flex-grow p-4 overflow-auto font-bold">
      {children}
    </main>
  );
};

export default Main;
