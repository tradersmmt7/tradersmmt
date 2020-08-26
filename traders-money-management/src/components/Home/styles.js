import styled from "styled-components";

export const HeaderWrapper = styled.div`
  padding: 20px 0px;
  display: flex;
  justify-content: space-between;
`;

export const BrandWrapper = styled.div`
  flex: 1;
`;
export const LinkWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;



export const BannerInfo = styled.div`
  background-color: ${(props) => props.theme.colors.darkBlue};
`;



export const BannerTextSmall = styled.div`
  font-wight: bold;
  color: ${(props) => props.theme.colors.white};
  padding: 10px 0;
`;
