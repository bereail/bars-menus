import styled from "styled-components";

export const NavbarWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #2c3e50;
  padding: 10px 20px;
  color: #ecf0f1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  box-sizing: border-box;
  margin-bottom: 10px;
`;

export const NavbarBrand = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  margin: 0;

  a {
    text-decoration: none;
    color: #ecf0f1;
    margin-right: 10px; /* Espacio entre el texto y el logo */
  }
`;

export const NavbarLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
`;

export const NavbarLinkItem = styled.li`
  a {
    text-decoration: none;
    color: #ecf0f1;
    font-size: 1.2rem;
    transition: color 0.3s ease;

    &:hover {
      color: #3498db;
    }
  }
`;

export const LogoutButton = styled.button`
  background: none;
  border: 2px solid #e74c3c;
  color: #e74c3c;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e74c3c;
    color: #fff;
  }
`;

export const StyledLogoAilImg = styled.img`
  width: 50px; /* Ajusta el tamaño según sea necesario */
  height: auto;
`;
