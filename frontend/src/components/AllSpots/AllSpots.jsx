import { useDispatch, useSelector } from "react-redux";
import "./AllSpots.css"
import { useEffect, useState } from "react";
import { getAllSpotsThunk } from "../../store/spot";


function AllSpots() {
    const dispatch = useDispatch();

    const spots = useSelector((state)=> state.spots.allSpots)

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const getAllSpots = async () => {

            await dispatch(getAllSpotsThunk());
            setIsLoaded(true)
        }
        if (!isLoaded) {
            getAllSpots()
        }

    }, [spots, isLoaded, dispatch])
if(!isLoaded){
    return <h1>Loading</h1>
}
    return (
        <>
            <div className="spot-container">
                {
                    spots.map((spot,idx) => (
                        <div key={`${spot.id}--${idx}`}>
                            <span>
                            {spot.address}
                            </span>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default AllSpots;