import { useDispatch, useSelector } from "react-redux";
import "./AllSpots.css"
import { useEffect, useState } from "react";
import { getAllSpotsThunk } from "../../store/spot";
// import { NavLink } from "react-router-dom";
import SpotCard from "./Subcomponents/SpotCard";


function AllSpots() {
    const dispatch = useDispatch();

    const spots = useSelector((state) => state.spots.allSpots)
    const [isLoaded, setIsLoaded] = useState(false)

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
                <div className="spot-container">
                    {
                        spots.map((spot, idx) => (
                            <div className="map-card-container" key={`${idx}--${spot.id}`} >
                                <SpotCard spot={spot}/>
                            </div>
                        ))
                    }
                </div>
            </>
        );

    }
}

export default AllSpots;