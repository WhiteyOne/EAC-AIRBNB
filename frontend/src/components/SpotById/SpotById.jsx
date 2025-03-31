import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getSpotById } from "../../store/spot";
import { NavLink, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import './SpotById.css'
import ReviewPopout from "./SubComponent";
import SubReview from "./SubComponent/SubReview";




function SpotById() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const spot = useSelector((state) => state.spots.byId[spotId])

    console.log(spot, "----- this is my spot")
    // const userReview = useSelector((state)=> state.reviews.reviewsByCurrentId)



    const [isLoaded, setIsLoaded] = useState(false)
    // const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");







    useEffect(() => {
        const getData = async () => {
            await dispatch(getSpotById(spotId));
            setIsLoaded(true)
        }

        if (!isLoaded) {
            getData()
        }

    }, [isLoaded, dispatch, spotId])




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
                    <div className="spec-imag-container-main">
                        <div className="preview-img-by-id">
                            {spot.SpotImages.map((img, idx) => {
                                if (img.preview) {
                                    return (
                                        <>
                                            <img key={`${img.id}--${idx}`} src={img.url} />

                                        </>

                                    )

                                }

                            })}
                        </div>
                        <div className="sub-images-container">
                            {spot.SpotImages.map((img, idx) => {
                                if (!img.preview) {
                                    return (

                                        <div key={`${img.id} -- ${idx}`} className="preview-img-by-id">
                                            <img src={img.url} />
                                        </div>



                                    )

                                }

                            })}
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

                    <div className="booking-container">
                        <div className="bottom-review-container">
                            <div className="spec-reserve-container">
                                <h3>{`$${spot.price} /night`}</h3>
                                <FaStar />
                                <a>{`${`${spot.Review.length ? spot.Review.length : 'No'} Reviews`}`}</a>
                            </div>
                            {sessionUser && (
                                <NavLink
                                    className="reserve-button"
                                    to="/bookings"
                                    type="button"
                                >Reserve</NavLink>
                            )}

                        </div>
                        <div className="split-card">

                            <div className="spec-review-container">
                                <div className="review-post-container">
                                    <FaStar />
                                    <a>{spot.aveReview ? `${spot.aveReview.toFixed(1)} Average - ${spot.Review.length} Reviews` : `New`}</a>
                                </div>
                            </div>
                            {sessionUser && sessionUser.id !== spot.userId && (
                                <>

                                    <div >


                                        <SubReview />
                                    </div>


                                </>

                            )

                            }


                            <ReviewPopout review={spot.Review} />
                        </div>
                    </div>
                </div >

            </>
        );
    }
}
export default SpotById;