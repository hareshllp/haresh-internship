import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { timeSince } from 'helpers';

import Layout from "components/layout";
import Pagination from '../components/pagination/StatePagination';

import { RootState, store } from '../redux/store';
import { allSessionsList, closeSession, allSessionsListWithSorting } from '../redux/slices/sessions.slice';
import { sessionTypes } from '../redux/slices/sessions.slice';

import { deleteAllSessions } from "services/user.service";
import { toast } from "react-toastify";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDesc, faSortAsc } from "@fortawesome/free-solid-svg-icons";

export type AppDispatch = typeof store.dispatch;


const Items = (props: { rows: sessionTypes[]; handleCloseSession: (itemId: string, accessToken: string) => void }): JSX.Element => {
  const { rows, handleCloseSession } = props;
  return <>
    {rows.map((item: sessionTypes) =>
      <tr key={item.id}>
        <td>{item.geoIpCountry}</td>
        <td>{item.userAgent.substring(0, 50)}</td>
        <td>{item.ipAddress}</td>
        <td>{timeSince(item.createdAt)} </td>
        <td>{item.status === 'CURRENT' &&
          <>
            <span className="badge badge-success">Active</span>
            &nbsp;
            <button className="btn btn-sm btn-danger" onClick={() => handleCloseSession(item.id, item.accessToken)}>
              {store.getState().sessions.closeButton.loading &&
                store.getState().sessions.closeButton.sessionId === item.id &&
                <span className="spinner-border spinner-border-sm"></span>}  Logout
            </button>
          </>}
          {item.status !== 'CURRENT' && <span className="badge badge-danger">Closed</span>}
        </td>
      </tr>
    )}
  </>;

}

type Props = {

}

type SortingTypes = {
  isLocationSorted: boolean,
  isDeviceSorted: boolean,
  isIpSorted: boolean,
  isTimeSorted: boolean,
  isStatusSorted: boolean,
}

const getSortingDirection = (fieldName: string, sortData: { field: string, direction: string }[]) => {
  let Direction = "";
  sortData.forEach(sortObj => {
    if (sortObj.field === fieldName) {
      Direction = sortObj.direction;
      return false;
    }
  });
  return Direction;
}

const sortingFlagsDefault = {
  isLocationSorted: false,
  isDeviceSorted: false,
  isIpSorted: false,
  isTimeSorted: false,
  isStatusSorted: false,
}

const Sessions = (props: Props) => {


  const dispatch = useDispatch<AppDispatch>();
  const { entries: rows, loading, pagination } = useSelector((state: RootState) => state.sessions);

  const [currentPage, setCurrentPage] = useState(1);
  const [removingSessions, setRemovingSessions] = useState<boolean>(false);

  const [sorting, setSorting] = useState<{ field: string, direction: string }[]>([]);
  const [sortingFlags, setSortingFlags] = useState<SortingTypes>(sortingFlagsDefault);
  const [tableTrigger, setTableTrigger] = useState<boolean>(false);

  useEffect(() => {

   
    if (sorting.length === 0) {
      dispatch(allSessionsList(currentPage));
    }else{
      dispatch(allSessionsListWithSorting({page:currentPage,sortObjArr:sorting}));  
    }

    console.log("sorting Obj");
    console.log(sorting);
    //console.log(sortingFlags);
    
    return () => {
      
      // setSorting([]);
      // setSortingFlags(sortingFlagsDefault);
    }

  }, [currentPage,tableTrigger]);


 


  // const handlePageDown = (event: React.MouseEvent) => {
  //   event.preventDefault();
  //   dispatch(pageDown());
  // }

  const handleCloseSession = (sessionId: string, accessToken: string) => {
    let sessionParams = {
      sessionId,
      accessToken
    }
    dispatch(closeSession(sessionParams));
    setTableTrigger(current => !current);
  }

  const handleCloseAllSessions = () => {
    setRemovingSessions(true);
    deleteAllSessions().then(
      res => {
        setRemovingSessions(false);
        toast("All Sessions Closed Successfully");
        setTableTrigger(current => !current);
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setRemovingSessions(false);
        toast(resMessage);
      }
    );
  }

  const handleColumnSorting = (event:React.MouseEvent, fieldName:string) => {
    event.preventDefault();
  
    let currentSorting = getSortingDirection(fieldName, sorting); 
    console.log('current sorting');
    console.log(currentSorting);
    let newSorting = "asc";
    if(currentSorting === "desc"){
      newSorting = "asc";  
    }
    if(currentSorting === "asc"){
      newSorting = "desc";  
    } 

    if(sorting.length  === 0) {
      sorting.push({field:fieldName,direction:newSorting});  
    }else{
      sorting.map((sortElem,index) => {
        if(index === 0){
          sortElem.field = fieldName;  
          sortElem.direction = newSorting; 
        }  
      });
    }
    setSorting(sorting);  

    // if(fieldName === 'geoIpCountry'){
    //   setSortingFlags({
    //     ...sortingFlagsDefault,
    //     [v]: true,
    //   });  
    // }

    if(fieldName === 'geoIpCountry'){
      setSortingFlags({
        ...sortingFlagsDefault,
        isLocationSorted: true,
      });  
    }

    if(fieldName === 'ipAddress'){
      setSortingFlags({
        ...sortingFlagsDefault,
        isIpSorted: true
      });  
    }
    


    // if(sorting.some((elem) => elem.field === fieldName)){
    //   sorting.map((sortElem) => {
    //     if(sortElem.field === fieldName){
    //       sortElem.direction = newSorting  
    //     }  
    //   });
    // }else{
    //   sorting.push({field:fieldName,direction:newSorting});
    // }
    
    dispatch(allSessionsListWithSorting({page:currentPage,sortObjArr:sorting}));
    setTableTrigger(current => !current);
  
  };


  return (

    <Layout>
      <>
        {!pagination.isPaginationReady && <span className="spinner-border spinner-border-sm"></span>}
        {pagination.isPaginationReady &&
          <Pagination currentPage={currentPage} lastPage={pagination.totalPages} maxLength={7} setCurrentPage={setCurrentPage} />
        }

        <button className="btn btn-warning close-all-sessions-btn" onClick={handleCloseAllSessions} disabled={true}>
          {removingSessions && <span className="spinner-border spinner-border-sm"></span>}  Close All Sessions
        </button>

        {loading && <span className="spinner-border spinner-border-sm"></span>}
        {!loading &&

          <table className="table sessions-list-table">
            <thead>
              <tr>
                <th style={{ width: "120px" }} >
                  <a href="#" onClick={event => handleColumnSorting(event, 'geoIpCountry')} >Location </a>
                  {sortingFlags.isLocationSorted &&
                    (getSortingDirection('geoIpCountry', sorting) === 'asc' ? <FontAwesomeIcon icon={faSortAsc} /> : <FontAwesomeIcon icon={faSortDesc} />)
                  }
                </th>
                <th style={{ width: "450px" }}>
                  Device
                </th>
                <th style={{ width: "150px" }}>
                  <a href="#" onClick={event => handleColumnSorting(event, 'ipAddress')} > IP Address </a>
                  {sortingFlags.isIpSorted &&
                    (getSortingDirection('ipAddress', sorting) === 'asc' ? <FontAwesomeIcon icon={faSortAsc} /> : <FontAwesomeIcon icon={faSortDesc} />)
                  }
                </th>
                <th style={{ width: "150px" }}>Time</th>
                <th style={{ width: "350px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {
                rows.length > 0 ? <Items {...{
                  rows,
                  handleCloseSession
                }} /> : <></>
              }
            </tbody>
          </table>

        }</>
    </Layout>
  );

}

export default Sessions;