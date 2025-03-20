import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import './UpdateSpot.css'
import { useDispatch, useSelector } from "react-redux";
import { createSpotThunk } from "../../../store/spot";




function UpdateSpot() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id} = useParams()
    

    const userId = useSelector((state)=>state.session.user.id)
    const spot = useSelector((state)=> state.spots.byId[id])
    console.log(spot, '-this is my spot')

    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(1)
    const [previewImage, setPreviewImage] = useState('')
    const [images, setImages] = useState('')
    const [isLoaded,setIsLoaded] = useState(false)
    
    const [errors, setErrors] = useState({})
    
    useEffect(() => {
        const newErrors = {};
        if (!country) {
            newErrors.country = "Required"
        }else if (country.length < 1 || country.length > 30) {
            newErrors.country = "Country should be less then 30 characters."
        }

        if (!address) {
            newErrors.address = "Required"
        }else if (address.length < 3 || address.length > 100) {
            newErrors.address = "Address should be more then 3 characters and less then 100 characters"
        }

        if(!city){
            newErrors.city = "Required"
        }else if (city.length < 1 || city.length > 30) {
            newErrors.city = "City much be more then 1 character and less then 30."
        }

        if(!state){
            newErrors.state = "Required"
        }
        else if (state.length < 1 || state.length > 30) {
            newErrors.state = "State must be more then 1 character and less then 30."
        }

        if(!lat){
            newErrors.lat = "Required"
        }
        else if (lat < -90 || lat > 90) {
            newErrors.lat = "Lattitude must be between -90 and 90."
        } if(!lng){
            newErrors.lng = "Required"
        }
        else if (lng < -180 || lng > 180) {
            newErrors.lng = "Longitude must be between -180 and 180"
        }
        if(!description){
            newErrors.description = "Requires 30 characters"
        }
        else if (description.length <= 30 || description.length > 256) {
            newErrors.description = "Descriptions can be 30 characters up to 256 characters long"
        }
        if(!title){
            newErrors.title = "Name is required"
        }
        else if (title.length < 1 || title.length > 50) {
            newErrors.title = "Title can't exceed 50 characters"
        }
        
        if(!price){
            newErrors.price = "Price is required"
        } else if (price < 0.01) {
            newErrors.price = "You have to make something from your posting"
        }
        if (!previewImage.length) {
            newErrors.previewImage = "You have to have a preview image"
        } else if((previewImage && previewImage.endsWith('.jpg')) ||(previewImage && previewImage.endsWith('.jpeg')) || (previewImage && !previewImage.endsWith('.png')) ){
            newErrors.previewImage = "Your image needs to end with .png, .jpeg or .jpg"
        }
        if((images && images.endsWith('.jpg')) ||(images && images.endsWith('.jpeg')) || (images && !images.endsWith('.png')) ){
            newErrors.images = "Your image needs to end with .png, .jpeg or .jpg"
        }
        setErrors(newErrors);
    }, [country, address, city, state, lat, lng, description, title, price, previewImage, images])


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('booped the booper')
        return dispatch(createSpotThunk({userId,country, address, city, state, lat, lng, description, title, price, previewImage,images})) && navigate(`/spots/${userId}`
    )
    }
    return (
        <>
            <form className="create-spot-form"
                onSubmit={(e) => handleSubmit(e)}
            >
                <div className="address-section" >

                    <div>
                        <h2>Update Current Spot</h2>
                    </div>
                    <div className="country-address-container" >
                        <h3> Where is your place located</h3>
                        <p>Guests will only get your exact addressonce they booked a reservation.</p>
                        <label>
                            Country 
                            <p style={{fontSize:13,color:"gray"}}>{errors.country}</p>
                            <input
                                type="text"
                                name="country"
                                placeholder="country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </label>
                        <label>
                            Street Address
                            <p style={{fontSize:13,color:"gray"}}>{errors.address}</p>
                            <input
                                type="text"
                                name="Street Address"
                                value={address}
                                placeholder="street address"
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="city-state-container" style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
                        <label>
                            City 
                            <p style={{fontSize:13,color:"gray"}}>{errors.city}</p>
                            <input
                                type="text"
                                name="City"
                                value={city}
                                placeholder="city"
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </label>
                        <label>
                            State 
                            <p style={{fontSize:13,color:"gray"}}>{errors.state}</p>
                            <input
                                type="text"
                                name="State"
                                value={state}
                                placeholder="state"
                                onChange={(e) => setState(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="Lat-long-container" style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
                        <label>
                            Latitude
                            <p style={{fontSize:13,color:"gray"}}>{errors.lat}</p>
                            <input
                                type="text"
                                name="Latitude"
                                value={lat}
                                placeholder="latitude"
                                onChange={(e) => setLat(e.target.value)}
                            />
                        </label>
                        <label>
                            Longitude
                            <p style={{fontSize:13,color:"gray"}}>{errors.lng}</p>
                            <input
                                type="text"
                                name="Longitude"
                                value={lng}
                                placeholder="longitude"
                                onChange={(e) => setLng(e.target.value)}
                            />
                        </label>
                    </div>
                </div>
                <div className="description-section">
                    <label>
                        <h3>Describe your place to guests</h3>
                        <span>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</span>
                        <input
                            type="text"
                            name="Description"
                            value={description}
                            placeholder="why is this spot amazing"
                            onChange={(e) => setDescription(e.target.value)}
                            
                        />
                        <p style={{fontSize:13,color:"gray"}}>{errors.description}</p>
                    </label>
                </div>
                <div className="title-container">
                    <label>
                        <h3>Create a title for your spot</h3>
                        <span>Catch guests&apos; attention with a spot title that highlights what makes your place special.</span>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            placeholder="name of spot"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>
                    <p style={{fontSize:13,color:"gray"}}>{errors.title}</p>
                </div>
                <div className="price-container">
                    <label>
                        <h3>Set a base price for your spot</h3>
                        <span>Competitive pricing can help your listing stand out and rank higher in search results.</span>
                        <input
                            type="text"
                            name="price"
                            value={price}
                            placeholder="$0.01+"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <p style={{fontSize:13,color:"gray"}}>{errors.price}</p>
                    </label>
                    
                </div>
                <div className="image-container">
                    <label>
                        <h3>Liven up your spot with photos</h3>
                        <span>Submit a link to at least one photo to publish your spot.</span>
                        <input
                            type="text"
                            value={previewImage}
                            placeholder="Preview Image"
                            onChange={(e) => setPreviewImage(e.target.value)}
                        />
                        <p style={{fontSize:13,color:"gray"}}>{errors.previewImage}</p>
                    </label>
                    <label>
                        <input
                            type="text"
                            value={images}
                            placeholder="Image URL"
                            onChange={(e) => {setImages(e.target.value)}}
                            
                        />
                    </label>
                    <p style={{fontSize:13,color:"gray"}}>{errors.images}</p>
              
                </div>
                <div className="create-spot-button-container">
                <button
                type="submit"
                disabled={Object.values(errors).length? true:false}
                >
                Create Spot
                </button>
                </div>
            </form>

        </>
    )
}

export default UpdateSpot;