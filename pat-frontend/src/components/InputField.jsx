const InputField = ({ type = "text", placeholder, value, onChange, label }) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-2 font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default InputField;