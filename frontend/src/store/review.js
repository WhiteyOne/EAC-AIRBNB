// //----IMPORTS----


import { csrfFetch } from "./csrf"


// //----Action Types----
const GET_PER_REVIEW = "review/byId"
const DELETE_PER_REVIEW = "delete/review"

//---Actions Creator---
const getReviewsAction = (reviews) => {
    return {
        type: GET_PER_REVIEW,
        payload: reviews
    }
}
const deleteReviewAction = (review) => {
    return {
        type: DELETE_PER_REVIEW,
    }
}
//--Thunk--

export const getReviewsForSpotThunk = (userId) => async (dispatch) => {
    try {

        const res = await csrfFetch(`/api/spots/${userId}/reviews/`)

        if (res.ok) {
            const data = await res.json()

            dispatch(getReviewsAction(data))
        } else {
            throw res
        }
    } catch (error) {
        console.log(error)
    }
}

export const createReviewThunk = (newReview) => async (dispatch) => {
    try {
        const {review,stars,spotId} = newReview
        
        console.log(review, "--- this is inside my thunk")
        console.log(typeof stars, "--- this is inside my thunk")
        console.log(spotId, "--- this is inside my thunk")

        const options = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({review,stars})
        }
        const res = await csrfFetch(`/api/spots/${spotId}/reviews/`, options)
        if (res.ok) {
            const data = await res.json();
            dispatch(getReviewsAction(data))
            return data
        }
    } catch (error) {
        console.log(error)
    }
}

const initialState = { allCurrentReviews: {}, reviewsBySpotId: [], reviewsByCurrentId: [] }
const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_PER_REVIEW:
            const reviewsArray = action.payload.Reviews
            newState = { ...state }
            newState.allCurrentReviews = reviewsArray
            let newReviewsBySpotId = {}
            let newReviewsByCurrentId = {}
            for (let review of reviewsArray) {
                newReviewsBySpotId[review.userId] = review
                newReviewsByCurrentId[review] = review
            }
            newState.reviewsBySpotId = newReviewsBySpotId
            newState.reviewsByCurrentId = newReviewsByCurrentId
            return newState;

        default:
            return state
    }
}

export default reviewReducer;