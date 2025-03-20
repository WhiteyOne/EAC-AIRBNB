import { useNavigate } from 'react-router-dom';
import '../../../AllSpots/Subcomponents/SpotCard'
import { FaStar } from 'react-icons/fa';



function UserSpotCard({ spot }) {
    const navigate = useNavigate()
    
    const handleClick = (e)=> {
        e.preventDefault();
        return navigate(`/spots/${spot.id}/edit`)
    }
    return (
        <>
            <div className='per-spot-container'>
                <div className='per-image-container'>
                    <img src={`${spot.previewImage}`} />
                </div>
                <div className='splash-info-container'>
                    <div className='splash-top-container spot-text'>
                        <span>{spot.city}, {spot.state}</span>
                        <div>
                            <FaStar/>
                            <span>{spot.aveReview}</span>
                        </div>
                    </div>
                    <div className='splash-middle-container spot-text'>
                        <p>{spot.name}</p>
                    </div>
                    <div className='that-spot-buttons-container'>
                        <button className='update-button button-glammor'
                        onClick={(e)=> handleClick(e)}
                        >Update</button>
                        <button className='delete-button button-glammor'

                        >Delete</button>
                    </div>
                </div>
            </div>
            <div></div>
        </>
    )
}
export default UserSpotCard;