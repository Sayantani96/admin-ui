import React,{ useState,useMemo} from 'react'
import './Dashboard.css';
import edit from '../Assets/edit.svg';
import deleteData from '../Assets/recycle-bin.svg';
import EditableRow from '../EditableRow/EditableRow';
import Pagination from '../Pagination/Pagination';


const Dashboard = ({searchData,updating}) => {


const pageSize=10;
const [currentPage,setCurrentPage]=useState(1);
const[tableUpdateToggle,setTableUpdateToggle]=useState(false);
const [allCheck,setAllCheck]=useState(false);


const currentTableData=useMemo(()=>{

    const firstPageIndex=(currentPage-1)*pageSize;
    const lastPageIndex=firstPageIndex+pageSize;
    if(tableUpdateToggle){
        return searchData.slice(firstPageIndex,lastPageIndex);
    }
    return searchData.slice(firstPageIndex,lastPageIndex);
},[currentPage,searchData,tableUpdateToggle])


const handleDelete=(idArr)=>{
    idArr.forEach(id=>{
       searchData.map((info,index)=>{
        if(info.id===id){
            searchData.splice(index,1);
            setTableUpdateToggle(!tableUpdateToggle);
        }
        return '';
       })

    });
    
    
}

const deleteSingle=(id)=>{
    searchData.map((info,index)=>{
        if(info.id===id){
            searchData.splice(index,1);
            setTableUpdateToggle(!tableUpdateToggle);
        }
        return '';
       })
}

const handleEdit=(id)=>{
    let editUpdate=searchData.map(info=>{
        if(info.id===id){
            info.edit=true;
            return info;
        }
        return info;
    });
    updating(editUpdate);
}

const handleCheck=(id)=>{
    if(id===-1){
        setAllCheck(!allCheck);
        const firstPageIndex=(currentPage-1)*pageSize;
        const lastPageIndex=firstPageIndex+pageSize;
        const updateCheck=searchData.map((info,index)=>{
            if(index>=firstPageIndex || index<lastPageIndex){
                if(allCheck===false){
                    info.selected=true;
                    return info;
                }
                if(allCheck===true){
                    info.selected=false;
                    return info;
                }
                
            }
            return info;
        });
        updating(updateCheck);
    }
    else{
        const updateCheck=searchData.map(info=>{
            if(info.id===id) info.selected=!info.selected
            return info;
        });
        console.log(updateCheck);
        updating(updateCheck);
    }
    
}
 

const deleteBtnHandler=()=>{
    let deleteRowIds=[];
    for(let i=0;i<currentTableData.length;i++){
        if(currentTableData[i].selected===true){
            deleteRowIds.push(currentTableData[i].id);
        }

    }
    handleDelete(deleteRowIds);
    const uncheckRows=searchData.map(info=>{
        if(info.selected===true){
            info.selected=false;
            return info;
        }
        return info;
    })
    updating(uncheckRows);
    setAllCheck(false);
}

  return (
    <>
    
<div>
<div>
    <button className='delete-btn' onClick={deleteBtnHandler}>Delete Selected</button>
   </div>
    <table>
        <thead>
            <tr>
                <th>
                <input type="checkbox" 
                checked={allCheck} 
                onChange={()=>handleCheck(-1)}
                className="check-box"/>  
                </th>
                <th>
                    Name
                </th>
                <th>
                    Email
                </th>
                <th>
                    Role
                </th>
                <th>
                    Actions
                </th>
            </tr>
        </thead>


    <tbody>     
    {
        
    currentTableData.map((info,index)=>
    <tr key={index} 
        style={{
            backgroundColor: currentTableData[index].selected ? 'gainsboro' : ''
            }}
    >
        {
            currentTableData[index].edit ? <EditableRow empId={currentTableData[index].id}/>:
            <>
        <td>
            <input type="checkbox" 
           className='check-box'
            onChange={()=>handleCheck(currentTableData[index].id)}
            checked={currentTableData[index].selected}/>
        </td>
        <td>{info.name}</td>
        <td>{info.email}</td>
        <td>{info.role}</td>
        <td>
            <div className='icon-placing'>
            <img src={edit} alt="edit" className='icons' onClick={()=>handleEdit(currentTableData[index].id)}/>
            <img src={deleteData} alt="delete" className='icons' 
                onClick={()=>deleteSingle(currentTableData[index].id)}/>
            </div>
           
        </td>
            </>
            
        }
       
        </tr>)
   }
       
    </tbody>
    
   </table>
</div>
<div  className="pagination-bar">
<Pagination
    onPageChange={page=>setCurrentPage(page)}
    pageSize={pageSize}
    totalCount={searchData.length}
    currentPage={currentPage}
/>
</div>

    </>
    
  )
}

export default Dashboard