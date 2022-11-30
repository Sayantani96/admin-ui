import React from 'react'
import { DOTS,usePagination } from './usePagination';
import './Pagination.css';

const Pagination = ({
    onPageChange,
    pageSize,
    totalCount,
    currentPage,
    siblingCount=1
}) => {
const paginationRange=usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
});
if(currentPage===0 || paginationRange.length<2){
    return null;
}
const onNext=()=>{
    onPageChange(currentPage+1);
}
const onPrevious=()=>{
    onPageChange(currentPage-1);
}
const lastPage=paginationRange[paginationRange.length-1];
  return (
    <ul className='pagination-container'>
        {
            currentPage!==1 &&
            <li className='pagination-item' onClick={onPrevious}>
            <div className='arrow'>&#8592;</div>
        </li>
        }
        {
            paginationRange.map(pageNumber=>{
                if(pageNumber===DOTS){
                    return <li 
                        className='pagination-item dots' key={pageNumber}>
                            &#8230;
                            </li>
                }
                return(
                    <li className='pagination-item' 
                    onClick={()=>onPageChange(pageNumber)} 
                    key={pageNumber}
                    style={{backgroundColor:currentPage===pageNumber?'tomato':'',
                    color:currentPage===pageNumber?'whitesmoke':''}}
                    >
                        {pageNumber}
                    </li>
                )
            })
        }
        {
            currentPage!==lastPage &&
            <li className='pagination-item' onClick={onNext}>
                <div className='arrow'>&#8594;</div>
            </li>
        }
        
    </ul>
  )
}

export default Pagination