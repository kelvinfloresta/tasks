export interface Task {
  readonly name: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly totalCost: number;
}

export interface Wishlist {
  readonly name: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly totalCost: number;
}

export interface TaskListOutput {
  readonly tasks: readonly Task[];
  readonly wishlist: readonly Wishlist[];
}
