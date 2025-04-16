import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Filter = () => {
  const router = useRouter();
  const [filters, setFilters] = useState({
    jobType: '',
    education: '',
    experience: '',
    salary: '',
  });

  // Initialize checkbox states from query parameters
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const query = new URLSearchParams(window.location.search);
      setFilters({
        jobType: query.get('jobType') || '',
        education: query.get('education') || '',
        experience: query.get('experience') || '',
        salary: query.get('salary') || '',
      });
    }
  }, []);

  // Handle checkbox change, ensure exclusivity, and update URL
  const handleCheckboxChange = (group, value) => {
    // Toggle the checkbox: select if unchecked, deselect if checked
    const newValue = filters[group] === value ? '' : value;

    // Update state
    setFilters((prev) => ({
      ...prev,
      [group]: newValue,
    }));

    // Update URL query parameters
    const query = new URLSearchParams(window.location.search);
    if (newValue) {
      query.set(group, newValue); // Add or update query param
    } else {
      query.delete(group); // Remove query param
    }

    // Push new URL without reloading the page
    router.push(
      {
        pathname: router.pathname,
        search: query.toString(),
      },
      undefined,
      { shallow: true }
    );
  };

  // Render checkbox group
  const renderCheckboxGroup = (group, options) => (
    <>
      {options.map(({ id, value, label }) => (
        <div className="form-check" key={id}>
          <input
            className="form-check-input"
            type="checkbox"
            name={group}
            id={id}
            value={value}
            checked={filters[group] === value}
            onChange={() => handleCheckboxChange(group, value)}
          />
          <label className="form-check-label" htmlFor={id}>
            {label}
          </label>
        </div>
      ))}
    </>
  );

  return (
    <div className="sidebar mt-5">
      <h3>Filters</h3>

      <hr />
      <h5 className="filter-heading mb-3">Job Type</h5>
      {renderCheckboxGroup('jobType', [
        { id: 'check1', value: 'Permanent', label: 'Permanent' },
        { id: 'check2', value: 'Temporary', label: 'Temporary' },
        { id: 'check3', value: 'Internship', label: 'Internship' },
      ])}

      <hr />
      <h5 className="mb-3">Education</h5>
      {renderCheckboxGroup('education', [
        { id: 'check4', value: 'Bachelors', label: 'Bachelors' },
        { id: 'check5', value: 'Masters', label: 'Masters' },
        { id: 'check6', value: 'Phd', label: 'Phd' },
      ])}

      <hr />
      <h5 className="mb-3">Experience</h5>
      {renderCheckboxGroup('experience', [
        { id: 'check7', value: 'No Experience', label: 'No Experience' },
        { id: 'check8', value: '1 Years', label: '1 Years' },
        { id: 'check9', value: '2 Years', label: '2 Years' },
        { id: 'check10', value: 'More than 2 years', label: '3 Years+' },
      ])}

      <hr />
      <h5 className="mb-3">Salary Range</h5>
      {renderCheckboxGroup('salary', [
        { id: 'check11', value: '1-50000', label: '$1 - $50,000' },
        { id: 'check12', value: '50000-100000', label: '$50,000 - $100,000' },
        { id: 'check13', value: '100000-200000', label: '$100,000 - $200,000' },
        { id: 'defaultCheck2', value: '300000-500000', label: '$300,000 - $500,000' },
        { id: 'check14', value: '500000-1000000', label: '$500,000 - $1,000,000' },
      ])}

      <hr />
    </div>
  );
};

export default Filter;