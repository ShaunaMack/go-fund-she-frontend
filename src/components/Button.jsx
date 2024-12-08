function Button(props) {
  const { color, children, onClick, style, type } = props;

  const buttonStyle = {
    backgroundColor: color || "var(--primaryColor)", // Default color is primary color
    color: "#FFF",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    margin: "5px 0",
    ...style,
  };

  return (
    <button type={type} style={buttonStyle} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

export default Button;
