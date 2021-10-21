import { render, screen } from '@testing-library/react';
import NavigationMenu from './NavigationMenu';
import navigationMenuData from '../navigation-menu-data.json';
import user from '@testing-library/user-event';

describe('NavigationMenu', () => {
  test("the child's open state is not affected by the parents open state", () => {
    render(<NavigationMenu navigationMenuChildren={navigationMenuData.data} />);

    // Open up node 1 and sub-nodes
    user.click(screen.getByText('Some node 1'));
    user.click(screen.getByText('Some node 1.1'));
    screen.getByText('Some node 1.1.1');

    // Close the parent node
    user.click(screen.getByText('Some node 1'));

    // Can no longer see the first child node.
    expect(screen.queryByText('Some node 1.1')).toBe(null);

    // Open up the parent node again.
    user.click(screen.getByText('Some node 1'));

    // Can see both child nodes.
    screen.getByText('Some node 1.1');
    screen.getByText('Some node 1.1.1');
  });
});
