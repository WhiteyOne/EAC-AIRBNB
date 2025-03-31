import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../../store/spot";
import UserSpotCard from "./Subcomponent";



function ManageSpots() {
    const dispatch = useDispatch();

    const spots = useSelector((state) => state.spots.allSpots)
    const sessionUser = useSelector(state => state.session.user);
    const userArray = spots.filter((spot) => {
        if (spot.userId === sessionUser.id) {
            return spot
        }
    })
    const [isLoaded, setIsLoaded] = useState(false)

    

    useEffect(() => {
        const getAllSpots = async () => {

            await dispatch(getAllSpotsThunk());
            setIsLoaded(true)
        }
        if(!isLoaded){
            getAllSpots()
        }
        

    }, [isLoaded, dispatch]);

    if (!isLoaded) {
        return <h1>loading</h1>
    } else {
        return (
            <>
                <h1>Manage Spots</h1>
                    <div className="spot-container">
                {
                        userArray.map((spot,idx)=>(
                            <div className="map-card-container" key={`${spot.id}--${idx}`}>
                                <UserSpotCard spot={spot} />
                            </div>
                            ))
                }
                    </div>
            </>
        )
    }
}

export default ManageSpots;