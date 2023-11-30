import React from 'react';
import { Controller } from 'react-hook-form';

const Dropdown = ({ label, name, control, options, rules, standard }) => {
  return (
    <div className="Dropdown">
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={rules}
        render={({ field, fieldState }) => (
          <select
            {...field}
            className={`select ${field.value ? '' : 'unselected'}`}
            style={{ border: fieldState.invalid ? '2px solid #FF7F51' : '1px solid #ccc' }}
          >
            <option value="" disabled hidden>
              {standard}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      />
    </div>
  );
};

export default Dropdown;
