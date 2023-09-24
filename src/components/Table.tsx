import { useContext, useState } from 'react';
import PlanetContext from '../context/PlanetContext';
import { ParamsType, PlanetDataType, SortingType } from '../types';

const columnOptions = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

type PData = {
  [key:string]: string | string[]
};

export default function Table() {
  const { planetData,
    isLoading,
    headings,
    filterText,
    filterParamsArr,
    isFiltered,
    sorting,
  } = useContext(PlanetContext);
  const [sortedColumn, setSortedColumn] = useState('population');
  const [sortingOrder, setSortingOrder] = useState<'ASC' | 'DESC'>('ASC');

  const filterPlanetsByText = () => {
    if (filterText.value !== '') {
      return (planetData.filter(({ name }) => name.includes(filterText.value)));
    } return (planetData);
  };

  const sortPlanets = (sortingParams: SortingType, planetArray: PlanetDataType[]) => {
    if (sortingParams.column !== '') {
      return planetArray.sort((a: PData, b: PData) => {
        if (a[sortingParams.column] === 'unkwown') return 1;
        if (b[sortingParams.column] === 'unknown') return -1;

        if (sortingParams.sorting === 'ASC') {
          return (
            Number(a[sortingParams.column]) - Number(b[sortingParams.column])
          );
        } return Number(b[sortingParams.column]) - Number(a[sortingParams.column]);
      });
    }
    return planetArray;
  };

  const filterPlanetsByComparison = (
    params: ParamsType[],
    planetArray: PlanetDataType[],
  ) => {
    if (isFiltered.value) {
      let filteredArr = planetArray;
      params.forEach((element) => {
        switch (element.comparisonValue) {
          case 'maior que':
            filteredArr = filteredArr.filter((p) => (
              Number(p[element.columnValue as keyof PlanetDataType])
              > Number(element.numberValue)));
            break;
          case 'menor que':
            filteredArr = filteredArr.filter((p) => (
              Number(p[element.columnValue as keyof PlanetDataType])
              < Number(element.numberValue)));
            break;
          default:
            filteredArr = filteredArr.filter((p) => (
              Number(p[element.columnValue as keyof PlanetDataType])
            === Number(element.numberValue)));
        }
      });
      return filteredArr;
    } return planetArray;
  };

  const ultimateFilter = () => {
    const filteredByText = filterPlanetsByText();
    const sortedPlanets = sortPlanets(sorting.value, filteredByText);
    const filteredByParams = filterPlanetsByComparison(
      filterParamsArr.value,
      sortedPlanets,
    );
    return filteredByParams;
  };

  const handleDeleteFilter = (filter: ParamsType) => {
    const newArr = filterParamsArr.value.filter((e) => (
      e !== filter
    ));
    filterParamsArr.deleteValue(newArr);
  };

  const handleSort = () => {
    sorting.changeSorting(sortedColumn, sortingOrder);
  };

  if (isLoading) {
    return (
      <h1>Loading...</h1>
    );
  }

  return (
    <div>
      <div>
        {filterParamsArr.value.map((e, index: number) => (
          <div key={ index } data-testid="filter">
            <span>{`${e.columnValue} ${e.comparisonValue} ${e.numberValue}`}</span>
            <button
              onClick={ () => handleDeleteFilter(e) }
            >
              X
            </button>
          </div>
        ))}
        <button
          disabled={ filterParamsArr.value.length === 0 }
          data-testid="button-remove-filters"
          onClick={ () => filterParamsArr.deleteValue([]) }
        >
          Remover todas as filtragens
        </button>
      </div>
      <div>
        <select
          name="columnSort"
          data-testid="column-sort"
          value={ sortedColumn }
          onChange={ (e) => setSortedColumn(e.target.value) }
        >
          {columnOptions.map((o) => (
            <option key={ o } value={ o }>{o}</option>
          ))}
        </select>
        <div>
          <input
            type="radio"
            name="sortOrder"
            data-testid="column-sort-input-asc"
            defaultChecked
            id="ASC"
            value="ASC"
            onClick={ () => setSortingOrder('ASC') }
          />
          <label htmlFor="ASC">ASC</label>
          <input
            type="radio"
            name="sortOrder"
            data-testid="column-sort-input-desc"
            id="DESC"
            value="DESC"
            onClick={ () => setSortingOrder('DESC') }
          />
          <label htmlFor="DESC">DESC</label>
        </div>
        <button
          data-testid="column-sort-button"
          onClick={ handleSort }
        >
          Sort
        </button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              {headings.map((h) => (
                <th key={ h }>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ultimateFilter().map((p) => (
              <tr key={ p.name }>
                <td>{p.climate}</td>
                <td>{p.created}</td>
                <td>{p.diameter}</td>
                <td>{p.edited}</td>
                <td>
                  <ul>
                    {p.films.map((f) => (
                      <li key={ f }>
                        <a href={ f }>{f}</a>
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{p.gravity}</td>
                <td data-testid="planet-name">{p.name}</td>
                <td>{p.orbital_period}</td>
                <td>{p.population}</td>
                <td>{p.rotation_period}</td>
                <td>{p.surface_water}</td>
                <td>{p.terrain}</td>
                <td>{p.url}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
