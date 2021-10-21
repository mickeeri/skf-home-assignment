import { screen, render } from '@testing-library/react';
import App from './App';
import { getNavigationMenuData } from './services/api';
import navigationMenuData from './navigation-menu-data.json';
import user from '@testing-library/user-event';

jest.mock('./services/api');

describe('App', () => {
  beforeEach(() => {
    (getNavigationMenuData as jest.Mock).mockResolvedValueOnce({
      data: navigationMenuData,
    });
  });

  it('should fetch and render navigation menu data', async () => {
    render(<App />);

    await screen.findByText('Some node 1');
  });

  it('shows the text of the selected node when clicking on it', async () => {
    render(<App />);

    const firstNode = await screen.findByText('Some node 1');

    // Click until all nodes are expanded
    user.click(firstNode);
    user.click(screen.getByText('Some node 1.1'));
    user.click(screen.getByText('Some node 1.1.1'));

    expect(screen.getByRole('main')).toHaveTextContent('Some node 1.1.1');
  });
});
