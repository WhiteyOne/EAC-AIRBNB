import { useEffect, useState } from "react"
import { FaStar } from "react-icons/fa"
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createReviewThunk, getReviewsForSpotThunk } from "../../../store/review";
import { getSpotById } from "../../../store/spot";


function SubReview() {
    const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user);
    const { spotId } = useParams();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState({});
    const [showMenu, setShowMenu] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const getData = async () => {
            await dispatch(getReviewsForSpotThunk(spotId));
            setIsLoaded(true)
        }
        if (!isLoaded) {
            getData()

        }
        if (showMenu) {
            return;
        }

    }, [isLoaded, dispatch, spotId, showMenu])

    const starClicker = (e, num) => {
        e.preventDefault()
        setStars(parseInt(num))

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createReviewThunk({ review, stars, spotId }),)
        setShowMenu(false)
    }
    useEffect(() => {
        const getData = async () => {
            await dispatch(getSpotById(spotId));
            setIsLoaded(true)
        }

        if (!isLoaded) {
            getData()
        }

    }, [isLoaded, dispatch, spotId])

    useEffect(() => {
        const newErrors = {}
        if (!review) {
            newErrors.review = "Please enter at least 10 characters."
        } else if (review.length < 9) {
            newErrors.review = "You need at least 10 characters to submit a review."
        }
        if (parseInt(stars) >= 5 && parseInt(stars) <= 1) {
            newErrors.stars = 'Your stars must be between 1 and 5'
        } else if (!stars) {
            newErrors.stars = 'Please enter a stars to select a review'
        }
        setErrors(newErrors)
    }, [stars, review])



    return (
        <>
            <button
                onClick={() => setShowMenu(!showMenu)}
            >
                Leave a Review
            </button>
            <div className={showMenu ? 'review-input-card' : "hidden"}>


                <form
                    className="form-container"
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <div className="this-my-x">
                        <button className="btn-x"
                            onClick={() => setShowMenu(!showMenu)}
                        >X</button>
                    </div>
                    <div className='review-title-container'>
                        <h2>How was your stay?</h2>
                    </div>

                    <p>{errors.review}</p>
                    <input
                        type='text'
                        placeholder='Leave your review here!'
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />
                    <div className='star-backdrop'>
                        <button
                            onClick={(e) => starClicker(e, 1)}
                        >
                            <FaStar className={stars >= 1 ? 'fill-star' : 'empty-star'} />
                        </button>
                        <button
                            onClick={(e) => starClicker(e, 2)}
                        >
                            <FaStar className={stars >= 2 ? 'fill-star' : 'empty-star'} />
                        </button>
                        <button
                            onClick={(e) => starClicker(e, 3)}
                        >
                            <FaStar className={stars >= 3 ? 'fill-star' : 'empty-star'} />
                        </button>
                        <button
                            onClick={(e) => starClicker(e, 4)}
                        >
                            <FaStar className={stars >= 4 ? 'fill-star' : 'empty-star'} />
                        </button>
                        <button
                            onClick={(e) => starClicker(e, 5)}
                        >
                            <FaStar className={stars >= 5 ? 'fill-star' : 'empty-star'} />
                        </button>
                    </div>
                    <h1>{stars}</h1>
                    <p>{errors.stars}</p>
                    <button
                        type="submit"
                        disabled={Object.values(errors).length ? true : false}
                    >Submit Review</button>
                </form>



            </div>
        </>

    )

}
export default SubReview;