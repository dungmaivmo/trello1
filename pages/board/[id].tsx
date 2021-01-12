import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Navbar } from '../../components/navbar';
import { TrelloCreate } from "../../components/trello-create";
import { TrelloList } from "../../components/trello-list";
import { useSelector, useDispatch } from 'react-redux';
import initFirebase from '../../services/firebase';
import firebase from 'firebase';
import { fetchGetBoardAsync } from '../../redux/actions/board-action'

initFirebase()
const Board = () => {

    const router = useRouter();
    const dispatch = useDispatch()
    const data = useSelector<Object>(state => state.boardReducer)
    const [isEditing, setIsEditing] = useState<Boolean>(false);
    const [listTitle, setListTitle] = useState<String>('');


    useEffect(() => {
        if (router.query.id){
            dispatch(fetchGetBoardAsync?.request(router.query.id));
        }
    }, [router.query.id]);

    useEffect(() => {
            setListTitle(data.title)
    }, [data]);

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
        console.log(listTitle)

        setIsEditing(false);
        // dispatch(editTitle(listID, listTitle));
    };
    const handleFocus = (e: any) => {
        e.target.select();
        console.log(listTitle)
        // handleFinishEditing()
    };
    const handleChange = (e: any) => {
        e.preventDefault();
        setListTitle(e.target.value);
        // console.log(e.target.value)
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
        <div className="board">
            <Navbar />
            <div className="board__header">
                {isEditing ? renderEditInput() : (
                    <div  onClick={() => setIsEditing(true)}> {data.title}</div>
                )}
            </div>
            <div className="board-lists">
                {/* <div className="board__list"> */}
                {data?.listID?.map((item: string) => <TrelloList id={item} key={item} />)}

                {/* </div> */}
                <TrelloCreate />
            </div>


        </div>
    );
};
export default Board;
