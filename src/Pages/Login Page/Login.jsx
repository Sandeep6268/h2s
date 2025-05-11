function Login({ onLogin }) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("auth/login/", credentials);
      onLogin(response.data); // This calls handleLogin in App.js
      navigate("/"); // Redirect after login
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <section className="container pt-5">
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

      <div className="login-container mx-auto">
        <div className="circle circle-one"></div>
        <div className="form-container">
          <img
            src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png"
            alt="illustration"
            className="illustration"
          />
          <h1 className="opacity">LOGIN</h1>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="EMAIL"
              onChange={handleChange}
              value={data.email}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="PASSWORD"
              onChange={handleChange}
              value={data.password}
              required
            />
            <button type="submit" className="opacity" disabled={isLoading}>
              {isLoading ? "PROCESSING..." : "SUBMIT"}
            </button>
          </form>
          <div className="register-forget opacity">
            <Link to="/register" className="text-decoration-none text-danger">
              Don't have an account?
            </Link>
          </div>
        </div>
        <div className="circle circle-two"></div>
      </div>
    </section>
  );
}

export default Login;
