import firebase from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';
import 'firebase/firestore';
import 'firebase/auth';

//Inicializar firebase
firebase.initializeApp(firebaseConfig)

//Connect to firestore //
export const firestore = firebase.firestore();

//modulo de autenticacion 
export const auth = firebase.auth()

// proveedor de autenticacion
export const provider = new firebase.auth.GoogleAuthProvider();

//utilidad para hacer login con el pop-up
export const loginConGoogle = () => auth.signInWithPopup(provider);

//utilidad para hacer logout
export const logout = () => auth.signOut();