
import { createAsyncAction, createReducer } from 'typesafe-actions';
import {
    fetchSortSameList,
    fetchGetListsAsync,
    fetchAddListAsync,
    fetchDeleteListAsync,
    fetchEditTitleListAsync,
    fetchAddCardAsync,
    fetchDeleteCard,
    fetchEditCard,
    sortLists
} from '../actions/lists-actions';
import { v4 as uuidv4 } from 'uuid';
import { List, Card } from 'MyModels';

export const listReducer = createReducer([])
    // .handleAction(fetchSortSameListAsync.success, (state, action) => {
    //     return action.payload ;
    // })
    .handleAction(fetchGetListsAsync.success, (state, action) => {
        let newData: any = [...action.payload];
        newData.sort((a, b) => a.indexList - b.indexList);
        return [...newData];
    })
    .handleAction(fetchAddListAsync.request, (state, action) => {
        return [...state, action.payload];
    })
    .handleAction(fetchAddCardAsync.request, (state, action) => {
        let newData: any = state.map((item: List) =>{
            if(item.id===action.payload.listID){
                return {...item, cards: [...item.cards, action.payload.card]};
            }
            return item;
        })
        return [...newData];
    })
    .handleAction(fetchDeleteListAsync.request, (state, action) => {
        let newData: any = state.filter((item: any) => item.id !== action.payload.id);
        newData = newData.map((item: any) => {
            let listIndex: number = item.indexList;
            if (item.indexList >= action.payload.indexList) return { ...item, listIndex: listIndex - 1 }
            return item
        })
        return [...newData];
    })
    .handleAction(fetchEditTitleListAsync.request, (state, action) => {
        let newData: any = state.map((item: any) =>{
            if(item.id===action.payload.id){
                return {...item, title: action.payload.title}
            }
            return item
        });
        return [...newData];
    })
    .handleAction(fetchDeleteCard, (state, action) => {
        let newData: any = state.map((item: any) =>{
            if(item.id===action.payload.listID){
                let newCards: any= item.cards.filter((card: Card)=>card.id !== action.payload.id)
                return {...item, cards: [...newCards]}
            }
            return item
        });
        return [...newData];
    })
    .handleAction(fetchEditCard, (state, action) => {
        let newData: any = state.map((item: any) =>{
            if(item.id===action.payload.listID){
                let newCards: any= item.cards.map((card: Card)=>{
                    if(card.id === action.payload.id){
                        return {...card, text: action.payload.text }
                    }
                    return card;
                })
                return {...item, cards: [...newCards]}
            }
            return item
        });
        return [...newData];
    })
    .handleAction(fetchSortSameList, (state, action) => {
        let newData: any = state.map((item: any) =>{
            if(item.id===action.payload.id){
                let newCards: any = [...item.cards];
                let card: Card = newCards[action.payload.sourceIndex];
                newCards.splice(action.payload.sourceIndex, 1);
                newCards.splice(action.payload.destinationIndex, 0, card);
                return {...item, cards: [...newCards]}
            }
            return item
        });
        return [...newData];
    })
    .handleAction(sortLists, (state, action) => {
        let minIndex: number= Math.min(action.payload.sourceIndex, action.payload.destinationIndex);
        let maxIndex: number= Math.max(action.payload.sourceIndex, action.payload.destinationIndex);
        let listItem: List = state[action.payload.sourceIndex];
        state.splice(action.payload.sourceIndex, 1);
        state.splice(action.payload.destinationIndex, 0, listItem);
        let newData = state.map((item: List, index: number) => {
            if(index>= minIndex && index <= maxIndex){
                return {...item, indexList: index};
            }
            return item
        })
        return [...newData];
    })
    

    // .handleAction(fetchSortSameListAsync.success, (state, action) => {
    //     // console.log("state", action.payload);
    //     return ([...state.action.payload] )
    // })
    // .handleAction(fetchAddListAsync.success, (state, action) =>{
    //     console.log("reducer new list", action.payload)
    //     return  ({...action.payload})
    // });