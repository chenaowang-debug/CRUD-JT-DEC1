import React, { createContext, useState, ReactNode } from 'react';

// defined the type of context
export type FormContextType = {
  company: string;
  setCompany: (company: string) => void;
  location: string;
  setLocation: (location: string) => void;
  jobTitle: string;
  setJobTitle: (jobTitle: string) => void;
  dateApplied: string;
  setDateApplied: (dateApplied: string) => void;
  source: string;
  setSource: (source: string) => void;
  applyMethod: string;
  setApplyMethod: (applyMethod: string) => void;
  coverLetter: string;
  setCoverLetter: (coverLetter: string) => void;
  doubleDown: string;
  setDoubleDown: (doubleDown: string) => void;
};

//create the context with createContext
const FormContext = createContext<FormContextType | undefined>(undefined);

interface FormContextProviderProps {
  children: ReactNode;
}

const FormContextProvider: React.FC<FormContextProviderProps> = ({
  children,
}) => {
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [dateApplied, setDateApplied] = useState('');
  const [source, setSource] = useState('');
  const [applyMethod, setApplyMethod] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [doubleDown, setDoubleDown] = useState('');

  return (
    <FormContext.Provider
      value={{
        company,
        setCompany,
        location,
        setLocation,
        jobTitle,
        setJobTitle,
        dateApplied,
        setDateApplied,
        source,
        setSource,
        applyMethod,
        setApplyMethod,
        coverLetter,
        setCoverLetter,
        doubleDown,
        setDoubleDown,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export { FormContextProvider, FormContext };
