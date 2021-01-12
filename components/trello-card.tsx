import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import TextareaAutosize from 'react-textarea-autosize';
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import { Height } from "@material-ui/icons";
import {TrelloButton} from "./trello-button";
export const TrelloCard = () => {
    const [isEditing, setIsEditing] = useState<Boolean>(false);
    const [cardText, setText] = useState<String>("");
    const renderEditForm = () => {
        return (
            <div className="edit-form" >
                <TextareaAutosize
                    placeholder="text"
                    autoFocus
                    minRows={3}
                    onBlur={() => setIsEditing(false)}
                    // value={text}
                    // onChange={(e) => setText(e.target.value)}
                    style={{
                        resize: "none",
                        width: "100%",
                        overflow: "hidden",
                        outline: "none",
                        border: "none",
                        padding: 2
                    }}
                />
                <TrelloButton onClick={()=>console.log("save ok")}>Save</TrelloButton>
            </div>
        );
    };
    return (

        <div className="trello-card">
            {isEditing ? renderEditForm() : <Card onDoubleClick={() => setIsEditing(true)}>
                <p>aaaaaaaaaaaaa</p>
            </Card>}
        </div>
    );
};
