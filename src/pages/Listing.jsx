import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import Spinner from '../components/Spinner';
import shareIcon from '../assets/svg/shareIcon.svg';

const Listing = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(null);

  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    };

    fetchListing();
  }, [navigate, params.listingId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      {/* Slider */}
      <div
        className="shareIconDiv"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          // http://localhost:3000/category/sale/btudvmiz1KbLuCLwmctr
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <img src={shareIcon} alt="Share icon" />
      </div>
      {shareLinkCopied && <p className="linkCopied">Link Copiado!</p>}
      <div className="listingDetails">
        <p className="listingName">
          {listing.name} - R${' '}
          {listing.offer
            ? listing.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </p>
        <p className="listingLocation">{listing.location}</p>
        <p className="listingType">
          Para {listing.type === 'rent' ? 'Alugar' : 'Venda'}
        </p>
        {listing.offer && (
          <p className="discountPrice">
            R$ {listing.regularPrice - listing.discountedPrice} desconto
          </p>
        )}

        <ul className="listingDetailsList">
          <li>
            {listing.bedrooms > 1 ? `${listing.bedrooms} Quartos` : '1 Quarto'}
          </li>
          <li>
            {listing.bathrooms > 1
              ? `${listing.bathrooms} Banheiros`
              : '1 Banheiro'}
          </li>
          <li>{listing.parking && 'Estacionamento'}</li>
          <li>{listing.furnished && 'Mobiliado'}</li>
        </ul>
        <p className="listingLocationTitle">Localização</p>
        {/* MAP */}

        {auth.currentUser?.uid !== listing.userRef && (
          <Link
            to={`/contact/${listing.userRef}?listingName=${listing.name}`}
            className="primaryButton"
          >
            Contatar
          </Link>
        )}
      </div>
    </main>
  );
};

export default Listing;
