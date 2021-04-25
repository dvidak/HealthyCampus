interface Props {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  registerRef: any;
  errors: any;
}

const FormInput = ({
  label,
  name,
  type,
  placeholder,
  registerRef,
  errors,
}: Props) => {
  return (
    <div className="form-row">
      <label>{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        ref={registerRef}
      />
      <p className="errors">{errors && errors.message}</p>
    </div>
  );
};

export default FormInput;
