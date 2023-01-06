export interface ITask {
    id: string;
    title: string;
    description: string;
    start: Date;
    end: Date;
    completed: boolean;
    createAt: Date;
    updateAt: Date;
}