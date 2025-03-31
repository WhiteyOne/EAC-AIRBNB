import { useEffect, useState } from 'react'
import './ReviewPopout.css'
import { deleteReviewThunk, getReviewsForSpotThunk } from '../../../store/review';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpotById } from '../../../store/spot';

function ReviewPopout() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const reviews = useSelector((state) => state.reviews.allCurrentReviews)
    const sessionUser = useSelector(state => state.session.user);

    const modalClass = `modal-background`
    const [isLoaded, setIsLoaded] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)

    useEffect(() => {
        if (openMenu) {
            setOpenMenu(true)
        } if (!openMenu) {
            setOpenMenu(false)
        }
    },[openMenu])

    useEffect(() => {
        const getData = async () => {
            await dispatch(getReviewsForSpotThunk(spotId));
            await dispatch(getSpotById(spotId))
            setIsLoaded(true);
        }

        if (!isLoaded) {
            getData()
        }

    }, [isLoaded, dispatch, spotId])

    const handleDelete = (e, reviewId) => {
        e.preventDefault()

        dispatch(deleteReviewThunk(reviewId));
    }

    if (!isLoaded) {
        return (
            <h1>Loading</h1>
        )
    } else {

        return (
            <>
                {reviews.length && (


                    <div className='reviews-container'>
                        {reviews.map((review, idx) => (
                            <>

                                <div className='first-name-review'>
                                    <h4 key={`${idx}-- ${review.id}`}>{review.User.firstName}</h4>
                                </div>
                                <div className='per-date-review date'>
                                    <h5>{review.createdAt.substring(10, 'T')}</h5>
                                </div>
                                <div className='per-review'>
                                    <p>{review.review}</p>
                                </div>
                                {sessionUser && sessionUser.id === review.userId && (
                                    <div>
                                        <button
                                            onClick={() => setOpenMenu(true)}
                                        >Delete Review</button>
                                        <div className={`delete-card ${openMenu ? modalClass : 'hidden'}`}>
                                        <h3>Are you sure you want to Delete this spot?</h3>
                                        <div className='yes-no'>

                                            <button
                                                className={openMenu ? modalClass : 'hidden'}
                                                onClick={(e) => handleDelete(e, review.id)}
                                            >
                                                Yes
                                            </button>

                                        <button
                                            onClick={() => setOpenMenu(!openMenu)}
                                        >No</button>
                                        </div>
                                        </div>

                                    </div>
                                )}
                            </>
                        ))}
                    </div>
                )
                }
                {!reviews.length && (
                    <h2>Be the first to leave a Review.</h2>

                )

                }

            </>

        )

    }
}
export default ReviewPopout;