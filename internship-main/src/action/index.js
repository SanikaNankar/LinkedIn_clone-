import { auth, provider, db, storage } from "../firebase/config";
import { SET_LOADING_STATUS, SET_USER, GET_ARTICLES } from "./actionType";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc, query, orderBy, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export function setUser(payload) {
	return {
		type: SET_USER,
		user: payload,
	};
}

export function setLoading(status) {
	return {
		type: SET_LOADING_STATUS,
		status: status,
	};
}

export function getArticles(payload, id) {
	return {
		type: GET_ARTICLES,
		payload: payload,
		id: id,
	};
}

export function getUserAuth() {
	return (dispatch) => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				dispatch(setUser(user));
			}
		});
	};
}

export function signInAPI() {
	return (dispatch) => {
		signInWithPopup(auth, provider)
			.then((result) => {
				dispatch(setUser(result.user));
			})
			.catch((error) => alert(error.message));
	};
}

export function signOutAPI() {
	return (dispatch) => {
		signOut(auth)
			.then(() => dispatch(setUser(null)))
			.catch((error) => alert(error.message));
	};
}

export function postArticleAPI(payload) {
	return (dispatch) => {
		dispatch(setLoading(true));
		if (payload.image) {
			const storageRef = ref(storage, `images/${payload.image.name}`);
			const uploadTask = uploadBytesResumable(storageRef, payload.image);
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log(`Upload is ${progress}% done`);
				},
				(error) => {
					console.error("Upload failed:", error);
					alert(error.message);
					dispatch(setLoading(false));
				},
				async () => {
					const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
					await addDoc(collection(db, "articles"), {
						actor: {
							description: payload.user.email,
							title: payload.user.displayName,
							date: payload.timestamp,
							image: payload.user.photoURL,
						},
						video: payload.video,
						sharedImg: downloadURL,
						likes: {
							count: 0,
							whoLiked: [],
						},
						comments: 0,
						description: payload.description,
					});
					dispatch(setLoading(false));
				}
			);
		} else {
			const articleData = {
				actor: {
					description: payload.user.email,
					title: payload.user.displayName,
					date: payload.timestamp,
					image: payload.user.photoURL,
				},
				video: payload.video || "",
				sharedImg: "",
				likes: {
					count: 0,
					whoLiked: [],
				},
				comments: 0,
				description: payload.description,
			};
			addDoc(collection(db, "articles"), articleData)
				.then(() => {
					dispatch(setLoading(false));
				})
				.catch((error) => {
					alert(error.message);
					dispatch(setLoading(false));
				});
		}
	};
}

export function getArticlesAPI() {
	return (dispatch) => {
		dispatch(setLoading(true));
		const q = query(collection(db, "articles"), orderBy("actor.date", "desc"));
		onSnapshot(q, (snapshot) => {
			const payload = snapshot.docs.map((doc) => doc.data());
			const ids = snapshot.docs.map((doc) => doc.id);
			dispatch(getArticles(payload, ids));
			dispatch(setLoading(false));
		});
	};
}

export function updateArticleAPI(payload) {
	return (dispatch) => {
		const articleRef = doc(db, "articles", payload.id);
		updateDoc(articleRef, payload.update)
			.then(() => {
				// Optionally do something after update
			})
			.catch((error) => {
				alert(error.message);
			});
	};
}

