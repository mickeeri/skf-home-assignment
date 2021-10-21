import NavigationMenu from './components/NavigationMenu';
import navigationMenuData from './navigation-menu-data.json';

import './App.css';

function App() {
  return (
    <div className="App">
      <NavigationMenu navigationMenuChildren={navigationMenuData.data} />
    </div>
  );
}

export default App;
