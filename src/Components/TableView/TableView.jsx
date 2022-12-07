import React,{ useState, useContext} from 'react'
import './TableView.css';
import edit from '../../Assets/edit.svg';
import deleteData from '../../Assets/recycle-bin.svg';
import EditableRow from '../EditableRow/EditableRow';
import { APIContext } from '../../Context/APIContext';
import { itemRemoval,multipleItemRemoval,checkboxHandle } from '../../Utils/TableModification.utils';

const TableView = ({tableData}) => {

//Getting API Data
const {data,setData}=useContext(APIContext);

//Toggling Header check
const [allCheck,setAllCheck]=useState(false);



//Single query delete
const deleteSingle=(id)=>{
    const removedItemArray=itemRemoval(data,id);
    setData(removedItemArray);
    
}

//Handling data after editing
const handleEdit=(id)=>{
    let editUpdate=data.map(info=>{
        if(info.id===id){
            info.edit=true;
            return info;
        }
        return info;
    });
    setData(editUpdate);
}


//Handling checkbox
const handleCheck=(id)=>{
    if(id===-1){
        tableData.map(row=>checkboxHandle(data,row.id))
    }
       else{
        const checkboxUpdated=checkboxHandle(data,id);
        setData(checkboxUpdated);
       } 
}
 

//Handling checkbox with header checkbox toggle
const handleAllCheck=()=>{
    setAllCheck(!allCheck);
     handleCheck(-1);
}


//Handling changes on delete button clicking
const deleteBtnHandler=()=>{
    const dataAfterDeletion=multipleItemRemoval(data);
    setData(dataAfterDeletion);
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
                onChange={handleAllCheck}
                checked={allCheck}
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
        
    tableData.map((info,index)=>
    <tr key={index} 
        style={{
            backgroundColor: tableData[index].selected ? 'gainsboro' : ''
            }}
    >
        {
            tableData[index].edit ? <EditableRow empId={info.id}/>:
            <>
        <td>
            <input type="checkbox" 
           className='check-box'
            onChange={()=>handleCheck(info.id)}
            checked={info.selected}/>
        </td>
        <td>{info.name}</td>
        <td>{info.email}</td>
        <td>{info.role}</td>
        <td>
            <div className='icon-placing'>
            <img src={edit} alt="edit" className='icons' onClick={()=>handleEdit(info.id)}/>
            <img src={deleteData} alt="delete" className='icons' 
                onClick={()=>deleteSingle(info.id)}/>
            </div>
           
        </td>
            </>
            
        }
       
        </tr>)
   }
       
    </tbody>
    
   </table>
</div>


    </>
    
  )
}

export default TableView