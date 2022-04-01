import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, updateProfile } from 'firebase/auth';
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import homeIcon from '../assets/svg/homeIcon.svg';
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg';
import ListingItem from '../components/ListingItem';

const Profile = () => {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingsRef = collection(db, 'listings');

      const q = query(
        listingsRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      );

      const querySnap = await getDocs(q);

      const listings = [];

      querySnap.forEach(doc =>
        listings.push({
          id: doc.id,
          data: doc.data(),
        })
      );

      setListings(listings);
      setLoading(false);
    };

    fetchUserListings();
  }, [auth.currentUser.uid]);

  const onLogout = e => {
    e.preventDefault();
    auth.signOut();
    navigate('/');
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // update in FB (Auth)
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // update in FS (db)
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });
      }
    } catch (error) {
      toast.error('Erro Edição dos Dados');
    }
  };

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onDelete = async listingId => {
    if (window.confirm('Tem certeza que deseja apagar o anúncio?')) {
      await deleteDoc(doc(db, 'listings', listingId));
      const updatedListings = listings.filter(
        listing => listing.id !== listingId
      );
      setListings(updatedListings);
      toast.success('Anúncio deletado com sucesso.');
    }
  };

  const onEdit = listingId => navigate(`/edit-listing/${listingId}`);

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">Meu Perfil</p>
        <button type="button" className="logOut" onClick={onLogout}>
          Logout
        </button>
      </header>
      <main>
        <div className="profileDetailsHeader">
          <p className="personalDetailsText">Detalhes</p>
          <p
            className="changePersonalDetails"
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails(prevState => !prevState);
            }}
          >
            {changeDetails ? 'salvar' : 'editar'}
          </p>
        </div>
        <div className="profileCard">
          <form>
            <input
              type="text"
              id="name"
              className={!changeDetails ? 'profileName' : 'profileNameActive'}
              onChange={onChange}
              disabled={!changeDetails}
              value={name}
            />
            <input
              type="email"
              id="email"
              className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
              onChange={onChange}
              disabled={!changeDetails}
              value={email}
            />
          </form>
        </div>
        <Link to="/create-listing" className="createListing">
          <img src={homeIcon} alt="Home" />
          <p>Vender ou alugar sua casa</p>
          <img src={arrowRight} alt="Seta para Direita" />
        </Link>
        {!loading && listings?.length > 0 && (
          <>
            <p className="listingText">Seus Anúncios</p>
            <ul className="listingsList">
              {listings.map(listing => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
};

export default Profile;
