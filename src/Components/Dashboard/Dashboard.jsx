import { useContext, useMemo, useState} from 'react';
import { APIContext } from '../../Context/APIContext';
import Pagination from '../Pagination/Pagination';
import './Dashboard.css';
import { searchItem } from '../../Utils/TableModification.utils';
import TableView from '../TableView/TableView';
import { PAGINATION_CONSTANTS } from '../../Data/Constants/Constants';
const Dashboard = () => {

//getting API data
const {data}=useContext(APIContext);


//determining each page size and current page no.
const {FIRST_PAGE,PAGE_SIZE}=PAGINATION_CONSTANTS
const pageSize=10;
const [currentPage,setCurrentPage]=useState(FIRST_PAGE);


//To store and update searched data
const [searchData,setSearchData]=useState([]);


//Getting required number of rows for each page
const currentTableData=useMemo(()=>{
  const firstPageIndex=(currentPage-1)*PAGE_SIZE;
  const lastPageIndex=firstPageIndex+PAGE_SIZE;
  if(searchData.length>0) return searchData.slice(firstPageIndex,lastPageIndex);
  return data.slice(firstPageIndex,lastPageIndex);
},[currentPage,searchData,data,PAGE_SIZE])


//Handling Change on searching
const handleChange=(event)=>{
  const searchTerm=event.target.value;
  if(searchTerm.length){
    const searchedRows=searchItem(data,searchTerm);
    setSearchData(searchedRows);
  }
  else{
    setSearchData([]);
  }
  searchData.length? setCurrentPage(FIRST_PAGE):setCurrentPage(currentPage);

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
        totalCount={searchData.length?searchData.length:data.length}
        currentPage={currentPage}
      />
    </div>
     
    </>
    
  )
}

export default Dashboard