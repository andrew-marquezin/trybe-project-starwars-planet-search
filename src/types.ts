export type PlanetDataType = {
  climate: string,
  created: string,
  diameter: string,
  edited: string,
  films: string[]
  gravity: string,
  name: string,
  orbital_period: string,
  population: string,
  rotation_period: string,
  surface_water: string,
  terrain: string,
  url: string,
};

export type PlanetContextType = {
  planetData: PlanetDataType[],
  isLoading: boolean,
  headings: string[],
  isFiltered: {
    value: boolean,
    updateValue: (arg: boolean) => void,
  },
  filterText: {
    value: string,
    updateValue: (arg: string) => void,
  }
  filterParamsArr: {
    value: ParamsType[],
    addValue: (arg: ParamsType) => void,
    deleteValue: (arg: ParamsType[]) => void,
  }
  sorting: {
    value: SortingType,
    changeSorting: (column: string, order: 'ASC' | 'DESC') => void
  }
};

export type ParamsType = {
  columnValue: string,
  comparisonValue: string,
  numberValue: string
};

export type SortingType = {
  column: string,
  sorting: 'ASC' | 'DESC'
};
