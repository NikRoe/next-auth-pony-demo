import styled from "styled-components";
import Footer from "./Footer";
import LoginButton from "./LoginButton";

export default function Layout({ children }) {
  return (
    <>
      <LoginButton />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}

const Main = styled.main`
  margin-bottom: 5rem;
`;
