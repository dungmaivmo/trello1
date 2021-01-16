import { useState, useEffect } from 'react';
import { TrelloCard } from "./trello-card";
import { TrelloCreate } from "./trello-create";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useSelector, useDispatch } from 'react-redux';
import { handleGetByID, handleEditTitle } from '../services/utils';
import firebase from 'firebase';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { fetchDeleteListAsync } from '../redux/actions/board-action';
import { handleDeleteCardID } from '../services/board-service';
import { Droppable, Draggable } from "react-beautiful-dnd";


export const TrelloList = props => {
    // const { itemID:string} = props
    const dispatch = useDispatch()
    const sortCard: string = useSelector<String>(state => state.listReducer)

    const [isEditing, setIsEditing] = useState<Boolean>(false);
    const [listTitle, setListTitle] = useState<string>("");
    const [listTitleShow, setListTitleShow] = useState<string>("");


    const [data, setData] = useState<any>({});

    useEffect(() => {
        handleGetByID('list', props.itemID)
            .then((response) => { setData(response[0]) })
            .catch(err => {
                console.log(err);
            });
    }, [sortCard]);

    useEffect(() => {
        setListTitle(data.title);
        setListTitleShow(data.title)
    }, [data]);

    // const changeTitleListAPI = () => {
    //     handleGetByID('list', data.id)
    //         .then((response) => { 
    //             console.log("chang title ok")
    //             // resolve()
    //          })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // }

    const handleFocus = (e: any) => {
        e.target.select();
        if (listTitle.length > 0 && listTitle !== listTitleShow) {
            handleEditTitle('list', data.id, listTitle)
                .then((response) => { setListTitleShow(listTitle) })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    const handleChange = (e: any) => {
        e.preventDefault();
        setListTitle(e.target.value);
    };

    const handleFinishEditing = (e: any) => {
        e.preventDefault();

        if (listTitle.trim().length > 0 && listTitle !== listTitleShow) {
            handleEditTitle('list', data.id, listTitle)
                .then((response) => { setListTitleShow(listTitle) })
                .catch(err => {
                    console.log(err);
                })
        }

        setIsEditing(false);
    };
    const addCard = (card: Object) => {
        setData({ ...data, cards: [...data.cards, card] })
    }

    // sub menu
    const [anchorEl, setAnchorEl] = useState<any>(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const deleteList = () => {
        setAnchorEl(null);
        dispatch(fetchDeleteListAsync.request({ id: data.id, boardID: data.boardID }))
    }


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

    const deleteCard = (cardID: string) => {
        handleDeleteCardID(data.id, cardID)
            .then((response) => {
                let newCards: any = data.cards.filter((item: any) => item.id !== cardID);
                setData({ ...data, cards: [...newCards] })
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <Draggable draggableId={props.itemID} index={props.index}>
            {provided => (
                <div
                    className="trello-list"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Droppable droppableId={props.itemID} type="card">
                        {provided => (
                            <div>
                                <div className="trello-list__header">
                                    {isEditing ? renderEditInput() : (
                                        <div className="trello-list__titles">
                                            <div className="trello-list__title" onClick={() => setIsEditing(true)}>{listTitleShow}</div>
                                            {/* <div>
                            <MoreHorizIcon className="trello-list__icon-edit" />
                        </div> */}

                                            <div>

                                                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                                    <MoreHorizIcon className="trello-list__icon-edit" /> </Button>
                                                <Menu
                                                    id="simple-menu"
                                                    anchorEl={anchorEl}
                                                    keepMounted
                                                    open={Boolean(anchorEl)}
                                                    onClose={handleClose}
                                                >
                                                    <MenuItem onClick={() => deleteList()}>Delete</MenuItem>
                                                    {/* <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                                                </Menu>
                                            </div>

                                        </div>
                                    )}
                                </div>
                                <div className="trello-list__items" {...provided.droppableProps} ref={provided.innerRef}>
                                    {data?.cards?.map((card, index) => <TrelloCard key={card.id} index={index} card={card} idList={data.id} deleteCard={deleteCard} />)}
                                </div>
                                {provided.placeholder}
                                <TrelloCreate idList={data?.id} addCard={addCard} />

                            </div>
                        )}
                    </Droppable>  </div>
            )}

        </Draggable>

    );
};
