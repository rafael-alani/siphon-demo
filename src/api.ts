import type { Company, Trade } from './types';

const API_URL = 'http://localhost:8000';

export const api = {
  async createCompany(company: Company) {
    const response = await fetch(`${API_URL}/companies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(company),
    });
    return response.json();
  },

  async getCompanies() {
    const response = await fetch(`${API_URL}/companies`);
    return response.json();
  },

  async deleteCompany(name: string) {
    const response = await fetch(`${API_URL}/companies/${name}`, {
      method: 'DELETE',
    });
    return response.json();
  },

  async createTrade(trade: Trade) {
    const endpoint = trade.type === 'sell' ? 'offer' : 'request';
    const response = await fetch(`${API_URL}/trades/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trade),
    });
    return response.json();
  },
};