export interface ITask {
    id: string;
    title: string;
    description: string;
    start: Date;
    end: Date;
    completed: boolean;
    createAt: Date;
    updateAt: Date;
    skills: {
        id: string;
        name: string;
    }[];
}

export interface IField {
    register: Function;
    remove: Function;
    append: Function;
    fields: {
        id: string;
        name: string
    }[]
}

export interface ITypesGroup {
    [key: number]: any
}
