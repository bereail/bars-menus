// Footer.style.js
import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
`;

export const FooterText = styled.p`
  margin: 0;
  font-size: 14px;
`;

export const FooterLink = styled.a`
  color: #00aaff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
