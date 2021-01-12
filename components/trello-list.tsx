import { useState, useEffect } from 'react';
import { TrelloCard } from "./trello-card";
import {TrelloCreate} from "./trello-create";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useSelector, useDispatch } from 'react-redux';


export const TrelloList = ({id: string}) => {
    const [isEditing, setIsEditing] = useState<Boolean>(false);
    const [listTitle, setListTitle] = useState<String>("");

    useEffect(() => {

        // dispatch(fetchGetBoardAsync?.request(router.query.id));
    }, []);

    const handleFocus = (e: any) => {
        e.target.select();
    };

    const handleChange = (e: any) => {
        e.preventDefault();
        setListTitle(e.target.value);
        // console.log(e.target.value)
    };

    const handleFinishEditing = (e: any) => {
        e.preventDefault();
        // console.log(listTitle)

        setIsEditing(false);
        // dispatch(editTitle(listID, listTitle));
    };

    const renderEditInput = () => {
        return (
            <form onSubmit={handleFinishEditing}>
                <input
                    className=""
                    type="text"
                    value={listTitle}
                    onChange={handleChange}
                    autoFocus
                    onFocus={handleFocus}
                    onBlur={handleFinishEditing}
                />
            </form>
        );
    };

    return (
        <div className="trello-list">
            <div className="trello-list__header">
                {isEditing ? renderEditInput() : (
                    <div className="trello-list__titles">
                        <div className="trello-list__title" onClick={() => setIsEditing(true)}>tesss</div>
                        <MoreHorizIcon className="trello-list__icon-edit" />
                    </div>
                )}
            </div>
            <div>
                <TrelloCard />
                <TrelloCard />
                <TrelloCard />
            </div>
            <TrelloCreate list />
        </div>
    );
};
