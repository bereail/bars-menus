import React from "react";
import { StyledButton } from "./Button.styles";

// Componente de botón reutilizable
const Button = ({ onClick, children, disabled, ...props }) => {
    return (
      <StyledButton onClick={onClick} disabled={disabled} {...props}>
        {children}
      </StyledButton>
    );
  };
  
  export default Button;