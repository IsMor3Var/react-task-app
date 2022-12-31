import React from 'react';
import { useAppSelector } from './app/hooks';

function App(): JSX.Element{

  const tasksState = useAppSelector( state => state.tasks )

  return (
    <h1>Hello World</h1>
  );
}

export default App;
