import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import TextareaAutosize from 'react-textarea-autosize';
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import { Height } from "@material-ui/icons";
import { TrelloButton } from "./trello-button";
import { handleGetByID } from '../services/utils';
import DeleteIcon from '@material-ui/icons/Delete';
import { Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from 'react-redux';
import { fetchDeleteCard, fetchEditCard } from '../redux/actions/lists-actions';



export const TrelloCard = (props) => {
    const dispatch = useDispatch()
    const dataList = useSelector<any>(state => state.listReducer)

    const card: any = props.card;
    const idList: string = props.idList;
    const [isEditing, setIsEditing] = useState<Boolean>(false);
    const [text, setText] = useState<string>("");

    useEffect(() => {
        setText(card.text);
    }, [dataList]);

    const handleChange = (e: any) => {
        e.preventDefault();
        setText(e.target.value);
    };


    const changeTextAPI = () => {
        if (text.length > 0 && text !== card.text) {
            dispatch(fetchEditCard({ listID: idList, id: card.id, text }))
        }
    };

    const handleFinishEditing = (e: any) => {
        e.preventDefault();
        setIsEditing(false);
    };

    const deleteCard = () => {
        dispatch(fetchDeleteCard({ listID: idList, id: card.id }))
    }


    const renderEditForm = () => {
        return (
            <div className="edit-form" >
                <TextareaAutosize
                    placeholder="text"
                    autoFocus
                    minRows={3}
                    onBlur={handleFinishEditing}
                    value={text}
                    onChange={handleChange}
                    style={{
                        resize: "none",
                        width: "100%",
                        overflow: "hidden",
                        outline: "none",
                        border: "none",
                        padding: 2
                    }}
                />
                <TrelloButton onClick={() => changeTextAPI()}>Save</TrelloButton>
            </div>
        );
    };

    return (
        <Draggable draggableId={String(card.id)} index={props.index}>
            {provided => (
                <div className="trello-card"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {isEditing ? renderEditForm() : <Card className="trello-card__item" >
                        <p onDoubleClick={() => setIsEditing(true)} >{card.text}</p>
                        <div>
                            <DeleteIcon
                                onClick={() => deleteCard()}
                                classes={{
                                    root: "delete-icon"
                                }} />
                        </div>

                    </Card>}
                </div>
            )}

        </Draggable>

    );
};
