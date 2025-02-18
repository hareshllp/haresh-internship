import { SagaReturnType, call, put, takeEvery } from 'redux-saga/effects'
import { getAllSessions } from '../services/user.service'


const getSessions = async (limit: number, skip: number) => {
  try {
    const res = await getAllSessions(limit, skip);    
    return res;
  } catch (error:any) {
     const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
    //code of error
  }
}


type allSessionsType = SagaReturnType<typeof getSessions>;


// worker Saga: will be fired on SESSIONS_FETCH_REQUESTED actions
function* fetchSessions(action:any) {
  try {
    let sessions: allSessionsType = yield call(getSessions,action.payload.limit,action.payload.skip);
    yield put({ type: "SESSIONS_FETCH_SUCCEEDED", sessions });
  } catch (error:any) {
    yield put({ type: "SESSIONS_FETCH_FAILED", message: error.message });
  }
}

/*
  Starts fetchUser on each dispatched `SESSIONS_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
  yield takeEvery("SESSIONS_FETCH_REQUESTED", fetchSessions);
}


export default mySaga;