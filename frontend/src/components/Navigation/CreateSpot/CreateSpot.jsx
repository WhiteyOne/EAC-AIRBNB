import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";



function CreateSpot() {
    const navigate = useNavigate();

    const [contry, setCountry] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [lat, setLat] = useState('')
    const [long, setLong] = useState('')
    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [image, setImage]= useState([])

    const [errors, setErrors] = useState({})

    useEffect(()=> {
        const newErrors = {};

        
    })

    return (
        <>

        </>
    )
}

export default CreateSpot;