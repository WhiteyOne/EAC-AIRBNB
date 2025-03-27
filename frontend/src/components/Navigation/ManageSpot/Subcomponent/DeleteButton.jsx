import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { deleteSpotThunk } from '../../../../store/spot';



function DeleteButton({spot}) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;

        

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);
   
    const deleteSpot = async (e) => {
        e.preventDefault();
        dispatch(deleteSpotThunk(spot.id));
        closeMenu();
        
        
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
            <button onClick={toggleMenu}>
                Delete
            </button>
            <ul className={ulClassName} ref={ulRef}>
                <div>
                    <h3>Are you sure you wish to delete this spot?</h3>
                </div>
                <div>
                    <button
                    onClick={(e)=> deleteSpot(e)}
                    >Yes</button>
                    <button onClick={(e)=> closeMenu(e)}>No</button>
                </div>
            </ul>
        </>
    );
}

export default DeleteButton;