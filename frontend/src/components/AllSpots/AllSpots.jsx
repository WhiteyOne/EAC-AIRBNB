import { useDispatch, useSelector } from "react-redux";
import "./AllSpots.css"
import { useEffect, useState } from "react";
import { getAllSpotsThunk } from "../../store/spot";


function AllSpots() {
    const dispatch = useDispatch();


    const [spots, setSpots] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const getAllSpots = async () => {

            dispatch(getAllSpotsThunk());
            setIsLoaded(true)
        }
        if (!isLoaded) {
            getAllSpots()
        }

    }, [spots, isLoaded, dispatch])

    return (
        <>
            <div className="spot-container">
                {/* <ui>
                

                </ui> */}
            </div>
        </>
    )
}

export default AllSpots;