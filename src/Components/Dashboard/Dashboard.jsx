import { useContext, useMemo, useState} from 'react';
import { APIContext } from '../../Context/APIContext';
import Pagination from '../Pagination/Pagination';
import './Dashboard.css';
import { searchItem } from '../../Utils/TableModification.utils';
import TableView from '../TableView/TableView';

const Dashboard = () => {

//getting API data
const {data}=useContext(APIContext);


//determining each page size and current page no.
const pageSize=10;
const [currentPage,setCurrentPage]=useState(1);


//To store and update searched data
const [searchData,setSearchData]=useState([]);


//Getting required number of rows for each page
const currentTableData=useMemo(()=>{
  const firstPageIndex=(currentPage-1)*pageSize;
  const lastPageIndex=firstPageIndex+pageSize;
  if(searchData.length>0)  return searchData.slice(firstPageIndex,lastPageIndex);
  return data.slice(firstPageIndex,lastPageIndex);
},[currentPage,searchData,data])


//Handling Change on searching
const handleChange=(event)=>{
  const searchTerm=event.target.value;
  const searchedRows=searchItem(data,searchTerm);
  setSearchData(searchedRows);
  searchData.length? setCurrentPage(1):setCurrentPage(currentPage);
}

  return (
    <>
  <div className='search-bar'>
        <input 
          placeholder='Search by Name Email or Role...'
          onChange={handleChange}
          className='search-field'
        />
    </div>
    
     <TableView tableData={currentTableData}/>

    <div  className="pagination-bar">
      <Pagination
        onPageChange={page=>setCurrentPage(page)}
        pageSize={pageSize}
        totalCount={data.length}
        currentPage={currentPage}
      />
    </div>
     
    </>
    
  )
}

export default Dashboard