

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllSessions, deleteActiveSession, getAllSessionsWithSorting } from "../../services/user.service";
import { toast } from 'react-toastify';

import { RECORDS_PER_PAGES } from '../../constants';
import { calculatePagesCount } from '../../helpers';

export interface sessionTypes {
  id: string,
  accessToken: string,
  adminUserId: string,
  loginAt: string,
  status: string,
  geoIpCountry: string,
  ipAddress: string,
  userAgent: string,
  createdAt: string,
  expireAt: string

}

// Sessions List
export const allSessionsList = createAsyncThunk(
  'sessions/all',
  async (page: number) => {
    console.log('thunk called');

    const limit = RECORDS_PER_PAGES;
    const skip = (page - 1) * limit;

    return await getAllSessions(limit, skip).then(
      res => {
        return { ...res.data, "page": page };
      }
    );
  }
);

// Delete current active admin session
export const closeSession = createAsyncThunk(
  'session/close',
  async (sessionParams: { sessionId: string }) => {
    console.log('thunk called');

    return await deleteActiveSession(sessionParams.sessionId).then(
      res => {
        return { ...res.data, "sessionId": sessionParams.sessionId };
      },
      error => {
        return error;
      }
    );
  }
);


// Sessions List
export const allSessionsListWithSorting = createAsyncThunk(
  'sessions/all/sorting',
  async ( sortingParams:{page: number,sortObjArr:{field:string,direction:string}[]}) => {
    console.log('thunk called');

    const limit = RECORDS_PER_PAGES;
    const skip = (sortingParams.page - 1) * limit;

    return await getAllSessionsWithSorting(sortingParams.page,sortingParams.sortObjArr).then(
      res => {
        return { ...res.data, "page": sortingParams.page };
      }
    );
  }
);



type initialStateType = {
  entries: sessionTypes[],
  loading: boolean,

  closeButton: {
    loading: boolean,
    sessionId: string
  },
  pagination: {
    totalPages: number,
    isPaginationReady: boolean
  }
}

let initialState: initialStateType = {
  entries: [],
  loading: false,
  closeButton: {
    loading: false,
    sessionId: ""
  },
  pagination: {
    totalPages: 0,
    isPaginationReady: false,
  }
}

export const sessionsSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {
    // pageUp: state => {
    //   if(state.page !== 0){
    //     state.page = state.page + 1;  
    //   }  
    // },
    // pageDown: state => {
    //   if(state.page !== 1){
    //     state.page = state.page - 1;  
    //   }  
    // },
  },
  extraReducers: (builder) => {

    /**** List all sessions without sorting  *****/ 
    builder.addCase(
      allSessionsList.pending,
      (state, action) => {
        state.loading = true;
      })
      .addCase(
        allSessionsList.fulfilled,
        (state, action) => {

          console.log('reducer fulfilled');
          state.loading = false;
          // state.pagination.currentPage = action.payload.page; 

          state.entries = [];
          action.payload.list.map((entry: sessionTypes) => {
            if (!state.entries.some(ent => ent.id === entry.id)) {
              state.entries.push(entry);
            }
          });

          console.log(action.payload);
          let numOfPages = calculatePagesCount(RECORDS_PER_PAGES, action.payload.total);
          state.pagination.totalPages = numOfPages;
          state.pagination.isPaginationReady = true;
        })
      .addCase(
        allSessionsList.rejected,
        (state, action) => {
          state.loading = false;
          console.log('reducer have error');
          console.log(action.payload);
        });


    builder.addCase(
      closeSession.pending,
      (state, action) => {

        state.closeButton.loading = true;
        state.closeButton.sessionId = action.meta.arg.sessionId;
      })
      .addCase(
        closeSession.fulfilled,
        (state, action) => {
          console.log(action.payload);
          state.closeButton.loading = false;
          toast(action.payload.message);
          //state.closeButton.sessionId = action.payload.sessionId; 
        })
      .addCase(
        closeSession.rejected,
        (state, action) => {
          state.closeButton.loading = false;
          console.log(action.payload);
          toast(action.error.message);
        });




        /**** List all sessions with sorting  *****/ 
      builder.addCase(
      allSessionsListWithSorting.pending,
      (state, action) => {
        state.loading = true;
      })
      .addCase(
        allSessionsListWithSorting.fulfilled,
        (state, action) => {

          console.log('reducer fulfilled');
          state.loading = false;
          // state.pagination.currentPage = action.payload.page; 

          state.entries = [];
          action.payload.list.map((entry: sessionTypes) => {
            if (!state.entries.some(ent => ent.id === entry.id)) {
              state.entries.push(entry);
            }
          });

          console.log(action.payload);
          let numOfPages = calculatePagesCount(RECORDS_PER_PAGES, action.payload.total);
          state.pagination.totalPages = numOfPages;
          state.pagination.isPaginationReady = true;
        })
      .addCase(
        allSessionsListWithSorting.rejected,
        (state, action) => {
          state.loading = false;
          console.log('reducer have error');
          console.log(action.payload);
        });



  },

});

// export const { pageUp, pageDown } = sessionsSlice.actions;

export default sessionsSlice.reducer







