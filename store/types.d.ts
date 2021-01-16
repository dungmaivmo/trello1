declare module 'MyModels' {
    export type Board = {
        id: string;
        title: string;
        listID: string[];
    };

    export type Boards = {
        id: string;
        title: string;
    };

    export type Card = {
        id: string;
        text: string;
    };
    
    export type List = {
        id: string;
        title: string;
        boardID: string;
        cards: Card[];
    };

    
}
