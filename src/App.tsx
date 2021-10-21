import NavigationMenu from './components/NavigationMenu';
import navigationMenuData from './navigation-menu-data.json';
import Header from './components/Header';
import Main from './components/Main';
import Sidebar from './components/Sidebar';

import './App.css';

function App() {
  return (
    <div className="App h-screen">
      <Header />

      <div className="w-full h-full flex flex-col sm:flex-row flex-grow overflow-hidden pt-12">
        <Sidebar>
          <NavigationMenu navigationMenuChildren={navigationMenuData.data} />
        </Sidebar>
        <Main />
      </div>
    </div>
  );
}

export default App;
