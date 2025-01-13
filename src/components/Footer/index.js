// Footer.jsx
import React from 'react';
import { FooterContainer, FooterText, FooterLink } from './Footer.styles';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>
        © {new Date().getFullYear()} Mi Sitio Web. Todos los derechos reservados.
      </FooterText>
      <FooterText>
        Hecho con ❤️ por{' '}
        <FooterLink href="https://tu-sitio-web.com" target="_blank" rel="noopener noreferrer">
          Tu Nombre
        </FooterLink>
      </FooterText>
    </FooterContainer>
  );
};

export default Footer;
