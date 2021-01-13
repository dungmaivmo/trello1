import { useState, useEffect } from 'react';
import { TrelloCard } from "./trello-card";
import { TrelloCreate } from "./trello-create";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useSelector, useDispatch } from 'react-redux';
import { handleGetByID, handleEditTitle } from '../services/utils';
import firebase from 'firebase';
// import { POINT_CONVERSION_COMPRESSED } from 'constants';


export const TrelloList = props => {
    // const { itemID:string} = props
    const [isEditing, setIsEditing] = useState<Boolean>(false);
    const [listTitle, setListTitle] = useState<String>("");
    const [listTitleShow, setListTitleShow] = useState<String>("");


    const [data, setData] = useState<Object>({});

    useEffect(() => {
        handleGetByID('list', props.itemID)
         .then((response)=>{setData(response[0])})
         .catch(err => {
            console.log(err);
        });

    }, []);

    useEffect(() => {
        setListTitle(data.title);
        setListTitleShow(data.title)
    }, [data]);

    const changeTitleListAPI = ()=>{
        handleGetByID('list', data.id,listTitle )
         .then((response)=>{resolve()})
         .catch(err => {
            console.log(err);
        });
    }

    const handleFocus =  (e: any) => {
        e.target.select();
        if(listTitle.length > 0 && listTitle !== listTitleShow){
            handleEditTitle('list', data.id,listTitle )
            .then((response)=>{setListTitleShow(listTitle)})
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
        if(listTitle.length > 0 && listTitle !== listTitleShow){
            handleEditTitle('list', data.id,listTitle )
            .then((response)=>{setListTitleShow(listTitle)})
            .catch(err => {
               console.log(err);
           })
        }

        setIsEditing(false);
        // dispatch(editTitle(listID, listTitle));
    };
    const addCard = ( card : Object) => {
        console.log("ok2")
        setData({...data, cards: [...data.cards, card]})
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

    return (
        <div className="trello-list">
            <div className="trello-list__header">
                {isEditing ? renderEditInput() : (
                    <div className="trello-list__titles">
                        <div className="trello-list__title" onClick={() => setIsEditing(true)}>{listTitleShow}</div>
                        <MoreHorizIcon className="trello-list__icon-edit" />
                    </div>
                )}
            </div>
            <div>
                {data?.cards?.map(card =><TrelloCard key = {card.id} card={card} idList={data.id}/>)}
            </div>
            <TrelloCreate idList={data?.id} addCard={addCard}/>
        </div>
    );
};
