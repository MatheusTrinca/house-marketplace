import { useLocation, Navigate } from 'react-router';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firebase';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import googleIcon from '../assets/svg/googleIcon.svg';

const OAuth = () => {
  return <div></div>;
};

export default OAuth;
