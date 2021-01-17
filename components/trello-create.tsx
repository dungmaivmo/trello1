import React, { useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import TextareaAutosize from 'react-textarea-autosize';
import { TrelloButton } from "./trello-button";
import { useSelector, useDispatch } from 'react-redux';
import { fetchAddListAsync, fetchAddCardAsync } from '../redux/actions/lists-actions';
import { handleAdd } from '../services/utils';
import firebase from 'firebase';
import { useRouter } from 'next/router';

import { v4 as uuidv4 } from 'uuid';

export const TrelloCreate = ({ idList }) => {
    const dispatch = useDispatch()
    const router = useRouter();


    const [formOpen, setFormOpen] = useState<Boolean>(false);
    const [text, setText] = useState<String>('');

    const data = useSelector<Object>(state => state.boardReducer)
    const listReducer = useSelector<any>(state => state.listReducer)


    const colorText: string = idList ? "#000" : "#fff";

    const addList = () => {
        const newID: string = uuidv4();
        if (text.trim().length > 0 && !idList) {
            console.log("add list")

            dispatch(fetchAddListAsync.request({ id: newID, title: text, boardID: router.query.id, indexList: listReducer.length }));
        }
        if (text.length > 0 && idList) {
            dispatch(fetchAddCardAsync.request({ listID: idList, card:  { id: newID, text: text.trim()} }));

            setText("");
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