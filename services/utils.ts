import firebase from 'firebase';


export const handleGetAll = (collec: string) => {
  return new Promise((resolve, reject) => {
    let ref = firebase.firestore().collection(collec);
    ref
      .get()
      .then(snap => {
        const data = [
          ...snap.docs.map(doc => {
            return {
              ...doc.data()
            }
          })
        ];
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};


export const handleAdd = (collec: string, data: any) => {
  return new Promise((resolve, reject) => {
    firebase.firestore()
      .collection(collec)
      .doc()
      .set(data)
      .then(() => {
        resolve(null);
      })
      .catch(err => {
        reject(err);
      })
  });
}


export const handleGetByID = (collec: string, id: string) => {
  return new Promise((resolve, reject) => {
    let ref = firebase.firestore().collection(collec).where('id', '==', id);
    ref
      .get()
      .then(snap => {
        const data = [
          ...snap.docs.map(doc => {
            return {
              ...doc.data()
            }
          })
        ];

        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};


export const handleEditTitle = (collec: string, id: string, title: string) => {
  return new Promise((resolve, reject) => {
    let ref = firebase
      .firestore()
      .collection(collec)
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


export const handleEditTextCard = (idList: string, id: string, newText: string) => {
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


export const handleDelete = (collec: string, id: string) => {
  return new Promise((resolve, reject) => {
    let ref = firebase
      .firestore()
      .collection(collec)
      .where('id', '==', id)
      .limit(1)
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




