import { useState } from 'react';
import { ParamsType } from '../types';

export default function useFilterParams(init: []) {
  const [value, setValue] = useState<ParamsType[]>(init);

  const handleAdd = (newValue: ParamsType) => {
    setValue([...value, newValue]);
  };

  const handleDelete = (updatedArr: ParamsType[]) => {
    setValue(updatedArr);
  };

  return {
    value,
    addValue: handleAdd,
    deleteValue: handleDelete,
  };
}
