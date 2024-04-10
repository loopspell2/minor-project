
export const getAccessToken = () => {  
    return sessionStorage.getItem('accessToken');
}

export const addElipsis = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + '...' : str;
}

export const getType = (value, body) => {
    if(value.params){
        return {params:body}
    }else if(value.query){
        if(typeof body === 'object'){
            return { query : body._id }
        }else{
            return { query : body }
        }
    }
    return {};
}

// export const getType = (value, body) => {
//     if (!value) {
//         throw new Error('Service configuration is missing.');
//     }

//     if (value.params) {
//         if (typeof body !== 'object') {
//             throw new Error('Request body must be an object for params-based request.');
//         }
//         return { params: body };
//     } else if (value.query) {
//         if (typeof body === 'object') {
//             return { query: body._id || body }; // If _id exists in body, use it, otherwise use the whole body
//         } else {
//             return { query: body };
//         }
//     }

//     return {}; // Default case
// }
