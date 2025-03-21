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
        // change the price into a number for the backend
        newSpot.price = parseInt(newSpot.price);
        
        newSpot.lat = Number(newSpot.lat);
        newSpot.lng = Number(newSpot.lng);
        // option for the csrfFetch
        const options = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newSpot)
        }

        const res = await csrfFetch('/api/spots/', options); // <-- pass in options. cleaner to debug
        if(res.ok){

            const data = await res.json();
            dispatch(getAllSpotsAction(data))
            return data; //<-- return data, not res. This lets us see the id in the component
        } else{
            throw res
        }

    } catch (errResponse) {
        return errResponse;
    }
}

export const updateSpotThunk = (newSpot,spotId) => async (dispatch) => {
    try {
        // change the price into a number for the backend
        newSpot.price = parseInt(newSpot.price);
        console.log("hello from the thunk side")
        newSpot.lat = Number(newSpot.lat);
        newSpot.lng = Number(newSpot.lng);
        // option for the csrfFetch
        const options = {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newSpot)
        }

        const res = await csrfFetch(`/api/spots/${spotId}`, options); // <-- pass in options. cleaner to debug
        if(res.ok){

            const data = await res.json();
            dispatch(getAllSpotsAction(data))
            return data; //<-- return data, not res. This lets us see the id in the component
        } else{
            throw res
        }

    } catch (errResponse) {
        return errResponse;
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