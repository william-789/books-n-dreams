import React from 'react';
import './Input.scss';
import { Controller } from 'react-hook-form';

function Input({ label = '', type, name, big, placeholder = '', control, rules }) {

  return (
    <div className="container">
      {label && <label>{label}</label>}
      <div className="Input">
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field, fieldState }) => (
            <input
              type={type}
              id={name}
              placeholder={placeholder ? placeholder : `Introduz o teu ${label.toLowerCase()}`}
              {...field}
              //onChange={handleChange}
              style={{ border: fieldState.error ? '2px solid #FF7F51' : '1px solid #ccc',
                paddingBottom: big ? '60px' : '15px',}}
            />
          )}
        />
      </div>
    </div>
  );
}
export default Input;
