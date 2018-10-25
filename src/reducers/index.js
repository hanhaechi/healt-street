import { combineReducers } from 'redux';
import FamiliesList from './reducer_families';

const rootReducer = combineReducers({
 families: FamiliesList,
});

export default rootReducer;
