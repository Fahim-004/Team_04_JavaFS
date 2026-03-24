const Button = ({ text, onClick, type = "button", disabled = false, variant = "primary" }) => {

  const base = "px-6 py-2 rounded font-medium transition disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant] || variants.primary}`}
    >
      {text}
    </button>
  );
};

export default Button;