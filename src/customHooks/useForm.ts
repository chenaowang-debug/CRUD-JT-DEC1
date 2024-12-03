import { useContext } from 'react';
import { FormContext } from '../components/FormContext';

export const useForm = () => {
  const context = useContext(FormContext);

  if (!context)
    throw new Error('useForm must be used within a FormContextProvider');
  
  return context;
};
