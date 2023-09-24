import { useState } from 'react';

export default function useFilterText(init: string) {
  const [value, setValue] = useState(init);

  const handleUpdate = (newValue: string) => {
    setValue(newValue);
  };
  return {
    value,
    updateValue: handleUpdate,
  };
}
