import React from 'react'
import { Empty } from 'antd'
import styled from 'styled-components'

const StyledEmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`

const EmptyMessage = styled.h3`
  margin-top: 16px;
  color: #555;
  font-size: 18px;
`

const TryAgainButton = styled.button`
  margin-top: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #1677ff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #125ab8;
  }

  &:active {
    transform: scale(0.98);
  }
`

const NoResults: React.FC<{ onRetry?: () => void }> = ({ onRetry }) => {
  return (
    <StyledEmptyContainer>
      <Empty
        description="Nenhum produto encontrado"
        imageStyle={{ height: 80 }}
      />
      <EmptyMessage>
        Não encontramos nenhum produto que corresponda à sua busca.
      </EmptyMessage>
      {onRetry && (
        <TryAgainButton onClick={onRetry}>Tente novamente</TryAgainButton>
      )}
    </StyledEmptyContainer>
  )
}

export default NoResults
