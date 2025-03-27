import { useNavigate } from 'react-router-dom';
import '../../../AllSpots/Subcomponents/SpotCard'
import { FaStar } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {  getAllSpotsThunk } from '../../../../store/spot';
import "./UserSpotCard.css"
import DeleteButton from './DeleteButton';



function UserSpotCard({ spot }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()



    const [isLoaded, setIsLoaded] = useState(false)
    const [showAlert, setShowAlert] = useState(false)

    const deleteClassName = "delete-alert" + (showAlert ? "" : "hidden")

    

    const handleClickUpdate = (e) => {
        e.preventDefault();
        return navigate(`/spots/${spot.id}/edit`)
    }


    useEffect(() => {
        const getAllSpots = async () => {

            await dispatch(getAllSpotsThunk());
            setIsLoaded(true)
        }
        if (!isLoaded) {
            getAllSpots()
        }
    }, [isLoaded, dispatch]
    )
    if (!isLoaded) {
        return <h1>loading</h1>
    } else {

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
                                <FaStar />
                                <span>{spot.aveReview ? spot.aveReview : "New"}</span>
                            </div>
                        </div>
                        <div className='splash-middle-container spot-text'>
                            <p>{spot.name}</p>
                        </div>
                        <div className='that-spot-buttons-container'>
                            <button className='update-button button-glammor'
                                onClick={(e) => handleClickUpdate(e)}
                            >Update</button>
                            
                        <DeleteButton spot={spot}/>
                        </div>
                    </div>
                </div>
                <div></div>
            </>
        )
    }
}
export default UserSpotCard;