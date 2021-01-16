import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import TextareaAutosize from 'react-textarea-autosize';
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import { Height } from "@material-ui/icons";
import { TrelloButton } from "./trello-button";
import { handleGetByID, handleEditTextCard } from '../services/utils';
import DeleteIcon from '@material-ui/icons/Delete';
import { Draggable } from "react-beautiful-dnd";

export const TrelloCard = (props) => {
    const card: any = props.card;
    const idList: string = props.idList;
    const deleteCard: any = props.deleteCard;
    const [isEditing, setIsEditing] = useState<Boolean>(false);
    const [text, setText] = useState<string>("");
    const [textShow, setTextShow] = useState<String>("");

    useEffect(() => {
        setText(card.text);
        setTextShow(card.text)
    }, []);

    const handleChange = (e: any) => {
        e.preventDefault();
        setText(e.target.value);
    };


    const changeTextAPI = () => {
        if (text.length > 0 && text !== textShow) {
            handleEditTextCard(idList, card.id, text)
                .then((response) => { setTextShow(text) })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    const handleFinishEditing = (e: any) => {
        e.preventDefault();
        setIsEditing(false);
    };


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
                        <p onDoubleClick={() => setIsEditing(true)} >{textShow}</p>
                        <div>
                            <DeleteIcon
                                onClick={() => deleteCard(card.id)}
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
