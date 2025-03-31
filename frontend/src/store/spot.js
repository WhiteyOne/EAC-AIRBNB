//----IMPORTS----


import { csrfFetch } from "./csrf"


//----Action Types----
const SET_SPOT_DATA = "spot/all"
const SET_SPOT_DETAILS = "spots/details"
const DELETE_A_SPOT = "spot/spotId"

//----Action Creator----
const getAllSpotsAction = (spots) => {
    return {
        type: SET_SPOT_DATA,
        payload: spots
    }
}

const getSpotDetailAction = (spot) => {
    return {
        type: SET_SPOT_DETAILS,
        payload: spot
    }
}

const deleteSpotAction = (spot) => {
    return {
        type:DELETE_A_SPOT,
        payload: spot
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

export const getSpotById = (spotId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/spots/${spotId}`)
        
        if(res.ok){
            const data = await res.json()
            console.log(data)
            dispatch(getSpotDetailAction(data))
        }else {
            throw res
        }
    } catch (error) {
        console.log(res)
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
export const deleteSpotThunk = (spotId) => async (dispatch)=>{
    try {
        const options = {
         method: "DELETE"
        }
       const res = await csrfFetch(`/api/spots/${spotId}`,options);
       if(res.ok){
        const data = await res.json();
        
        dispatch(deleteSpotAction(data))
        
        return data
       }
    } catch (error) {
        return error
    }
}

//---- REDUCERS ----
const initialState = { allSpots: [], byId: {} }
const spotsReducer = (state = initialState, action)=>{
    let newState;
    switch (action.type) {

        // this is all my spots across DB
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
//This is my specific spot
            case SET_SPOT_DETAILS:
                const spot = action.payload
                newState = {...state}
                let newCurrentSpotId = {}
                for(let obj of spot){
                    newCurrentSpotId[obj.id] = obj
                }
                newState.byId = newCurrentSpotId
                console.log("here")
                
                return newState
// This is all my spots after I deleted the data
        case DELETE_A_SPOT:
            newState = {...state};

            let deleteSpot = action.payload;

            let newByIdDelete = {...newState.byId}

            delete newByIdDelete[deleteSpot.id];
            
            newState.byId = newByIdDelete;

            const filteredAllSpots = newState.allSpots.filter(filteredSpot=>{
                return filteredSpot.id !== deleteSpot.id
            })

            newState.allSpots= filteredAllSpots;

            return newState
        default:
            return state;
    }

}
export default spotsReducer;