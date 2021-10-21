import NavigationMenu from './components/NavigationMenu';
import navigationMenuData from './navigation-menu-data.json';
import NavigationMenuData from './interfaces/NavigationMenuData';

import './App.css';

function App() {
  return (
    <div className="App">
      <NavigationMenu
        navigationMenuChildren={(navigationMenuData as NavigationMenuData).data}
      />
    </div>
  );
}

export default App;
