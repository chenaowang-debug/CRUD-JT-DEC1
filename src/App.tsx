import React, { useState } from 'react';
import Main, { Job } from './components/Main';
import { FormContextProvider } from './components/FormContext';

const App: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  return (
    <FormContextProvider>
      <Main jobs={jobs} setJobs={setJobs} />
    </FormContextProvider>
  );
};

export default App;
