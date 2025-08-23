import { createContext, useState, useEffect } from "react";

/**
 * Contexto de autenticación para compartir el token y funciones de login/logout
 * entre componentes de React.
 */
export const AuthContext = createContext();

/**
 * Componente proveedor de autenticación.
 * @param {Object} props - Props del componente.
 * @param {React.ReactNode} props.children - Componentes hijos que usarán el contexto.
 */
export function AuthProvider({ children }) {
  // Estado para almacenar el token de autenticación
  const [token, setToken] = useState(null);

  /**
   * Recupera el token almacenado en localStorage al montar el componente.
   */
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  /**
   * Función para iniciar sesión.
   * @param {string} newToken - Token recibido al autenticar al usuario.
   */
  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  /**
   * Función para cerrar sesión, eliminando el token.
   */
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
