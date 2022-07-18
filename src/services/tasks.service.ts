import { Observable, of } from "rxjs";
import mock from "./mock.json";
import { TaskListOutput } from "./tasks.interface";

export const taskService = {
  list(): Observable<TaskListOutput> {
    return of(mock);
  },
};
