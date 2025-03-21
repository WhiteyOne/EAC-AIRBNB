import { useEffect, useState } from 'react'
import './ReviewPopout.css'


function ReviewPopout() {

    const [review, setReview] = useState('')
    const [rating, setRating] = useState(0)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        const newErrors = {}
        if (!review) {
            newErrors.review = "Please enter at least 10 characters."
        } else if (review.length < 9) {
            newErrors.review = "You need at least 10 characters to submit a review."
        }
        if (Number(rating) <= 5 && Number(rating) >= 1) {
            newErrors.rating = 'Your rating must be between 1 and 5'
        } else if (!rating) {
            newErrors.rating = 'Please enter a rating to select a review'
        }
        setErrors(newErrors)
    },[errors,rating,review])
    
    return (
        <>
            <div className='review-input-card'>
                <div className='review-title-container'>
                    <h2>How was your stay?</h2>
                </div>
                <form>
                <input
                    type='text'
                    placeholder='Leave your review here!'
                    onChange={()=>setReview(review)}
                />
                </form>

                
            </div>
        </>
    )

}
export default ReviewPopout;