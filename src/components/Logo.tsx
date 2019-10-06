import React from "react";
import logo from "../assets/img/pokeLogo.png";
import styled from "styled-components";

const StyledLogoWrapper = styled.img`
	position: relative;
	max-height: 250px;
	left: 50%;
	transform: translateX(-50%);
	margin-bottom: 40px;
`;

const Logo = () => {
	return <StyledLogoWrapper src={logo} alt="Logo" />;
};

export default Logo;
