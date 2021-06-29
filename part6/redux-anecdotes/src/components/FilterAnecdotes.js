import React from 'react';
import { connect } from "react-redux";
import { filterAnecdotes } from "../reducers/filterReducer";

const FilterAnecdotes = ({ filterAnecdotes, filteredAnecdotes }) => {
    const dispatchFilter = e => {
        filterAnecdotes(e.target.value);
    };

    return <div>
        <label>
            filter
            <input type='text' value={filteredAnecdotes} onChange={dispatchFilter} placeholder='filter' />
        </label>
    </div>;
};

const mapStateToProps = state => {
    return {
        filteredAnecdotes: state.filteredAnecdotes
    };
}

const mapDispatchToProps = { filterAnecdotes }

export default connect(mapStateToProps, mapDispatchToProps)(FilterAnecdotes);