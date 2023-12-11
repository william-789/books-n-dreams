import React from "react";

function RadioInput({ name, value, register, rules }) {

  return (
    <div className="container">
      <div className="Input">
        <input
          type="radio"
          id={value}
          name={name}
          value={value}
          {...register(name, rules)}
          className={"radio-box"}
        />
      </div>
    </div>
  );
}

export default RadioInput;
