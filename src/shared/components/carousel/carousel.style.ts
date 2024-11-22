import { Carousel } from 'antd'
import styled from 'styled-components'

export const CarouselStyled = styled(Carousel)`
  .ant-carousel {
    width: 100%;
  }
  .slick-arrow {
    color: black;
  }

  .slick-arrow::after {
    color: black;
    padding: 8px;
  }

  .slick-prev {
    margin-left: -35px;
  }

  .slick-next {
    margin-right: -30px;
  }

  .slick-track {
    display: flex;
    flex-flow: row nowrap;
    gap: 5px;

    max-width: 1200px;
    min-width: 300px;
  }

  .slick-dots {
    bottom: -15px;
  }

  .slick-dots button {
    background-color: #1677ff !important;
  }

  .slick-dots button::after {
    color: black;
  }
`
