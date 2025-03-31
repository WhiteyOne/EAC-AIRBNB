import { NavLink, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import './SpotCard.css'
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getReviewsForSpotThunk } from "../../../store/review";
import { getAllSpotsThunk } from "../../../store/spot";



function SpotCard({ spot, idx }) {
    const {spotId} = useParams()
    const [isLoaded, setIsLoaded] = useState();
    const dispatch = useDispatch();

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

    }, [isLoaded, dispatch,spotId])
    return (
        <>
            <div className='per-spot-container' key={`${spot.id}--${idx}`}>
                <div className="per-image-container">
                    <NavLink to={`/spots/${spot.id}`}>
                        <img

                            className='splash-imgs cursor-main'
                            src={spot.previewImage ? `${spot.previewImage}` : ""}
                        />
                    </NavLink>
                </div>
                <div className="splash-info-container">
                    <div className="splash-top-container spot-text">
                        <span>{spot.city}, {spot.state}</span>
                        <div>
                        <FaStar/>
                        <span>{spot.aveReview}</span>
                        </div>
                    </div>
                    <div className="splash-middle-container spot-text">
                        <p>{spot.name}</p>
                    </div>
                    <div className="splash-bottom-container spot-text">
                        <span>{`$${spot.price} /night`}</span>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SpotCard;