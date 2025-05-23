import React from 'react'
import Image from 'next/image';
import { useRouter } from 'next/router';
const Search = () => {

    const [keyword , setKeyword] = React.useState("");
    const [location , setLocation] = React.useState("");
    const router = useRouter();

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("Keyword: ", keyword);
        console.log("Location: ", location);
      

      if(keyword){
        let searchQuery = `/?keyword=${keyword}`
        if(location) searchQuery = searchQuery.concat(`&location=${location}`) 
        router.push(searchQuery)
        }else{
          router.push('/')
      }

    }

  return (
    <div className="modalMask">
    <div className="modalWrapper">
      <div className="left">
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <Image src="/images/job-search.svg" alt="search" layout='fill' />
        </div>
      </div>
      <div className="right">
        <div className="rightContentWrapper">
          <div className="headerWrapper">
            <h2> SEARCH</h2>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="inputWrapper">
              <div className="inputBox">
                <i aria-hidden className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Enter Your Keyword"
                  required
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
              <div className="inputBox">
                <i aria-hidden className="fas fa-industry"></i>
                <input
                  type="text"
                  placeholder="Enter City, State ..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
            <div className="searchButtonWrapper">
              <button type="submit" className="searchButton">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Search