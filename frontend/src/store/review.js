// //----IMPORTS----


// import { csrfFetch } from "./csrf"


// //----Action Types----
// const GET_PER_REVIEW = "review/byId"

// //---Actions Creator---
// const getReviewsAction = (reviews) => {
//     return {
//         type: GET_PER_REVIEW,
//         payload: reviews
//     }
// }
// //--Thunk--

// export const getReviewsForSpotThunk = () => async (dispatch, userId) => {
//     try {
//         console.log(3)
//         const res = await csrfFetch(`/api/reviews/${userId}/reviews/`)

//         if (res.ok) {
//             const data = await res.json()
//             dispatch(getAllReviewsAction(data))
//             console.log(4)
//         } else {
//             throw res
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

// const initialState = { reviewsBySpotId: [], reviewsByCurrentId: [] }
// const reviewReducer = (state = initialState, action) => {
//     let newState;
//     switch(action.type){
//         case GET_PER_REVIEW:
//             const 
//     }
// }
