function Register({ onRegister }) {
  const [formData, setFormData] = useState({ /* your fields */ });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("auth/register/", formData);
      onRegister(response.data); // This calls handleLogin in App.js
      navigate("/"); // Redirect after registration
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="register-container">
      {/* Loading Spinner */}
      {isLoading && (
        <div className="loader-container">
          <div className="loader">
            <div className="face">
              <div className="circle"></div>
            </div>
            <div className="face">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      )}

      {/* Success/Error Modal */}
      {showModal && (
        <div id="modal-container">
          {modalType === "success" ? (
            <div id="success-box">
              <div className="dot"></div>
              <div className="dot two"></div>
              <div className="face">
                <div className="eye"></div>
                <div className="eye right"></div>
                <div className="mouth happy"></div>
              </div>
              <div className="shadow scale"></div>
              <div className="message">
                <h1 className="alert">Success!</h1>
                <p>{modalMessage}</p>
              </div>
              <button className="button-box" onClick={closeModal}>
                <p className="green">continue</p>
              </button>
            </div>
          ) : (
            <div id="error-box">
              <div className="dot"></div>
              <div className="dot two"></div>
              <div className="face2">
                <div className="eye"></div>
                <div className="eye right"></div>
                <div className="mouth sad"></div>
              </div>
              <div className="shadow move"></div>
              <div className="message">
                <h1 className="alert">Error!</h1>
                <p>{modalMessage}</p>
              </div>
              <button className="button-box" onClick={closeModal}>
                <p className="red">try again</p>
              </button>
            </div>
          )}
        </div>
      )}

      <div className="background">
        <div className="shape shape-first"></div>
        <div className="shape shape-last"></div>
      </div>
      <form onSubmit={handleRegister}>
        <h3>Register Here</h3>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          id="email"
          onChange={handleChange}
          required
          disabled={isLoading}
        />

        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          id="username"
          onChange={handleChange}
          required
          disabled={isLoading}
        />
        <small className="note-text">
          <span className="note-warning">Note: </span>Don't use spaces in username
        </small>

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          required
          disabled={isLoading}
        />
        <small className="note-text">
          <span className="note-warning">Note: </span>
          Password must contain '@ 1 A' and it should be strong
        </small>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "REGISTERING..." : "REGISTER"}
        </button>

        <div className="login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
