import { useEffect, useState } from "react";
import { Card } from "../../../shared/components/card/card";
import { Filter } from "../../../shared/components/filter/filter";
import { FlexContainer } from "../../../shared/components/flexcontainer/flexcontainer.style";
import Screen from "../../../shared/components/screen/screen";
import { SearchBar } from "../../../shared/components/search/search";
import { Spin } from "antd";
import { fetchProducts } from "../../../shared/functions/connectionAPI";
import { convertNumberToMoney } from "../../../shared/functions/money";
import { useProductReducer } from "../../../store/reducers/productReducer/useProductReducer";

export const SearchPage = () => {
  const { products, setProducts } = useProductReducer();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [buscar, setBuscar] = useState(true);

  const loadProducts = async (page: number) => {
    if (buscar) {
      setLoading(true);
      const fetchedProducts = await fetchProducts(page);

      const allItemsPresent = fetchedProducts.filter(
        (productor) => !products.some((product) => product.id === productor.id)
      );

      if (allItemsPresent.length > 0) {
        setProducts((prevProducts) => [...prevProducts, ...allItemsPresent]);
      } else {
        setBuscar(false);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts(page);
  }, [page]);

  useEffect(() => {
    const item = document.querySelector("#sentinela");
    if (item) {
      const intersectionObserver = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setPage((prevPage) => prevPage + 1);
        } else {
          setLoading(false);
        }
      });

      intersectionObserver.observe(item);

      return () => intersectionObserver.disconnect();
    }
  }, []);

  return (
    <Screen>
      <FlexContainer
        padding="15px 0px"
        gap="36px"
        background="#"
        style={{ maxWidth: "1216px" }}
      >
        <Filter />
        <FlexContainer
          background="#"
          width="100%"
          gap="15px 0"
          justify="center"
          directionwrap="row wrap"
          style={{ maxWidth: "930px", minWidth: "280px" }}
        >
          <SearchBar />
          <FlexContainer
            background="#"
            width="100%"
            gap="15px 10px"
            directionwrap="row wrap"
          >
            {products.map((item) => (
              <Card
                key={item.id}
                title={item.title}
                image={item.image}
                store={item.store}
                link={item.link}
                price={convertNumberToMoney(item.price)}
                priceOld="99,99"
                cupom="ESPECIAL40"
                storeImage="src/images/mercadolivre.png"
              />
            ))}
            <FlexContainer
              id="sentinela"
              width="100%"
              background="#"
            ></FlexContainer>
          </FlexContainer>
          {loading && <Spin size="large" />}
        </FlexContainer>
      </FlexContainer>
    </Screen>
  );
};

export default SearchPage;
