import React from 'react';
import './App.css';
import Table from './components/Table';
import FilterInput from './components/FilterInput';
import ColumnFilter from './components/ColumnFilter';

function App() {
  return (
    <>
      <ColumnFilter />
      <FilterInput />
      <Table />
    </>
  );
}

export default App;
