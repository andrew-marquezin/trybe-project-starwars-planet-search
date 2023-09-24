import { useEffect, useState } from 'react';
import { PlanetDataType } from '../types';
import { getPlanets } from '../services/api';
import PlanetContext from './PlanetContext';
import useFilterText from '../hooks/useFilterText';
import useIsFiltered from '../hooks/useIsFiltered';
import useFilterParams from '../hooks/useFilterParams';
import useSort from '../hooks/useSort';

type PlanetProviderProps = {
  children: React.ReactNode;
};

function PlanetProvider({ children }: PlanetProviderProps) {
  const [planetData, setPlanetData] = useState<PlanetDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [headings, setHeadings] = useState<string[]>([]);

  const filterText = useFilterText('');
  const isFiltered = useIsFiltered(false);
  const filterParamsArr = useFilterParams([]);
  const sorting = useSort('', 'ASC');

  useEffect(() => {
    const getData = async () => {
      const data = await getPlanets();
      const resultsINeed = data.results.map(({ climate,
        created,
        diameter,
        edited,
        films,
        gravity,
        name,
        orbital_period,
        population,
        rotation_period,
        surface_water,
        terrain,
        url }: PlanetDataType) => {
        return {
          climate,
          created,
          diameter,
          edited,
          films,
          gravity,
          name,
          orbital_period,
          population,
          rotation_period,
          surface_water,
          terrain,
          url,
        };
      });
      setPlanetData(resultsINeed);
      setHeadings(Object.keys(resultsINeed[0]));
      setIsLoading(false);
    };
    getData();
  }, []);

  const context = {
    planetData,
    isLoading,
    headings,
    filterText,
    isFiltered,
    filterParamsArr,
    sorting,
  };

  return (
    <PlanetContext.Provider value={ context }>
      {children}
    </PlanetContext.Provider>
  );
}

export default PlanetProvider;
