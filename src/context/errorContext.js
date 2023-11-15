// Controls showing error messages received from children
import React, { createContext, useState } from "react";
import ErrorModal from "../components/error/ErrorModal";

const ErrorContext = createContext(undefined);

const testMessage = "Desculpe, ocorreu um erro durante a sua tentativa de compra. Por favor, tente novamente mais tarde ou entre em contato com o nosso suporte técnico para obter ajuda. Lamentamos qualquer inconveniente."
export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null); // starts null

  const showError = (errorMessage) => {
    setError(errorMessage);
  };

  const hideError = () => {
    setError(null);
  };
  const contextValues = {
    error,
    showError,
    hideError
  };

  return (
    <ErrorContext.Provider value={contextValues}>
      {children}
      {error && <ErrorModal message={error} onClose={hideError} />}
    </ErrorContext.Provider>
  );
};

export const ErrorConsumer = ErrorContext.Consumer;

export const useError = () => {
  return React.useContext(ErrorContext);
};
