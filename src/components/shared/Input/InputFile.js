import React from "react";

function InputFile({ label = '', name, register, rules, onChange, errors }) {
  const handleChange = (event) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div className="container">
      {label && <label>{label}</label>}
      <div className="Input">
        <input
          type="file"
          id={name}
          name={name}
          {...register(name, rules)}
          onChange={handleChange}
          style={{
            border: errors[name] ? '2px solid #FF7F51' : '1px solid #ccc',
            paddingBottom: '15px',
          }}
        />
      </div>
    </div>
  );
}

export default InputFile;
