import React, { useEffect } from 'react';
import { TableTask } from './components/TableTask';
import { useListTasks } from './hook/task.hook';


function App() {
  const { tasks, list } = useListTasks()


  useEffect(() => {
      const sub = list().subscribe()
      return () => sub.unsubscribe()
  })

  return (
   <TableTask data={tasks} />
    
  );
}

export default App;
