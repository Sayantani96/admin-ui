
import { useContext,useState} from 'react';
import { APIContext } from '../Context/APIContext';
import Dashboard from '../Dashboard/Dashboard';
import './Search.css';
const DebounceSearch = () => {
const [searchData,setSearchData]=useState([]);
const {data,setData}=useContext(APIContext);



const handleChange=(event)=>{
  const searchTerm=event.target.value.toLowerCase();
  const information=data.filter((info)=>info.email.toLowerCase().includes(searchTerm)||
  info.name.toLowerCase().includes(searchTerm)||info.role.toLowerCase().includes(searchTerm));

  setSearchData(information);
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
    {
      searchData.length>0? <Dashboard searchData={searchData} updating={setSearchData}/>:
                          <Dashboard searchData={data} updating={setData}/>
    }
    </>
    
  )
}

export default DebounceSearch