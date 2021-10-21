import { useEffect, useState } from 'react';
import NavigationMenu from './components/NavigationMenu';
import Header from './components/Header';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import * as api from './services/api';
import NavigationMenuData from './interfaces/NavigationMenuData';

function App() {
  const [loadingState, setLoadingState] = useState<
    'empty' | 'loading' | 'success' | 'failure'
  >('empty');
  const [navigationMenuData, setNavigationMenuData] =
    useState<NavigationMenuData | null>(null);
  const [selectedNode, setSelectedNode] = useState('');

  useEffect(() => {
    const getNavigationMenuData = async () => {
      try {
        setLoadingState('loading');

        const response = await api.getNavigationMenuData();
        setNavigationMenuData(response.data);

        setLoadingState('success');
      } catch (error) {
        setLoadingState('failure');
      }
    };

    getNavigationMenuData();
  }, []);

  return (
    <div className="App h-screen">
      <Header />

      <div className="w-full h-full flex flex-col sm:flex-row flex-grow overflow-hidden pt-12">
        <Sidebar>
          {loadingState === 'failure' ? (
            <div className="text-red-600">
              Sorry, there was an error when fetching the data
            </div>
          ) : null}

          {loadingState === 'loading' ? (
            <div className="font-bold">Loading...</div>
          ) : null}

          {navigationMenuData && loadingState === 'success' ? (
            <NavigationMenu
              setSelectedNode={setSelectedNode}
              navigationMenuChildren={navigationMenuData.data}
              selectedNode={selectedNode}
            />
          ) : null}
        </Sidebar>

        <Main>
          {selectedNode
            ? selectedNode
            : 'Please select an item in the left menu'}
        </Main>
      </div>
    </div>
  );
}

export default App;
