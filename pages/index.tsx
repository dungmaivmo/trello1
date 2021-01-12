import { useState, useEffect } from 'react';
import { Navbar } from "../components/navbar";
import Link from 'next/link';
import initFirebase from '../services/firebase';
import firebase from 'firebase';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAddBoardAsync, fetchGetBoardsAsync } from '../redux/actions/boards-action';
import { v4 as uuidv4 } from 'uuid';



initFirebase()
export default function Home() {
  const router = useRouter();
    // console.log(router.query.id);

  const dispatch = useDispatch()

  const data = useSelector<Object>(state => state.boardsReducer)
  // console.log("data", data)
  const [newBoardTitle, setNewBoardTitle] = useState<String>("");
  const [listBoard, setListBoard] = useState<IProject[] | []>([]);

  useEffect(() => {
    dispatch(fetchGetBoardsAsync?.request());
  }, []);

  useEffect(() => {
    setListBoard(data);
    firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        console.log('User is not logged in');
        await router.push("/login")
      }
    })
    // console.log(router.query.id);

  }, [data]);

  const handleChange: void = (e: any) => {
    setNewBoardTitle(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (listBoard) {
      const newID: string = uuidv4();
      dispatch(fetchAddBoardAsync?.request({ id: newID, title: newBoardTitle }))
      setNewBoardTitle("");
    }

  };
  return (
    <div className="boards">
      <Navbar />
      <div className="boards__container">
        <div className="boards__container-list">
          {listBoard.map(item => <Link href={`/board/${item.id}`} key={item.id}>{item.title}</Link>)}
        </div>
        <form onSubmit={handleSubmit}>
          <p>Create a new Board</p>
          <input
            onChange={handleChange}
            value={newBoardTitle}
            placeholder="Your boards title..."
            type="text"
          />
        </form>
      </div>
    </div>
  )
}
