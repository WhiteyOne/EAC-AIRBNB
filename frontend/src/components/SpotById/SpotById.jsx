import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getAllSpotsThunk } from "../../store/spot";
import { NavLink, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import './SpotById.css'
import ReviewPopout from "./SubComponent";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import SubReview from "./SubComponent/SubReview";
import { getReviewsForSpotThunk } from "../../store/review";




function SpotById() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const ulRef = useRef();
    
    const spot = useSelector((state) => state.spots.byId[spotId])
    const reviews = useSelector((state) => state.reviews.allCurrentReviews)
    const reviewsById = useSelector((state) => state.reviews.reviewsBySpotId[sessionUser.id])
    
    // const userReview = useSelector((state)=> state.reviews.reviewsByCurrentId)
    
    
    
    const [isLoaded, setIsLoaded] = useState(false)
    const [showMenu, setShowMenu] = useState(false);
    

    const toggleMenu = (e) => {
        e.stopPropagation(); 
        setShowMenu(!showMenu);
    };
    
    
    
    useEffect(() => {
        const getData = async () => {
            await dispatch(getReviewsForSpotThunk(spotId));
            await dispatch(getAllSpotsThunk());
            setIsLoaded(true)
        }
       
        if (!isLoaded) {
             getData()
        }
        
    }, [isLoaded, dispatch,spotId])

    useEffect(() => {
        if (!showMenu) return;
        
        const closseMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };
       
        
        document.addEventListener('click', closeMenu);
    
        return () => document.removeEventListener("click", closeMenu);
      }, [showMenu]);
    
      const closeMenu = () => setShowMenu(false);
    
    if (!isLoaded) {
        return <h1>Loading</h1>
    } else {
        
        return (
            <>
                <div className="spot-details-card">
                    <div>
                        <h2>{spot.Owner.firstName}</h2>
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
                                <a>{spot.aveReview ? `${spot.aveReview} Average - ${reviews.length} Reviews` : `New`}</a>
                            </div>
                        </div>
                            
                            <>
                      
                            <div >

                            <button className={toggleMenu} ref={ulRef}>
                                Leave a Review
                            
                                    <SubReview/>

                                    
                            </button>

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