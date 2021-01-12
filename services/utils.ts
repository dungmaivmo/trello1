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
                resolve();
            })
            .catch(err => {
                reject(err);
            })
    });
}


export const handleGetByID = (collec: string,id: string) => {
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
  
          resolve( data );
        })
        .catch(err => {
          reject(err);
        });
    });
  };
  
