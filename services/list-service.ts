import firebase from 'firebase';


export const handleSortSameList = (ob: any) => {
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
                let newCards: Object []= [...currVal];
                newCards[ob.sourceIndex] = currVal[ob.destinationIndex];
                newCards[ob.destinationIndex] = currVal[ob.sourceIndex];
                thing.ref.update({ cards: newCards });
                resolve(null);
            })
            .catch(err => {
                reject(err);
            });
    });
};
