//checkbox function
export const checkboxHandle=(data,id)=>{
    const itemRequireCheckToggle=data.find(info=>info.id===id);
    return data.map(info=>{
        if(info===itemRequireCheckToggle){
            info.selected=!info.selected;
            return info;
        }
        return info;
    })
}

//remove
export const itemRemoval=(data,id)=>{
    const itemToRemove=data.find(info=>info.id===id);
    return data.filter(info=>info!==itemToRemove);
}

//remove multiple
export const multipleItemRemoval=(data)=>{
    return data.filter(info=>info.selected===false);
}

//save
export const saveItem=(data,id,name,email,role)=>{
    return data.map(info=>{
        if(info.id===id){
            info.name=name.length>0?name:info.name;
            info.email=email.length>0?email:info.email;
            info.role=role.length>0?role:info.role;
            info.edit=false;
            return info;
        }
        return info;
    });
}

//cancel
export const cancelUpdate=(data,id)=>{
    return data.map(info=>{
        if(info.id===id){
            info.edit=false;
            return info;
        }
        return info;
    })
}
//search
export const searchItem=(data,searchTerm)=>{
    searchTerm=searchTerm.toLowerCase();
    return data.filter(info=>info.name.toLowerCase().includes(searchTerm) || 
                      info.email.toLowerCase().includes(searchTerm) || 
                      info.role.toLowerCase().includes(searchTerm))
}

