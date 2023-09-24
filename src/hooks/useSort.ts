import { useState } from 'react';

type SortingType = {
  column: string,
  sorting: 'ASC' | 'DESC'
};

export default function useSort(firstColumn: string, sorting: 'ASC' | 'DESC') {
  const [value, setValue] = useState<SortingType>({
    column: firstColumn,
    sorting,
  });

  const handleChange = (column: string, order: 'ASC' | 'DESC') => {
    setValue({
      column,
      sorting: order,
    });
  };

  return {
    value,
    changeSorting: handleChange,
  };
}
