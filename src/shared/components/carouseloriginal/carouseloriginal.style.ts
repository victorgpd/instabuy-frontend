import styled from 'styled-components'

export const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  min-width: 300px;
  min-height: 50px;
  overflow: hidden;
`

export const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  z-index: 1;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }

  &.prev {
    left: 10px;
  }

  &.next {
    right: 10px;
  }
`

export const CarouselTrackContainer = styled.div`
  overflow: hidden;
  width: 100%;
  display: flex;
`

export const CarouselTrack = styled.ul<{ slidestoshow: number }>`
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 100%; /* Garantindo que a largura do track ocupe todo o espaço disponível */
  padding: 0;
  margin: 0;

  > * {
    flex: 0 0 auto; /* Evita que os itens encolham */
    max-width: calc(100% / ${({ slidestoshow }) => slidestoshow}); /* Garantindo que os itens não estiquem */
    box-sizing: border-box;
  }
`

export const CarouselSlide = styled.li`
  list-style: none;
`

export const CarouselIndicators = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`

export const CarouselIndicator = styled.button<{ active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 0 5px;
  border: none;
  background-color: ${({ active }) => (active ? '#000' : '#ccc')};
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`
