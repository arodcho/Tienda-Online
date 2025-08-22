function Login() {
  const handleGoogleLogin = () => {
    window.open("http://127.0.0.1:8000/auth/google/redirect", "_self");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Login</h1>
      <button onClick={handleGoogleLogin}>
        Iniciar sesión con Google
      </button>
    </div>
  );
}

export default Login;
