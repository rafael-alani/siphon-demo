import { v4 as uuidv4 } from 'uuid';
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
    console.log(trade);
    const tradeWithId = {
      ...trade,
      id: uuidv4(),
      time: new Date().toISOString(),
    };
    const response = await fetch(`${API_URL}/trades`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tradeWithId),
    });
    return response.json();
  },

  async getOffers() {
    const response = await fetch(`${API_URL}/trades/offers`);
    return response.json();
  },

  async getRequests() {
    const response = await fetch(`${API_URL}/trades/requests`);
    return response.json();
  },

  async getTradeHistory() {
    const response = await fetch(`${API_URL}/trades/history`);
    return response.json();
  },

  async getCompany(name: string) {
    const response = await fetch(`${API_URL}/companies/${name}`);
    return response.json();
  }
};