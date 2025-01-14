import React from "react";
import { Link } from "react-router-dom";
import {
  NavbarWrapper,
  NavbarBrand,
  NavbarLinks,
  NavbarLinkItem,
  StyledLogoAilImg,
} from "./navbar.style";
import LogoAilImgSrc from "../../images/LogoAilImg.jpg"; // Import image with a new name

const Navbar = () => {
  return (
    <NavbarWrapper>
      <NavbarBrand>
        <Link to="/">MiApp</Link>
        <StyledLogoAilImg src={LogoAilImgSrc} alt="Ail Logo" />
      </NavbarBrand>
      <NavbarLinks>
        <NavbarLinkItem>
          <Link to="/login">Login</Link>
        </NavbarLinkItem>
      </NavbarLinks>
    </NavbarWrapper>
  );
};

export default Navbar;
