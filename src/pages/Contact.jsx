import { useState } from "react";

function Contact() {
  const [name, setName] = useState("");

  return (
    <div>
      <h1>Contact Page</h1>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <h2>Hello, {name}</h2>
    </div>
  );
}

export default Contact;