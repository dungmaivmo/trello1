import firebase from 'firebase';

export const handleUpdateListID = (boardID: string, id: string) => {
    return new Promise((resolve, reject) => {
        let ref = firebase
            .firestore()
            .collection('board')
            .where('id', '==', boardID)
            .limit(1)
            .get()
            .then((query) => {
                const thing: any = query.docs[0];
                var currVal: any = thing.data().listID;
                thing.ref.update({ listID: [...currVal, id] });
                resolve(null);
            })
            .catch(err => {
                reject(err);
            });
    });
};

export const handleDeleteListID = (boardID: string, id: string) => {
    return new Promise((resolve, reject) => {
        let ref = firebase
            .firestore()
            .collection('board')
            .where('id', '==', boardID)
            .limit(1)
            .get()
            .then((query) => {
                const thing: any = query.docs[0];
                var currVal: any = thing.data().listID;
                var newListID: any = currVal.filter((item: any) => item !== id)
                thing.ref.update({ listID: [...newListID] });
                resolve(null);
            })
            .catch(err => {
                reject(err);
            });
    });
};


export const handleDeleteListIDs = (boardID: string) => {
    return new Promise((resolve, reject) => {
        let ref = firebase
            .firestore()
            .collection('list')
            .where('boardID', '==', boardID)
            .get()
            .then((query) => {
                query.forEach(function (doc) {
                    doc.ref.delete();
                });
                resolve(null);
            })
            .catch(err => {
                reject(err);
            });
    });
};



export const handleSortLists = (boardID: string, listID: string[]) => {
    return new Promise((resolve, reject) => {
        let ref = firebase
            .firestore()
            .collection('board')
            .where('id', '==', boardID)
            .limit(1)
            .get()
            .then((query) => {
                const thing: any = query.docs[0];
                thing.ref.update({ listID: listID });
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

export const handleEditTitleBoard = (id: string, title: string) => {
    return new Promise((resolve, reject) => {
        let ref = firebase
            .firestore()
            .collection('board')
            .where('id', '==', id)
            .limit(1)
            .get()
            .then((query) => {
                const thing: any = query.docs[0];
                thing.ref.update({ title: title });
                resolve(null);
            })
            .catch(err => {
                reject(err);
            });
    });
};


