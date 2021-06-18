const initialState = {historicResearch: []};

function manageHistoric(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case 'ADD_TO_HISTORIC':
            // verifier si le nom de la ville est dans l'historique
            const cityNameId = state.historicResearch.findIndex(item => item === action);
            if (cityNameId === -1) {
                // le nom de la ville n est pas dans l historique, il faut l ajout
                nextState = {
                    ...state,
                    historicResearch: [...state.historicResearch, action],
                };
            }
            return nextState || state;
        default:
            return state;
    }
}

export default manageHistoric;