import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getAllSpotsThunk } from "../../store/spot";
import { NavLink, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import './SpotById.css'
import ReviewPopout from "./SubComponent";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import SubReview from "./SubComponent/SubReview";



function SpotById() {
    const { spotId } = useParams()
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const ulRef = useRef();
    console.log(spotId)
    
    const spots = useSelector((state) => state.spots.allSpots)
    const spot = spots.find((spot) => spot.id === parseInt(spotId))
    const reviews = useSelector((state) => state.reviews.allCurrentReviews)
    // const userReview = useSelector((state)=> state.reviews.reviewsByCurrentId)
    const [isLoaded, setIsLoaded] = useState(false)
    
    
    
    const [showMenu, setShowMenu] = useState(false);
    
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
    
      const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");


    useEffect(() => {
        const getCurrentReviews = async () => {
            await dispatch(getReviewsForSpotThunk(spotId));
            setIsLoaded(true)
        }
        const getAllSpots = async () => {

            await dispatch(getAllSpotsThunk());

            setIsLoaded(true)
        }
        if (!isLoaded) {
            getAllSpots();
            getCurrentReviews();
        }

    }, [isLoaded, dispatch])
    if (!isLoaded) {
        return <h1>Loading</h1>
    } else {

        return (
            <>
                <div className="spot-details-card">
                    <div>
                        <h2>{spot.name}</h2>
                        <p>{`${spot.city}, ${spot.state}, ${spot.country}`}</p>
                    </div>
                    <div className="spec-imag-container">
                        <div className="spec-imag-container-main">
                            <img src={`${spot.previewImage}`} />

                        </div>
                        <div className="spec-imag-container-sub">

                        </div>
                    </div>
                    <div className="spec-spot-dis" style={{ display: "grid" }}>
                        <div>
                            <h3>Hosted by {spot.Owner.firstName}</h3>
                        </div>
                        <div>
                            <p>{`${spot.description}`}</p>
                        </div>
                    </div>
                    <div className="bottom-review-container">

                        <div className="spec-reserve-container">
                            <h3>{`$${spot.price} /night`}</h3>
                            <FaStar />
                            <a>{`${`${reviews.length? reviews.length: 'No'} Reviews`}`}</a>
                            {sessionUser && (
                                <NavLink
                                    to="/bookings"
                                    type="button"
                                >Reserve</NavLink>
                            )}
                        </div>
                        <div className="spec-review-container">
                            <div className="review-post-container">
                                <FaStar />
                                <a>{spot.aveReview ? `${spot.aveReview / reviews.length} Average - ${reviews.length} Reviews` : `New`}</a>
                            </div>
                        </div>
                            <>
                        {sessionUser  && (
                                <button onClick={toggleMenu}>
                                    Post a Review
                                </button>
                        )}
                            <div className ={ulClassName} ref={ulRef} >

                                <OpenModalMenuItem
                                    onClick={closeMenu}
                                    modalComponent={<SubReview/>}

                                    />

                            </div>
                            </>
                        
                        <ReviewPopout/>
                    </div>
                </div>

            </>
        );
    }
}
export default SpotById;