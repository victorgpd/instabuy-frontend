import styled from 'styled-components'

export const NavHeaderContainer = styled.nav`
  background: transparent;

  display: flex;
  flex-flow: row nowrap;
  gap: 5px;
`

export const StyledHeaderLink = styled.a`
  display: inline-block;
  color: #f2f2f2; /* Cor do texto */
  text-decoration: none; /* Remove o sublinhado */
  padding: 6px 12px; /* Reduzido para um botão mais compacto */
  border: 1px solid transparent; /* Borda inicialmente invisível */
  border-radius: 4px; /* Bordas levemente arredondadas */
  background-color: transparent; /* Sem fundo inicialmente */
  transition: all 0.3s ease; /* Transições suaves para fundo, borda e zoom */

  &:hover {
    background-color: rgba(255, 255, 255, 0.1); /* Fundo sutil ao hover */
    border-color: #80d8ff; /* Borda com destaque */
    color: #80d8ff; /* Cor de destaque */
    transform: scale(1.05); /* Leve zoom no hover */
    cursor: pointer; /* Indica que é clicável */
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.2); /* Fundo mais forte ao clicar */
    border-color: #1677ff; /* Borda mais escura ao clicar */
    transform: scale(0.98); /* Efeito de clique */
  }
`
