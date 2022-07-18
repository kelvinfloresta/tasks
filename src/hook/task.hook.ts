import { useState } from "react";
import { tap, throwError, catchError } from "rxjs";
import { TaskListOutput } from "../services/tasks.interface";
import { taskService } from "../services/tasks.service";

const EMPTY = { tasks: [], wishlist: [] };

export function useListTasks() {
  const [tasks, setTasks] = useState<TaskListOutput>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  function onSuccess(tasks: TaskListOutput) {
    setTasks(tasks);
    setLoading(false);
  }

  function onError(error: any) {
    setLoading(false);
    setError(error);
    return throwError(error);
  }

  function list() {
    setLoading(true);
    setError(null);

    return taskService.list().pipe(tap(onSuccess)).pipe(catchError(onError));
  }

  return {
    tasks,
    list,
    loading,
    error,
  };
}
