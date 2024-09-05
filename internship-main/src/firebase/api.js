import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';

export const postArticleAPI = (payload) => {
	return async (dispatch) => {
		try {
			let imageURL = '';
			if (payload.image) {
				const imageRef = ref(storage, `images/${payload.image.name}`);
				const snapshot = await uploadBytes(imageRef, payload.image);
				imageURL = await getDownloadURL(snapshot.ref);
			}

			const articleData = {
				user: payload.user,
				video: payload.video,
				description: payload.description,
				image: imageURL,
				timestamp: payload.timestamp,
			};

			await addDoc(collection(db, 'articles'), articleData);
		} catch (error) {
			console.error('Error adding document: ', error);
		}
	};
};
