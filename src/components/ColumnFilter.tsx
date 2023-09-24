import { useContext, useState } from 'react';
import PlanetContext from '../context/PlanetContext';

const options = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

export default function ColumnFilter() {
  const { isFiltered, filterParamsArr } = useContext(PlanetContext);
  const [columnValue, setColumnValue] = useState('population');
  const [comparisonValue, setComparisonValue] = useState('maior que');
  const [numberValue, setNumberValue] = useState('0');

  const usedColumns = filterParamsArr.value.map((f) => f.columnValue);
  const availableColumns = options.filter((o) => !usedColumns.includes(o));

  const handleClick = () => {
    isFiltered.updateValue(true);
    filterParamsArr.addValue({
      columnValue,
      comparisonValue,
      numberValue,
    });
    if (availableColumns[0] === columnValue) {
      setColumnValue(availableColumns[1]);
    } else { setColumnValue(availableColumns[0]); }
  };

  return (
    <div>
      <select
        name="columnFilter"
        data-testid="column-filter"
        value={ columnValue }
        onChange={ (e) => setColumnValue(e.target.value) }
      >
        {availableColumns.map((opt) => (
          <option key={ opt } value={ opt }>{opt}</option>
        ))}
      </select>

      <select
        name="comparisonFilter"
        data-testid="comparison-filter"
        value={ comparisonValue }
        onChange={ (e) => setComparisonValue(e.target.value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        type="number"
        name="valueFilter"
        data-testid="value-filter"
        value={ numberValue }
        onChange={ (e) => setNumberValue(e.target.value) }
      />

      <button
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filter
      </button>
    </div>
  );
}
