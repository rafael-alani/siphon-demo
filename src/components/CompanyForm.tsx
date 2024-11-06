import { Building2, X } from 'lucide-react';
import React, { useState } from 'react';
import type { Commodity, Company, ResourceState } from '../types';

interface CompanyFormProps {
  onSubmit: (company: Company) => void;
  onClose: () => void;
}

export function CompanyForm({ onSubmit, onClose }: CompanyFormProps) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [statuses, setStatuses] = useState<ResourceState[]>([]);

  const handleAddStatus = () => {
    setStatuses([...statuses, {
      commodity: 'Electricity',
      status: 'surplus',
      amount: { value: 0, measurement_unit: 'kWh' }
    }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      location,
      statuses,
      last_active: new Date().toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Building2 className="text-cyan-500" />
            New Company
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Company Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Resource States</label>
              <button
                type="button"
                onClick={handleAddStatus}
                className="text-sm text-cyan-600 hover:text-cyan-700"
              >
                Add Resource
              </button>
            </div>

            {statuses.map((status, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 mb-2">
                <select
                  value={status.commodity}
                  onChange={(e) => {
                    const newStatuses = [...statuses];
                    newStatuses[index].commodity = e.target.value as Commodity;
                    setStatuses(newStatuses);
                  }}
                  className="rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                >
                  <option value="Electricity">Electricity</option>
                  <option value="Hydrogen">Hydrogen</option>
                  <option value="Heat">Heat</option>
                  <option value="Gas">Gas</option>
                </select>

                <select
                  value={status.status}
                  onChange={(e) => {
                    const newStatuses = [...statuses];
                    newStatuses[index].status = e.target.value as 'surplus' | 'deficit';
                    setStatuses(newStatuses);
                  }}
                  className="rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                >
                  <option value="surplus">Surplus</option>
                  <option value="deficit">Deficit</option>
                </select>

                <div className="flex gap-2">
                  <input
                    type="number"
                    value={status.amount.value}
                    onChange={(e) => {
                      const newStatuses = [...statuses];
                      newStatuses[index].amount.value = Number(e.target.value);
                      setStatuses(newStatuses);
                    }}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setStatuses(statuses.filter((_, i) => i !== index));
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            ))}
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
              Create Company
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}