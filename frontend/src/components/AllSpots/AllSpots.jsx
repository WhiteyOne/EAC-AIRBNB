import { useDispatch, useSelector } from "react-redux";
import "./AllSpots.css"
import { useEffect, useState } from "react";
import { getAllSpotsThunk } from "../../store/spot";
import { NavLink } from "react-router-dom";
import SpotCard from "./Subcomponents/SpotCard";


function AllSpots() {
    const dispatch = useDispatch();

    const spots = useSelector((state) => state.spots.allSpots)
    console.log(spots)
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
    if (!isLoaded) {
        return <h1>Loading</h1>
    }
    return (
        <>
            <h2></h2>
            <div className="spot-container">
                {
                    spots.map((spot, idx) => (
                      <SpotCard spot={spot} idx={idx}/>
                    ))
                }
            </div>
        </>
    )
}

export default AllSpots;