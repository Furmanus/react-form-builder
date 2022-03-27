import React, { useCallback, useState } from 'react';
import './App.css';
import { Button } from '@mui/material';
import { AppForm } from './components/form/form';

function App() {
  const [count, setCount] = useState(0);

  const onClick = useCallback(() => {
    setCount(count + 1);
  }, [count, setCount]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>App Form</h1>
      </header>
      <AppForm />
      <p>{count}</p>
      <Button onClick={onClick}>Inc</Button>
    </div>
  );
}

export default App;
