import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api.js';
import toast from 'react-hot-toast';

import { FALLBACK_PORTFOLIO } from '../utils/fallbackData.js';

const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState(FALLBACK_PORTFOLIO);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const res = await api.get('/portfolio');
      if (res.data.success && res.data.data) {
        setPortfolio(res.data.data);
      }
    } catch (err) {
      console.warn('Portfolio database is offline. Using local premium fallback data.');
      // Keep FALLBACK_PORTFOLIO intact
    } finally {
      setLoading(false);
    }
  };

  const updatePortfolioData = async (updatedData) => {
    try {
      const res = await api.put('/portfolio', updatedData);
      if (res.data.success) {
        setPortfolio(res.data.data);
        toast.success('Portfolio updated successfully!');
        return true;
      }
      return false;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
      return false;
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        loading,
        error,
        fetchPortfolio,
        updatePortfolio: updatePortfolioData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
