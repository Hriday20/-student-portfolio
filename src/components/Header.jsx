function Header({ name, color }) {
  return (
    <header
      style={{
        backgroundColor: color,
        color: "white",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1>{name}'s Portfolio</h1>
    </header>
  );
}

export default Header;