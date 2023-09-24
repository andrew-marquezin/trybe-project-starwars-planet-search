import { useState } from 'react';

export default function useIsFiltered(init: boolean) {
  const [value, setValue] = useState(init);

  const handleUpdate = (newValue: boolean) => {
    setValue(newValue);
  };
  return {
    value,
    updateValue: handleUpdate,
  };
}
