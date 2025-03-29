import { useEffect, useState } from 'react'
import './ReviewPopout.css'
import { getReviewsForSpotThunk } from '../../../store/review';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllSpotsThunk } from '../../../store/spot';
import OpenModalMenuItem from '../../Navigation/OpenModalMenuItem';

function ReviewPopout() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const reviews = useSelector((state) => state.reviews.allCurrentReviews)
    const sessionUser = useSelector(state => state.session.user);


    const [isLoaded, setIsLoaded] = useState(false)

    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };



    const closeMenu = () => setShowMenu(false);

    useEffect(() => {
        const getData = async () => {
            await dispatch(getReviewsForSpotThunk(spotId));
            await dispatch(getAllSpotsThunk());
            setIsLoaded(true)
        }
       
        if (!isLoaded) {
             getData()
        }
        
    }, [isLoaded, dispatch,spotId])

    if (!isLoaded) {
        return (
            <h1>Loading</h1>
        )
    } else {

        return (
            <>
                {reviews.length > 0 && (


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
                                {sessionUser.id === review.userId && (
                                    <button>
                                        Delete
                                    </button>
                        )}
                            </>
                        ))}
                    </div>
                )
                }
                {reviews.length === 0 && (
                    <h2>Be the first to leave a Review.</h2>

                )

                }

            </>

        )

    }
}
export default ReviewPopout;