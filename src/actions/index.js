import axios from 'axios';

const URL = 'https://app2.health-street.net/api/v1/services/query/family?key=MjIxNzI4RjQtM0RFRi00RjAzLUFGNzYtNEQ5NTRFNTJGMEY2&phylum=2';

export const FETCH_FAMILIES = 'FETCH_FAMILIES';

export function fetchFamilies() {
    const request = axios.get(URL);
    console.log(request);
    return {
        type: FETCH_FAMILIES,
        payload: request,
    }
}