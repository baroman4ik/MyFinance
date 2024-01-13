const CardSelect = ({ label, id, value, onChange, onFocus, onBlur, refProp, options }) => {
  return (
    <div className="card-form__group">
      <label htmlFor={id} className="card-input__label">
        {label}
      </label>
      <select
        className="card-input__input -select"
        id={id}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={refProp}
      >
        <option value="" disabled selected>
          {label}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CardSelect;