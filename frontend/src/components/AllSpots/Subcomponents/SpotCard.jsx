import { NavLink } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import './SpotCard.css'

function SpotCard({ spot, idx }) {
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