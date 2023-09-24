import { useContext, useState } from 'react';
import PlanetContext from '../context/PlanetContext';

export default function FilterInput() {
  const [filterValue, setFilterValue] = useState('');
  const { filterText } = useContext(PlanetContext);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
    filterText.updateValue(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        value={ filterValue }
        onChange={ handleFilterChange }
      />
    </div>
  );
}
