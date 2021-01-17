import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Navbar } from '../../components/navbar';
import { TrelloCreate } from "../../components/trello-create";
import { TrelloList } from "../../components/trello-list";
import { useSelector, useDispatch } from 'react-redux';
import initFirebase from '../../services/firebase';
import firebase from 'firebase';
import DeleteIcon from '@material-ui/icons/Delete';
import {
    fetchGetBoardAsync,
    sortListsAsync,
    fetchEditTitleBoardAsync
} from '../../redux/actions/board-action'
import { fetchDeleteBoardAsync } from '../../redux/actions/boards-action';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import {  
    fetchGetListsAsync , 
    fetchSortSameList,
    sortLists
} from '../../redux/actions/lists-actions'

initFirebase()
const Board = () => {

    const router = useRouter();
    const dispatch = useDispatch()

    const board = useSelector<Object>(state => state.board)
    const dataBoards = useSelector<Object>(state => state.boards)


    const dataList = useSelector<any>(state => state.listReducer)
    const [isEditing, setIsEditing] = useState<Boolean>(false);
    const [listTitle, setListTitle] = useState<String>('');

    useEffect(() => {
        if (router.query.id) {
            dispatch(fetchGetBoardAsync?.request(String(router.query.id)));
            dispatch(fetchGetListsAsync?.request(String(router.query.id)));
        }
    }, [router.query.id]);

    useEffect(() => {
            setListTitle(board?.title);
    }, [board]);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
                console.log('User is not logged in');
                await router.push("/login")
            }
        })
    }, []);


    const handleFinishEditing = (e: any) => {
        e.preventDefault();
        if (listTitle.length > 0 && listTitle !== board.title){
            setListTitle(listTitle);
            dispatch(fetchEditTitleBoardAsync?.request({ id: board.id, title: listTitle }));
        }
        setIsEditing(false);
    };
    const handleFocus = (e: any) => {
        e.target.select();
        if (listTitle.length > 0 && listTitle !== board.title)
            dispatch(fetchEditTitleBoardAsync?.request({ id: board.id, title: listTitle }));

    };
    const handleChange = (e: any) => {
        e.preventDefault();
        setListTitle(e.target.value);
    };

    const deleteBoard = async () => {
        dispatch(fetchDeleteBoardAsync.request(board.id))
        await router.push("/")
    }

    const onDragEnd = result => {
        const { destination, source, draggableId, type } = result;
        if (type === "list" && destination !== null && source.index !== destination.index) {
            console.log("test list",destination, source, draggableId, type )
            dispatch(sortLists({boardID: board.id,destinationIndex :destination.index, sourceIndex: source.index, draggableId }))
            // let newListID = [...data.listID];
            // console.log("fun onD all", destination, source, draggableId, type)
            // newListID[source.index] = data.listID[destination.index];
            // newListID[destination.index] = data.listID[source.index];
            // dispatch(sortListsAsync.request({ boardID: data.id, newListID }));
        }

        if (type === "card" && destination !== null && source.droppableId === destination?.droppableId) {
            console.log("cung list")
            if (source.index !== destination.index)
                dispatch(fetchSortSameList({ id: source.droppableId, sourceIndex: source.index, destinationIndex: destination.index }))
        }
        if (type === "card" && destination !== null && source.droppableId !== destination?.droppableId) {

            console.log("khac list")
        }
        console.log("fun onD", destination, source, draggableId, type)

    };
    const renderEditInput = () => {
        return (
            <form onSubmit={handleFinishEditing}>
                <input
                    className=""
                    type="text"
                    value={String(listTitle)}
                    onChange={handleChange}
                    autoFocus
                    onFocus={handleFocus}
                    onBlur={handleFinishEditing}
                />
            </form>
        );
    };
    return (
        <DragDropContext onDragEnd={onDragEnd} >

            <div className="board-layout">
                <Navbar />
                <div className="board" >
                    <div className="board__header">
                        {isEditing ? renderEditInput() : (
                            <div className="board__header-title" >
                                <p onClick={() => setIsEditing(true)} >{listTitle}</p>
                                <DeleteIcon
                                    onClick={() => deleteBoard()}
                                    classes={{
                                        root: "delete-icon"
                                    }} />
                            </div>
                        )}

                    </div>
                    <div className="board-lists">
                        <Droppable droppableId="all-lists" direction="horizontal" type="list">
                            {provided => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="flex-item"
                                >
                                    {dataList.map((item: string, index: any) => <TrelloList item={item} index={index} key={item.id} />)}
                                    {provided.placeholder}
                                    <TrelloCreate />
                                </div>
                            )}
                        </Droppable>
                    </div>

                </div>


            </div>

        </DragDropContext>
    );
};
export default Board;
