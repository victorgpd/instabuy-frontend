import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 100%;
  height: 65px;
  padding: 7px 15px;
  z-index: 999;

  background: #2d2d2d;
  border-bottom: 1px solid rgba(222, 224, 224, 0.5);

  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`;

export const LogoHeader = styled.img`
  height: 100%;
  border-radius: 50%;
`;

export const NameLogo = styled.span`
  color: white;
  font-size: 20px;
  font-weight: 500;
`;
