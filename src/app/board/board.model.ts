import {Column} from "../column/column.model";

export interface Board {
    boardId: string,
    title: string,
    columns: Column[],
}
