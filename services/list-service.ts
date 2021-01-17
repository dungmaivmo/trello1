import firebase from 'firebase';


export const handleSortSameList = (ob: any) => {
    console.log("ob", ob)
    return new Promise((resolve, reject) => {
        let ref = firebase
            .firestore()
            .collection('list')
            .where('id', '==', ob.id)
            .limit(1)
            .get()
            .then((query) => {
                const thing: any = query.docs[0];
                var currVal: any = thing.data().cards;
                let card: any = currVal[ob.sourceIndex];
                currVal.splice(ob.sourceIndex, 1);
                currVal.splice(ob.destinationIndex, 0, card);
                thing.ref.update({ cards: currVal });
                resolve(null);
            })
            .catch(err => {
                reject(err);
            });
    });
};

export const handleSortLists = (boardID: string, sourceIndex: number, destinationIndex: number) => {
    return new Promise((resolve, reject) => {
        let ref = firebase
            .firestore()
            .collection('list')
            .where('boardID', '==', boardID)
            .get()
            .then((query) => {
                let lists: any = query.docs;
                lists.sort((a: any, b: any) => a.data().indexList - b.data().indexList);
                let minIndex: number = Math.min(sourceIndex, destinationIndex);
                let maxIndex: number = Math.max(sourceIndex, destinationIndex);
                let listItem: any = lists[sourceIndex];
                lists.splice(sourceIndex, 1);
                lists.splice(destinationIndex, 0, listItem);
                let i: number = minIndex;
                for (i = minIndex; i <= maxIndex; i++) {
                    lists[i].ref.update({ indexList: i })
                }
                resolve(null);
            })
            .catch(err => {
                reject(err);
            });
    });
};


export const handleDeleteList = (boardID: string, indexList: number, id: string) => {
    return new Promise((resolve, reject) => {
        let ref = firebase
            .firestore()
            .collection('list')
            .where('boardID', '==', boardID)
            .get()
            .then((query) => {
                query.docs.forEach(doc => {
                    if (doc.data().id === id) {
                        doc.ref.delete();
                    }
                    if (doc.data().indexList >= indexList && doc.data().id !== id) {
                        let ind: number = doc.data().indexList;
                        doc.ref.update({ indexList: ind - 1 });
                    }
                })
                resolve(null);
            })
            .catch(err => {
                reject(err);
            });
    });
};

export const handleAddCard = (listID: string, card: any) => {
    return new Promise((resolve, reject) => {
        let ref = firebase
            .firestore()
            .collection('list')
            .where('id', '==', listID)
            .limit(1)
            .get()
            .then((query) => {
                const thing: any = query.docs[0];
                var currVal: any = thing.data().cards;
                thing.ref.update({ cards: [...currVal, card] });
                resolve(null);
            })
            .catch(err => {
                reject(err);
            });
    });
};

export const handleDeleteCardID = (listID: string, id: string) => {
    return new Promise((resolve, reject) => {
        let ref = firebase
            .firestore()
            .collection('list')
            .where('id', '==', listID)
            .limit(1)
            .get()
            .then((query) => {
                const thing: any = query.docs[0];
                var currVal: any = thing.data().cards;
                var newCards: any = currVal.filter((item: any) => item.id !== id)
                thing.ref.update({ cards: [...newCards] });
                resolve(null);
            })
            .catch(err => {
                reject(err);
            });
    });
};

export const handleEditCard = (idList: string, id: string, newText: string) => {
    return new Promise((resolve, reject) => {
        let ref = firebase
            .firestore()
            .collection('list')
            .where('id', '==', idList)
            .limit(1)
            .get()
            .then((query) => {
                const thing: any = query.docs[0];
                var currVal: any = thing.data().cards;
                currVal = currVal.map(item => {
                    if (item.id === id) {
                        return { ...item, text: newText }
                    }
                    return item
                })
                thing.ref.update({ cards: [...currVal] });
                resolve(null);
            })
            .catch(err => {
                reject(err);
            });
    });
};

