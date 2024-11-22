import { CarouselStyled } from './carousel.style'

interface CarouselProps {
  children?: React.ReactNode
  width?: string
  height?: string
  maxwidth?: string
  maxheight?: string
  autoplay?: boolean
  slidesToShow?: number
}

const Carousel = (props: CarouselProps) => {
  return (
    <CarouselStyled
      arrows
      slidesToShow={props.slidesToShow}
      autoplay={props.autoplay}
      style={{
        height: props.height,
        maxWidth: props.maxwidth,
        maxHeight: props.maxheight,
      }}
    >
      {props.children}
    </CarouselStyled>
  )
}

export default Carousel
