import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

/**
 * useApp Hook — Service Layer Injector
 * Any component that calls useApp() gets access to the shared state.
 */
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
