import { TaskListOutput } from "../services/tasks.interface";
import { parseBody, parseHeader } from "./TableTask";

test("Should parse header", () => {
  const startDate = new Date(2022, 0, 1).toISOString();
  const endDate = new Date(2022, 2, 1).toISOString();
  const input: TaskListOutput = {
    tasks: [{ name: "test", startDate, endDate, totalCost: 150 }],
    wishlist: [],
  };

  const output = parseHeader(input);

  expect(output).toMatchObject([
    "Tarefas",
    "01/2022",
    "02/2022",
    "03/2022",
    "Total",
  ]);
});

test("Should parse body", () => {
  const startDate = new Date(2022, 0, 1).toISOString();
  const endDate = new Date(2022, 2, 1).toISOString();
  const input: TaskListOutput = {
    tasks: [{ name: "test", startDate, endDate, totalCost: 150 }],
    wishlist: [],
  };

  const output = parseBody(input);

  expect(output).toMatchObject([["test", 50, 50, 50, 150]]);
});

test.only("Should...", () => {
  const input: TaskListOutput = {
    tasks: [
      {
        name: "test",
        startDate: new Date(2022, 1, 1).toISOString(),
        endDate: new Date(2022, 2, 1).toISOString(),
        totalCost: 150,
      },
      {
        name: "test 2",
        startDate: new Date(2022, 0, 1).toISOString(),
        endDate: new Date(2022, 2, 1).toISOString(),
        totalCost: 150,
      },
    ],
    wishlist: [],
  };

  const output = parseBody(input);

  expect(output).toMatchObject([
    ["test", null, 75, 75, 150],
    ["test 2", 50, 50, 50, 150],
  ]);
});
