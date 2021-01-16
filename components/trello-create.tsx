import React, { useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import TextareaAutosize from 'react-textarea-autosize';
import { TrelloButton } from "./trello-button";
import { useSelector, useDispatch } from 'react-redux';
import { fetchAddListAsync } from '../redux/actions/board-action';
import { handleAdd } from '../services/utils';
import firebase from 'firebase';

import { v4 as uuidv4 } from 'uuid';

export const TrelloCreate = ({ idList, addCard }) => {
    const dispatch = useDispatch()

    const [formOpen, setFormOpen] = useState<Boolean>(false);
    const [text, setText] = useState<String>('');

    const data = useSelector<Object>(state => state.boardReducer)

    const colorText: string = idList ? "#000" : "#fff";

    const addList = () => {
        const newID: string = uuidv4();
        if (text.trim().length > 0 && !idList) {
            dispatch(fetchAddListAsync.request({ id: newID, title: text, boardID: data.id }));
        }
        if (text.length > 0 && idList) {
            firebase
                .firestore()
                .collection('list')
                .where('id', '==', idList)
                .limit(1)
                .get()
                .then((query) => {
                    const thing: any = query.docs[0];
                    var currVal: any = thing.data().cards;
                    thing.ref.update({ cards: [...currVal, { id: newID, text: text.trim() }] });
                    return { id: newID, text: text }
                })
                .then((card)=>{
                    addCard(card);
                    setText("");
                    // resolve();
                })
                .catch(err => {
                    console.log(err)
                }  )
        }
    }

    const renderEditForm = () => {
        return (
            <div className="edit-form" >
                <TextareaAutosize
                    placeholder="text"
                    autoFocus
                    minRows={3}
                    onBlur={() => setFormOpen(false)}
                    value={String(text)}
                    onChange={(e) => setText(e.target.value)}
                    style={{
                        resize: "none",
                        width: "calc(100% - 16px)",
                        overflow: "hidden",
                        outline: "none",
                        border: "none",
                        borderRadius: 3,
                        padding: 8
                    }}
                />
                <TrelloButton onClick={() => addList()}>Save</TrelloButton>
            </div>
        );
    };
    return (

        <div className="trello-create">
            {
                formOpen ? renderEditForm() :
                    <div
                        className="trello-create__btn"
                        onDoubleClick={() => setFormOpen(true)}
                        style={{ color: colorText }}>
                        <AddIcon />
                        <span>Add another card</span>
                    </div>
            }
        </div>
    );
};