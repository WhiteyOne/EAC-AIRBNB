import { useEffect, useState } from 'react'
import './ReviewPopout.css'
import { getReviewsForSpotThunk } from '../../../store/review';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function ReviewPopout() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const reviews = useSelector((state) => state.reviews.allCurrentReviews)
    
    const [isLoaded, setIsLoaded] = useState(false)
   



    useEffect(() => {
        const getCurrentReviews = async () => {
            await dispatch(getReviewsForSpotThunk(spotId));
            setIsLoaded(true)
        }
        if (!isLoaded) {
            getCurrentReviews()
        }
    }, [dispatch, isLoaded,spotId])

    if (!isLoaded) {
        return (
            <h1>Loading</h1>
        )
    } else {

        return (
            <>
            { reviews.id && (


                <div className='reviews-container'>
                    {reviews.map((review, idx) => (
                        <>

                            <div className='first-name-review'>
                                <h4 key={`${idx}-- ${review.id}`}>{review.User.firstName}</h4>
                            </div>
                            <div className='per-date-review date'>
                                <h5>{review.createdAt.substring(10,'T')}</h5>
                            </div>
                            <div className='per-review'>
                                <p>{review.review}</p>
                            </div>

                        </>
                    ))}
                </div>
                )
            }
    
        
                 <h2>Be the first to leave a Review.</h2>
            </>

        )

    }
}
export default ReviewPopout;