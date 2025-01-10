import { MENU_BASE_URL, API_URL } from './config';

const defaultConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

const API = {
  fetchBars: async (searchTerm, page) => {
    try {
        const endpoint = `${API_URL}Menu`;
        const data = await fetch(endpoint).then((res) => res.json());

        const results = data.reduce((acc, menu) => {
            const existingBar = acc.find((bar) => bar.barId === menu.barId);
            if (existingBar) {
                existingBar.menus.push({ id: menu.id, name: menu.name });
            } else {
                acc.push({
                    barId: menu.barId,
                    menus: [{ id: menu.id, name: menu.name }],
                });
            }
            return acc;
        }, []);

        return {
            page,
            results,
            total_pages: 1,
            total_results: results.length,
        };
    } catch (error) {
        console.error("Error fetching bars:", error);
        throw new Error("Failed to fetch bars");
    }
},

  fetchMenu: async () => {
    const endpoint = `${MENU_BASE_URL}`;
    return await (await fetch(endpoint, { method: 'GET' })).json();
  },
  // Example: Fetch a specific menu item by ID
  fetchMenuItem: async (menuId) => {
    const endpoint = `${MENU_BASE_URL}/${menuId}`;
    return await (await fetch(endpoint, { method: 'GET' })).json();
  },
  // Example: Create a new menu item
  createMenuItem: async (menuItemData) => {
    const endpoint = `${MENU_BASE_URL}`;
    const response = await (
      await fetch(endpoint, {
        ...defaultConfig,
        body: JSON.stringify(menuItemData),
      })
    ).json();
    return response;
  },
  // Example: Update an existing menu item
  updateMenuItem: async (menuId, updatedData) => {
    const endpoint = `${MENU_BASE_URL}/${menuId}`;
    const response = await (
      await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      })
    ).json();
    return response;
  },
  // Example: Delete a menu item
  deleteMenuItem: async (menuId) => {
    const endpoint = `${MENU_BASE_URL}/${menuId}`;
    const response = await (
      await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).json();
    return response;
  },
};

export default API;
