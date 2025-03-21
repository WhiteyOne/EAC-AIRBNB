import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllSpotsThunk } from "../../store/spot";
import { NavLink, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import './SpotById.css'

function SpotById() {
    const { spotId } = useParams()
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);


    const spot = useSelector((state) => state.spots.allSpots[spotId -1])
    const [isLoaded, setIsLoaded] = useState(false)
    console.log(sessionUser, 'thisis my spot')

    useEffect(() => {
        const getAllSpots = async () => {

            await dispatch(getAllSpotsThunk());
            setIsLoaded(true)
        }
        if (!isLoaded) {
            getAllSpots()
        }

    }, [isLoaded, dispatch])
    if (!isLoaded) {
        return <h1>Loading</h1>
    } else {

        return (
            <>
                <div className="spot-details-card">
                    <div>
                        <h2>Name</h2>
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
                            <h3>Hosted by</h3>
                        </div>
                        <div>
                        <p>{`${spot.description}`}</p>
                        </div>
                    </div>
                    <div className="spec-reserve-container">
                        <h3>{`$${spot.price} /night`}</h3>
                        <FaStar />
                        <a>{`${"reviews"}`}</a>
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
                            <h3>{spot.aveReview ? `${spot.aveReview} - ${spot.aveReview} Reviews` : `New`}</h3>
                        </div>
                        {sessionUser && (
                            <button>Post Your Review</button>
                        )}
                        <h3>Reviews coming soon</h3>

                    </div>
                </div>

            </>
        );
    }
}
export default SpotById;