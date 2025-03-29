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

                <div className='nav-links' >
                    <NavLink to="/">
                        <img src='../../switch.jpg' />
                    </NavLink>
                </div>

            </div>
            <div className='right-side-nav'>
                {sessionUser && (
                        <a className='create-spot-link'>
                            <NavLink to='/spots/new'><h4>Create a Spot</h4></NavLink>
                        </a>
                   

                )}
                {isLoaded && (
                    
                        <a className='splash-nav-links'>
                            <ProfileButton user={sessionUser} />
                        </a>

                )}
            </div>
        </ul>
    );
}

export default Navigation;