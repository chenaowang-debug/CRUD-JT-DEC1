import React, { useEffect } from 'react';
import { useForm } from '../customHooks/useForm';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import formSubmit from '../helpers/formSubmit';

export interface Job {
  company: string;
  location: string;
  jobTitle: string;
  dateApplied: string;
  applyMethod: string;
  coverLetter: string;
  doubleDown: string;
}

interface MainProps {
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
}

const sourceArray: string[] = [
  'Linkedln',
  'Welcome to the Jungle',
  'Built-in',
  'ZipRecruiter',
  'Indeed',
  'Other',
];
const options: string[] = ['Yes', 'No'];
const applyMethodArray: string[] = [
  'EasyApply',
  'Codesmith Style',
  'Hybrid',
  'Other',
];

const Main: React.FC<MainProps> = ({ jobs, setJobs }) => {
  const {
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
  } = useForm();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      company,
      location,
      jobTitle,
      dateApplied,
      applyMethod,
      coverLetter,
      doubleDown,
    };
    try {
      const response = await formSubmit(formData);
      if (!response.ok) {
        throw new Error('Error at formSubmit helper function');
      }
      setCompany('');
      setLocation('');
      setJobTitle('');
      setDateApplied('');
      setApplyMethod('');
      setCoverLetter('');
      setDoubleDown('');
    } catch (error) {
      console.log('Error sending form data to server', error);
    }
  };

  return (
    <>
      <form className='inputform' onSubmit={handleFormSubmit}>
        <div className='all-input'>
          <input
            id='company'
            placeholder={`Enter Company...`}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <input
            id='location'
            placeholder={`Enter Location...`}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            id='job-title'
            placeholder={`Enter Job Title...`}
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />

          {/* select date applied */}
          <div className='form-date' style={{ padding: '3px' }}>
            <DatePicker
              id='date'
              dateFormat='yyyy-MM-dd'
              placeholderText='date applied'
              value={dateApplied}
              onChange={(date: Date | null) =>
                setDateApplied(date ? date.toISOString().split('T')[0] : '')
              }
            />
          </div>
        </div>

        {/* select job source */}
        <div className='form-source'>
          <p>source: </p>
          {sourceArray.map((index) => (
            <div key={index}>
              <label htmlFor={index}>{index}</label>
              <input
                id={index}
                type='radio'
                name='source'
                value={index}
                checked={source === index}
                onChange={(e) => setSource(e.target.value)}
                style={{ marginRight: '30px', marginLeft: '5px' }}
              />
            </div>
          ))}
        </div>

        {/* select apply method */}
        <div className='form-applymethod'>
          <p>apply method:</p>
          {applyMethodArray.map((index) => (
            <div key={index}>
              <label htmlFor={index}>{index}</label>
              <input
                id={index}
                type='radio'
                name='apply-method'
                value={index}
                checked={applyMethod === index}
                onChange={(e) => setApplyMethod(e.target.value)}
                style={{ marginRight: '30px', marginLeft: '5px' }}
              />
            </div>
          ))}
        </div>

        {/* select cover letter */}
        <div className='cover-letter'>
          <p>cover letter:</p>
          {options.map((option) => (
            <div key={option}>
              <label htmlFor={`coverLetter-${option}`}>{option}</label>
              <input
                id={`coverLetter-${option}`}
                type='radio'
                name='coverLetter'
                value={option}
                onChange={(e) => setCoverLetter(e.target.value)}
                style={{ marginRight: '30px', marginLeft: '5px' }}
              />
            </div>
          ))}
        </div>

        {/* select double down */}
        <div className='double-down'>
          <p>double down:</p>
          {options.map((option) => (
            <div key={option}>
              <label htmlFor={`doubleDown-${option}`}>{option}</label>
              <input
                id={`doubleDown-${option}`}
                type='radio'
                name='doubleDown'
                value={option}
                onChange={(e) => setDoubleDown(e.target.value)}
                style={{ marginRight: '30px', marginLeft: '5px' }}
              />
            </div>
          ))}
        </div>
        <button id='submit-button' type='submit'>
          Add to Database
        </button>
      </form>

      <div className='job-build'>
        <div id='preview'>
          <p>Preview</p>
        </div>
        <div>
          <p>Date applied: {dateApplied}</p>
          <p>Company: {company}</p>
          <p>Location: {location}</p>
          <p>Job Title: {jobTitle}</p>
          <p>Source: {source}</p>
          <p>Apply Method: {applyMethod}</p>
          <p>Cover Letter: {coverLetter}</p>
          <p>Double Down: {doubleDown}</p>
        </div>
      </div>
    </>
  );
};

export default Main;
