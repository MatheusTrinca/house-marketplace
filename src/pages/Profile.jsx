import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router';

const Profile = () => {
  const auth = getAuth();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  const navigate = useNavigate();

  const onLogout = e => {
    e.preventDefault();
    auth.signOut();
    navigate('/');
  };

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">Meu Perfil</p>
        <button type="button" className="logOut" onClick={onLogout}>
          Logout
        </button>
      </header>
    </div>
  );
};

export default Profile;
