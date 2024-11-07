import { ArrowLeftRight, X } from 'lucide-react';
import React, { useState } from 'react';
import type { Company, Trade } from '../types';

interface TradeFormProps {
  type: 'buy' | 'sell';
  companies: Company[];
  onSubmit: (trade: Trade) => void;
  onClose: () => void;
}

const UNITS: Record<string, string> = {
  'Electricity': 'kWh',
  'Hydrogen': 'kg',
  'Heat': 'kWh',
  'Gas': 'm³'
};

export function TradeForm({ type, companies, onSubmit, onClose }: TradeFormProps) {
  const [trade, setTrade] = useState<Trade>({
    commodity: 'Electricity',
    type,
    amount: { value: 0, measurement_unit: 'kWh' },
    price: { value: 0, currency: 'EUR' },
    status: 'Pending',
    requester_company: companies[0]?.name || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(trade);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <ArrowLeftRight className="text-cyan-500" />
            New {type === 'buy' ? 'Request' : 'Offer'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Commodity</label>
            <select
              value={trade.commodity}
              onChange={(e) => setTrade({
                ...trade,
                commodity: e.target.value as Trade['commodity'],
                amount: { ...trade.amount, measurement_unit: UNITS[e.target.value] }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
            >
              <option value="Electricity">Electricity</option>
              <option value="Hydrogen">Hydrogen</option>
              <option value="Heat">Heat</option>
              <option value="Gas">Gas</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Company</label>
            <select
              value={trade.requester_company}
              onChange={(e) => setTrade({ ...trade, requester_company: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
            >
              {companies.map((company) => (
                <option key={company.name} value={company.name}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Amount</label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="number"
                  value={trade.amount.value === 0 ? '' : trade.amount.value}
                  onChange={(e) => setTrade({
                    ...trade,
                    amount: { ...trade.amount, value: e.target.value === '' ? 0 : Number(e.target.value) }
                  })}
                  onBlur={(e) => {
                    if (e.target.value === '') {
                      setTrade({
                        ...trade,
                        amount: { ...trade.amount, value: 0 }
                      });
                    }
                  }}
                  className="block w-full rounded-l-md border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                  required
                />
                <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  {trade.amount.measurement_unit}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Price per unit</label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="number"
                  value={trade.price.value === 0 ? '' : trade.price.value}
                  onChange={(e) => setTrade({
                    ...trade,
                    price: { ...trade.price, value: e.target.value === '' ? 0 : Number(e.target.value) }
                  })}
                  onBlur={(e) => {
                    if (e.target.value === '') {
                      setTrade({
                        ...trade,
                        price: { ...trade.price, value: 0 }
                      });
                    }
                  }}
                  className="block w-full rounded-l-md border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                  required
                />
                <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  EUR
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-green-500 rounded-md hover:from-cyan-600 hover:to-green-600"
            >
              Create {type === 'buy' ? 'Request' : 'Offer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}