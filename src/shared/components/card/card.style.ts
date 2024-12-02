import styled from 'styled-components'

export const ContainerCard = styled.div`
  height: 362px;
  border-radius: 9px;
  overflow: hidden;

  background-color: white;
  border: 1px solid rgba(222, 224, 224, 0.5);

  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  flex: 1 1 225px;
`

export const ImageProduct = styled.img`
  width: 162px;
  min-height: 148px;
  max-height: 148px;
  object-fit: contain;
`

export const TitleProduct = styled.a`
  text-decoration: none;
  width: 100%;
  overflow: hidden;
  cursor: pointer;
  text-overflow: ellipsis;
  text-align: left;
  font-weight: 600;
  color: rgb(53, 58, 61);
  line-height: 17px;
  height: max-content;
  font-size: 15px;
  overflow-wrap: break-word;
  line-break: strict;
  white-space: normal;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  transition: 0.5s;
`

export const ContainerCupom = styled.div`
  height: 30px;
  padding: 3px 5px;
  background: rgb(243, 244, 246);

  gap: 10px;
  display: flex;
  align-items: center;
`

export const CupomProduct = styled.span`
  font-size: 11px;
  font-weight: bold;

  color: rgb(154, 161, 166);
`

export const CoinText = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #e0a800;
`

export const ValueText = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: #e0a800;
`

export const PriceOld = styled.span`
  font-size: 12px;
  text-decoration: line-through;
  color: rgb(130, 136, 140);
`

export const StoreText = styled.span`
  font-size: 13px;
  font-weight: 700;
`

export const StoreImage = styled.img`
  width: 20px;
  height: 20px;
`
