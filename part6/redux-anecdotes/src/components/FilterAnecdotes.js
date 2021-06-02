import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { filterAnecdotes } from "../reducers/filterReducer";

const FilterAnecdotes = () => {
    const filter = useSelector(state => state.filterAnecdotes);
    const dispatch = useDispatch();
    const dispatchFilter = e => {
        dispatch(filterAnecdotes(e.target.value));
    };

    return <div>
        <label>
            filter
            <input type='text' value={filter} onChange={dispatchFilter} placeholder='filter' />
        </label>
    </div>;
};

export default FilterAnecdotes;