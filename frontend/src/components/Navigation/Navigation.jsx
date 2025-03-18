import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
// import CreateSpot from './CreateSpot';


function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <ul className='nav-container'>
            <div>
                <li className='nav-links'>
                    <NavLink to="/">lightSwitch
                        <img src='../../switch.jpg' />
                    </NavLink>
                </li>

            </div>
            <div className='right-side-nav'>
                {sessionUser && (

                    <li className='nav-links'>
                        <NavLink to='/spots/new'>Create a Spot</NavLink>
                    </li>

                )}
                {isLoaded && (

                    <li className='nav-links'>
                        <ProfileButton user={sessionUser} />
                    </li>

                )}
            </div>
        </ul>
    );
}

export default Navigation;