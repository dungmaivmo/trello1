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
                const thing:any = query.docs[0];
                var currVal:any = thing.data().listID;
                thing.ref.update({listID:[...currVal, id]});
                resolve();
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
                const thing:any = query.docs[0];
                thing.ref.update({title: title});
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
};

