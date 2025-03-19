import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllSpotsThunk } from "../../store/spot";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";

function SpotById() {
    const { spotId } = useParams()
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    // const navigate = useNavigate()
    const reviews = [{firstName:'june', review:'lfkajsldgjlajsdlgjasldf',date:Date().now},
                    {firstName:'wakjflne', review:'lfkajsldgjlajsdlgjasldf',date:Date().now}]
    const spot = useSelector((state) => state.spots.allSpots[Number(spotId)])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const getAllSpots = async () => {

            await dispatch(getAllSpotsThunk());
            setIsLoaded(true)
        }
        if (!isLoaded) {
            getAllSpots()
        }

    }, [spot, isLoaded, dispatch])
    return (
        <>
            <div>
                <div>
                    <h2>Name</h2>
                    <p>city, state, country</p>
                </div>
                <div className="spec-imag-container">
                    <div className="spec-imag-container-main">
                        <a > PreviewImage </a>

                    </div>
                    <div className="spec-imag-container-sub">
                        <a> image 1</a>
                        <a> image 2</a>
                        <a> image 3</a>
                        <a> image 4</a>
                    </div>
                </div>
                <div className="spec-spot-dis" style={{ display: "grid" }}>
                    <div>
                        <h3>Hosted by</h3>
                    </div>
                    <div>
                        <p> this is all the information about the spot that I need to know for why I should book this place jjjfsjdfljsaldfjasjdfljasldjfajsdfljas;dfjksl;djflsjdfljsldjflksadjfklsajdlfjlasljdflkjasdlf;jflkajsldfjlasjdfljals;dfj;ljasdlfjlasjdfljaskldfjlksadjflajsdfljasl;dfjlasjdfljasdlkfjasldfjlasjdflkajsdklfjlsadfjlajsdfjlasjfl;kasjdflajsdfkljasdflkas</p>
                    </div>
                </div>
                    <div className="spec-reserve-container">
                        <h3>{`$${"price"} night`}</h3>
                        <FaStar/>
                        <a>{`${"reviews"}`}</a>
                {sessionUser && (
                    <NavLink
                        
                        type="button"
                        
                    >Reserve</NavLink>
                    )}
                    </div>

            </div>

        </>
    )
}
export default SpotById;