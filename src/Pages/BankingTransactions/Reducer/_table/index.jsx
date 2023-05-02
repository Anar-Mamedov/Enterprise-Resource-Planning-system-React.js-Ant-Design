const index = (state, action) => {
    switch (action.type) {
        case "END": {
            return state.map((v) =>
                v.id == action.id ? { ...v, status: !v.status } : v
            );
        }
        case "ADD": {
            return [...state, action.value];
        }
        case "HOMEGOAL": {
            return state.map((v) =>
                v.id == action.id ? { ...v, hometeamscore: v.hometeamscore + 1 } : v
            );
        }
        case "AWAYGOAL": {
            return state.map((v) =>
                v.id == action.id ? { ...v, awayteamscore: v.awayteamscore + 1 } : v
            );
        }
        default: {
            return [...state];
        }
    }
}

export default index