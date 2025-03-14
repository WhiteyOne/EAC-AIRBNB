//----IMPORTS----


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
        const res = await fetch("/api/spots")

        if(res.ok){
            
            const data = await res.json()
            dispatch(getAllSpotsAction(data))
        }else{
            throw res
        }
        return res
        
    } catch (error) {
        console.log(error)
    }
}

//---- REDUCERS ----
const initialState = {allSpots:[],byId:{}}
function spotsReducer(state = initialState, action){
    let newState
    switch(action.type){
        case SET_SPOT_DATA:
            newState = {...state}
            // console.log(action.payload)
            // // for(let spot of action.payload){
                
            // }
            return newState;
        default:
            return newState
    }

}
export default spotsReducer;