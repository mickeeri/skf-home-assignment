import axios from 'axios';
import NavigationMenuData from '../interfaces/NavigationMenuData';

const API_ENDPOINT =
  'https://run.mocky.io/v3/a509f065-468e-45fc-870c-91a48a62a10f?mocky-delay=600ms';

export const getNavigationMenuData = () => {
  return axios.get<NavigationMenuData>(API_ENDPOINT);
};
