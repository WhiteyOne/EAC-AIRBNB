//----IMPORTS----

import { csrfFetch } from "./csrf"


//----Action Types----
const SET_SPOT_DATA = "spot/all"


//----Action Creator----
const getAllSpotsAction = (spots) => {
    return {
        type:SET_SPOT_DATA,
        payload: spots
    }
}
    
    

//----Thunks----

export const getAllSpotsThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch("/api/spots/")

        if(res.ok){
            
            const data = await res.json()
            console.log(data, "this is my data")
            dispatch(getAllSpotsAction(data))
            
        }else{
            throw res
        }
        
    } catch (error) {
        return error
    }
}

//---- REDUCERS ----
const initialState = {allSpots:[],byId:{}}
function spotsReducer(state = initialState, action){
    let newState
    switch(action.type){
        case SET_SPOT_DATA:
            newState = {...state}
            const spotsArray = action.payload.Spots;
            const newById = {...newState.byId};//this is for byId
            for(let spot of spotsArray){
                newState.byId[spot.id] = spot;
            }
            newState.byId = newById; // this is for all spots
            newState.allSpots = spotsArray; 
            console.log(action.payload, "action pay")
            return newState;
        default:
            return state;
    }

}
export default spotsReducer;