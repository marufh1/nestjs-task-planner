import { TasksStatus } from "../tasks.model";

export class GetTaskFilterDto {
    status: TasksStatus;
    search: string
}