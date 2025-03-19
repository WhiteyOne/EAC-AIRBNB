import { NavLink } from "react-router-dom";

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
                <div className="text-img image-label">
                    <span className="description-card">
                        <div>
                            <p className='location-splash label-text'>
                                {`${spot.city}, ${spot.state}`}
                            </p>
                            <p>

                            </p>
                            <p className='price-splash label-text'>
                                {`$${spot.price} per night`}
                            </p>
                        </div>
                        <div>
                            <p>{`${spot.aveReview}`}</p>
                        </div>
                    </span>

                </div>
            </div>
        </>
    )
}
export default SpotCard;