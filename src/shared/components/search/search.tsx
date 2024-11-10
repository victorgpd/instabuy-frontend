import { Button } from "antd";
import { FlexContainer } from "../flexcontainer/flexcontainer.style";
import Search from "antd/es/input/Search";
import {
  ArrowDownOutlined,
  ClockCircleOutlined,
  HeartOutlined,
  StarOutlined,
} from "@ant-design/icons";

export const SearchBar = () => {
  return (
    <>
      <FlexContainer
        width="100%"
        padding="15px"
        gap="15px"
        directionwrap="column nowrap"
        style={{ borderRadius: "12px" }}
      >
        <Search placeholder="Buscar Produto" size="middle" />
        <FlexContainer
          padding="15px 0 0"
          width="100%"
          gap="15px"
          directionwrap="row wrap"
          justify="center"
          style={{
            borderTop: "2px solid rgb(242, 244, 246)",
          }}
        >
          <Button
            color="primary"
            variant="outlined"
            icon={<ClockCircleOutlined />}
            style={{ flex: "1 1 auto" }}
          >
            Recentes
          </Button>
          <Button
            color="primary"
            variant="outlined"
            icon={<StarOutlined />}
            style={{ flex: "1 1 auto" }}
          >
            Destaques
          </Button>
          <Button
            style={{ flex: "1 1 auto" }}
            color="primary"
            variant="outlined"
            icon={<ArrowDownOutlined />}
          >
            Menor Preço
          </Button>
          <Button
            style={{ flex: "1 1 auto" }}
            color="primary"
            variant="outlined"
            icon={<HeartOutlined />}
          >
            Favoritos
          </Button>
        </FlexContainer>
      </FlexContainer>
    </>
  );
};
