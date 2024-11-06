import React, { useState, useEffect } from 'react';
import { Building2, Plus, Trash2, ArrowDownToLine, ArrowUpToLine } from 'lucide-react';
import { CompanyForm } from './components/CompanyForm';
import { TradeForm } from './components/TradeForm';
import { api } from './api';
import type { Company, Trade } from './types';

function App() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [showCompanyForm, setShowCompanyForm] = useState(false);
  const [showTradeForm, setShowTradeForm] = useState<'buy' | 'sell' | null>(null);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      const companies = await api.getCompanies();
      setCompanies(companies);
    } catch (error) {
      console.error('Failed to load companies:', error);
    }
  };

  const handleCreateCompany = async (company: Company) => {
    try {
      await api.createCompany(company);
      setShowCompanyForm(false);
      loadCompanies();
    } catch (error) {
      console.error('Failed to create company:', error);
    }
  };

  const handleDeleteCompany = async (name: string) => {
    try {
      await api.deleteCompany(name);
      loadCompanies();
    } catch (error) {
      console.error('Failed to delete company:', error);
    }
  };

  const handleCreateTrade = async (trade: Trade) => {
    try {
      await api.createTrade(trade);
      setShowTradeForm(null);
    } catch (error) {
      console.error('Failed to create trade:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-cyan-500 to-green-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img src="/logo.svg" alt="Siphon" className="h-10 w-10" />
              <h1 className="text-2xl font-bold text-white">Siphon Trading</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Companies Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Building2 className="text-cyan-500" />
              Companies
            </h2>
            <button
              onClick={() => setShowCompanyForm(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-green-500 rounded-md hover:from-cyan-600 hover:to-green-600"
            >
              <Plus size={16} />
              Add Company
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {companies.map((company) => (
              <div key={company.name} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{company.name}</h3>
                  <button
                    onClick={() => handleDeleteCompany(company.name)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mb-2">{company.location}</p>
                <div className="space-y-2">
                  {company.statuses.map((status, index) => (
                    <div key={index} className="text-sm flex justify-between items-center">
                      <span>{status.commodity}</span>
                      <span className={status.status === 'surplus' ? 'text-green-500' : 'text-red-500'}>
                        {status.amount.value} {status.amount.measurement_unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trading Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Trading Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setShowTradeForm('buy')}
              className="flex items-center justify-center gap-2 p-4 text-cyan-700 bg-cyan-50 rounded-lg hover:bg-cyan-100"
            >
              <ArrowDownToLine size={20} />
              Create Request
            </button>
            <button
              onClick={() => setShowTradeForm('sell')}
              className="flex items-center justify-center gap-2 p-4 text-green-700 bg-green-50 rounded-lg hover:bg-green-100"
            >
              <ArrowUpToLine size={20} />
              Create Offer
            </button>
          </div>
        </div>
      </main>

      {/* Forms */}
      {showCompanyForm && (
        <CompanyForm
          onSubmit={handleCreateCompany}
          onClose={() => setShowCompanyForm(false)}
        />
      )}
      {showTradeForm && (
        <TradeForm
          type={showTradeForm}
          companies={companies}
          onSubmit={handleCreateTrade}
          onClose={() => setShowTradeForm(null)}
        />
      )}
    </div>
  );
}

export default App;