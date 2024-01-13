import React from 'react';

const CardInput = ({ label, id, value, onChange, onFocus, onBlur, refProp, maxLength, autoComplete }) => {
  return (
    <div className="card-input">
      <label htmlFor={id} className="card-input__label">
        {label}
      </label>
      <input
        type="text"
        id={id}
        className="card-input__input"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={refProp}
        autoComplete={autoComplete}
        maxLength={maxLength}
      />
    </div>
  );
};

export default CardInput;