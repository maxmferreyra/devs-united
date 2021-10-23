import firebase from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';
import 'firebase/firestore';

//Inicializar firebase
firebase.initializeApp(firebaseConfig)

//Connect to firestore //
export const firestore = firebase.firestore();