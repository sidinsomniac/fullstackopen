import React from 'react';

const LoginForm = ({ username, password, handleLogin, setUsername, setPassword }) => (
  <form onSubmit={handleLogin}>
    <div>
      <label>
        Username
          <input type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </label>
    </div>
    <div>
      <label>
        Password
          <input type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
    </div>
    <button type="submit">Login</button>
  </form>
);

export default LoginForm;