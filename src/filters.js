// Set up filters default object

const filters = {
    searchResult: '',
    hideCompleted : false
};

// getFilters
// Arguments: none
// Return value: filters object

const getFilters = () => filters

// setFilters
// Arguments: updates object with optional searchText or hideCompleted
// Return value: none

const setFilters =({searchResult, hideCompleted}) => {
    if(typeof searchResult === 'string') {
        filters.searchResult = searchResult
    }
    if(typeof hideCompleted === 'boolean') {
        filters.hideCompleted = hideCompleted
    }
}

// Make sure to set up the exports

export { getFilters, setFilters}