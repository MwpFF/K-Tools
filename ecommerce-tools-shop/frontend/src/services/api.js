// Relative /api/v1: Vite proxy in dev, Nginx reverse proxy in production (Docker)
const API_BASE = import.meta.env.VITE_API_URL || '/api/v1';

export const ordersApi = {
  createOrder: async (orderData) => {
    const response = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) throw new Error('Failed to create order');
    return response.json();
  },

  getOrder: async (id) => {
    const response = await fetch(`${API_BASE}/orders/${id}`);
    if (!response.ok) throw new Error('Order not found');
    return response.json();
  },

  getOrders: async () => {
    const response = await fetch(`${API_BASE}/orders`);
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  },
};
