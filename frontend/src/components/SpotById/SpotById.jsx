import { useParams } from "react-router-dom";

function SpotById(){
    const {spotId} = useParams()
    console.log(spotId)
    return (
        <>
            <h1>Under Contstruction</h1>
        </>
    )
}
export default SpotById;