interface Props {
  name: string;
  label: string;
  options: Record<string, Record<number, string>>;
  registerRef: any;
}

const FormSelect = ({ name, label, options, registerRef }: Props) => {
  return (
    <div className="form-row">
      <label>{label}</label>
      <select name={name} ref={registerRef}>
        {Object.keys(options).map((groupLabel) => (
          <optgroup label={groupLabel}>
            {Object.entries(options[groupLabel]).map((option) => (
              <option value={option[0]}>{option[1]}</option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
