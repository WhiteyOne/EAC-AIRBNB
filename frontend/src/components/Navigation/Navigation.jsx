import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <ul className='nav-container'>
            <li className='nav-links'>
                <NavLink to="/">Home</NavLink>
            </li>
            {isLoaded && (
                
                    <li className='nav-links'>
                        <ProfileButton user={sessionUser} />
                    </li>
                
            )}
        </ul>
    );
}

export default Navigation;