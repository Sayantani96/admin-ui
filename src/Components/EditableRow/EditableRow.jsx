import React from 'react'
import './EditableRow.css';
import save from '../../Assets/save.svg';
import cancel from '../../Assets/cancel.svg';
import { useContext } from 'react';
import { APIContext } from '../../Context/APIContext';
import {saveItem,cancelUpdate} from '../../Utils/TableModification.utils';

const EditableRow = ({empId}) => {

  const {data,setData}=useContext(APIContext);
  let nameUpdate='';
  let mailUpdate='';
  let roleUpdate='';

  const updateName=(event)=>{
      nameUpdate=event.target.value;
  }

  const updateMail=(event)=>{
    mailUpdate=event.target.value;
}

const updateRole=(event)=>{
  roleUpdate=event.target.value;
}
  const saveUpdate=()=>{
      const updateSave=saveItem(data,empId,nameUpdate,mailUpdate,roleUpdate);
      setData(updateSave);
  }

  const updateCancel=()=>{
    const dataUpdate=cancelUpdate(data,empId);
    setData(dataUpdate);
  }
  return (
    <>
        <td></td>
        <td>
        <input type="text" placeholder='Enter full name...' 
              onChange={updateName} className='edit-check'/>
        </td>
        <td>
        <input type="email" placeholder='Enter the mail id...' 
                onChange={updateMail} className='edit-check'/>
        </td>
        <td>
        <input type="text" placeholder='Enter the role...' 
                onChange={updateRole} className='edit-check'/>
        </td>
        <td>
            <img src={save} alt="save" className='edit-icons' onClick={saveUpdate}/>
            <img src={cancel} alt="cancel" className='edit-icons' onClick={updateCancel}/>
        </td>
    </>
        
  )
}

export default EditableRow