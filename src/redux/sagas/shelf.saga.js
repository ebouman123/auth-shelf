import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchShelf() {
    try{
        const shelfResponse = yield axios.get('/api/shelf');
        yield put({type: 'SET_SHELF', payload: shelfResponse.data})
    }
    
    catch (error){
        console.log('Shelf saga get request error', error)
    }
}

function* addItem(action){
    try {
        yield axios.post('/api/shelf', action.payload)
        yield put({type: 'FETCH_SHELF'})
    } catch (error) {
        console.error('Error with addItem', error)
    }
}

function* deleteItem(action){
    try {
        yield axios.delete(`/api/shelf/${action.payload.id}/${action.payload.user_id}`)
        yield put({type: 'FETCH_SHELF'})
    } catch (error) {
        console.error('Error Deleting Item Saga', error)
    }
}

function* shelfSaga(){
    yield takeLatest('FETCH_SHELF', fetchShelf)
    yield takeLatest('ADD_ITEM', addItem)
    yield takeLatest('DELETE_ITEM', deleteItem)
}


export default shelfSaga