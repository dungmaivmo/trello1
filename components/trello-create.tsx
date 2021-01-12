import React, { useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import TextareaAutosize from 'react-textarea-autosize';
import { TrelloButton } from "./trello-button";
import { useSelector, useDispatch } from 'react-redux';
import {fetchAddListAsync} from '../redux/actions/board-action';
import { v4 as uuidv4 } from 'uuid';

export const TrelloCreate = ({ list}) => {
  const dispatch = useDispatch()

    const [formOpen, setFormOpen] = useState<Boolean>(false);
    const [text, setText] = useState<String>('');

    const data = useSelector<Object>(state => state.boardReducer)

    const colorText: string = list ? "#000" : "#fff";

    const addList = ()=> {
        if(text.length >0 && !list){
            const newID: string = uuidv4();
            dispatch(fetchAddListAsync.request({id:newID, title: text, boardID: data.id}));
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
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    style={{
                        resize: "none",
                        width: "100%",
                        overflow: "hidden",
                        outline: "none",
                        border: "none",
                        padding: 2
                    }}
                />
                <TrelloButton onClick={()=>addList()}>Save</TrelloButton>
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