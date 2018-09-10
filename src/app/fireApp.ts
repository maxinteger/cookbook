import * as fb from 'firebase/app'

import 'firebase/auth'
import 'firebase/firestore'

const config = {
	apiKey: "AIzaSyAWDu--pbKNoVgRw7kVVfp_ao39nSQfdTo",
	authDomain: "kedvenc-receptek.firebaseapp.com",
	databaseURL: "https://kedvenc-receptek.firebaseio.com",
	projectId: "kedvenc-receptek",
	storageBucket: "kedvenc-receptek.appspot.com"
};

export const app = fb.initializeApp(config)
export const firebase = fb

