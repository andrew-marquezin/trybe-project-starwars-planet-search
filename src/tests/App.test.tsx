import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import PlanetProvider from '../context/PlanetProvider';

describe('Testa funcionalidades da aplicação', () => {
  it('Verifica se os elementos sao renderizados', () => {
    render(
      <PlanetProvider>
        <App />
      </PlanetProvider>
    );
    const searchInput = screen.getByRole("textbox");
    const filterBtn = screen.getByRole("button", { name: /filter/i });

    expect(searchInput).toBeInTheDocument();
    expect(filterBtn).toBeInTheDocument();
  });
})
