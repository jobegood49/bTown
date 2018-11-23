import { combineReducers } from 'redux';
import shareItemPreviewReducer from './modules/ShareItemPreview';

export default combineReducers({
    shareItemPreview: shareItemPreviewReducer 
})