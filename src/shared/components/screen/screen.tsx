import { Footer } from "../footer/footer";
import Header from "../header/header";
import { Main } from "../main/main";

interface ScreenProps {
  children: React.ReactNode;
}

export const Screen = (props: ScreenProps) => {
  return (
    <>
      <Header />
      <Main>{props.children}</Main>
      <Footer />
    </>
  );
};

export default Screen;