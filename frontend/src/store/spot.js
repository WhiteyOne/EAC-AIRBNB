//----IMPORTS----


import { csrfFetch } from "./csrf"


//----Action Types----
const SET_SPOT_DATA = "spot/all"


//----Action Creator----
const getAllSpotsAction = (spots) => {
    return {
        type: SET_SPOT_DATA,
        payload: spots
    }
}



//----Thunks----

export const getAllSpotsThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch("/api/spots/")

        if (res.ok) {

            const data = await res.json()
            dispatch(getAllSpotsAction(data))

        } else {
            throw res
        }

    } catch (e) {
        return e
    }
}
export const createSpotThunk = (newSpot) => async (dispatch) => {
    try {
        console.log("inside the thunk")

        const { userId, country, address, city, state, lat, lng, description, title, price } = newSpot;

        const res = await csrfFetch('http://localhost:8000/api/spots/', {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: JSON.stringify({
                userId,
                country,
                address,
                city,
                state,
                lat,
                lng,
                description,
                title,
                price
            }),

        });
            const data = await res.json();
            dispatch(getAllSpotsAction(data.newSpot))
            console.log("did we do the thing?")
            return res
        
    } catch (error) {
        console.log(error, '-this error')
    }
}

export const updateSpotThunk = (newSpot) => async (dispatch) => {
    try {

        const { userId, country, address, city, state, lat, lng, description, title, price } = newSpot;

        const res = await csrfFetch('http://localhost:8000/api/:spotId/', {
            method: "PUT",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: JSON.stringify({
                country,
                address,
                city,
                state,
                lat,
                lng,
                description,
                title,
                price
            }),

        });
            const data = await res.json();
            dispatch(getAllSpotsAction(data.newSpot))
            console.log("did we do the thing?")
            return res
        
    } catch (error) {
        console.log(error, '-this error')
    }
}

//---- REDUCERS ----
const initialState = { allSpots: [], byId: {} }
const spotsReducer = (state = initialState, action)=>{
    let newState;
    switch (action.type) {
        case SET_SPOT_DATA:
            const spotsArray = action.payload.Spots;
            newState = { ...state }
            newState.allSpots = spotsArray;
            let newByIdGetAllSpots = {}
            for(let spot of spotsArray){
                newByIdGetAllSpots[spot.id] = spot
            }
            newState.byId = newByIdGetAllSpots
            return newState;

        default:
            return state;
    }

}
export default spotsReducer;