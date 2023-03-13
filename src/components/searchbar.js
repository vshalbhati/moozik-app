import React, { useState } from "react";

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearchTermChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onSearch(searchTerm);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input className="bar"
        type="text"
        placeholder="Search here"
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
      <button className="srcbtn" type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
