import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import "./util/Images.css";
import { useParams } from 'react-router-dom';
import Axios from "axios"
import ImageGrid from '../src/ImageGrid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from '@mui/material';
import placeholderImage from './util/loadGif.gif';


export function Images() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [nextPageExists, setNextPageExists] = useState(false)
  const [previousPageExists, setPreviousPageExists] = useState(false)
  const [loading, setLoading] = useState(false)
  const [curatedPhotos, setCuratedPhotos] = useState([]);
  const [search, setSearch] = useState(false);

  const [currentSearchQuery, setCurrentSearchQuery] = useState(() => {
    // getting stored value for query
    const saved = localStorage.getItem("query");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  const [currentPage, setCurrentPage] = useState(() => {
    // getting stored value page number
    const saved = localStorage.getItem("page");
    const initialValue = JSON.parse(saved);
    return initialValue || 1;
  });

  // update the HOST variable with your own client IP address
  const HOST = "http://127.0.0.1:8000";

  // method to fetch the photos once the app renders.
  const fetchPhotos = async () => {
    //checking if a query was previously searched. Else fetch the curated photos.
    if(currentSearchQuery){
      getSearchedPhotos()
    }
    else{
      getPhotos();
    }
    
  };

  //handles next button click.
  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  };

  // handles previous button click
  const handlePrevious = () => {
  setCurrentPage((prevPage) => prevPage - 1)
  };

  // handles search cancel feature.
  const handleCancel = () => {
    setSearchQuery("")
    setCurrentSearchQuery("")
    setCurrentPage(1)
    localStorage.removeItem("query")
    localStorage.removeItem("page")
    setSearch(false)
    getPhotos()
  }
 
  // handles the search query
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentSearchQuery(event.target.value)
  };

  // API call to fetch curated photos from the backend server.
  const getPhotos = () => {
    setLoading(true)
    let url = `${HOST}/api/curated/${currentPage}`
    Axios.get(url)
    .then((response) => {
        console.log("curated")
        console.log(currentPage)
        setCuratedPhotos(response.data.photos);
        setLoading(false)
        response.data.next_page? setNextPageExists(true): setNextPageExists(false)
        response.data.prev_page? setPreviousPageExists(true) : setPreviousPageExists(false)
    }).catch((error) => {
        console.log(error.message)
        alert("Error, Please try again")
      })
  };

  // function to handle query search
  const handleSearch = async () => {
    setCurrentPage(1)
    getSearchedPhotos()
  }

  // API call to fetch the searched photos from back end
  const getSearchedPhotos = async () => {
    setLoading(true)
    console.log(currentSearchQuery)
    let url = `${HOST}/api/search?query=${currentSearchQuery}&page=${currentPage}`
    Axios.get(url,
    ).then((response) => {
      console.log("searched")
      setCuratedPhotos(response.data.photos);
      localStorage.setItem("query", JSON.stringify(currentSearchQuery))
      setSearch(true)
      setSearchQuery("")
      setLoading(false)
      response.data.next_page? setNextPageExists(true): setNextPageExists(false)
      response.data.prev_page? setPreviousPageExists(true) : setPreviousPageExists(false)
  }).catch((error) => {
    console.log(error.message)
    alert("Error, Please try again")
    })
  };

  useEffect(() => {
    //stores the page number into local storage every time the page refreshes.
    localStorage.setItem('page', JSON.stringify(currentPage))
    fetchPhotos();
  }, [currentPage]);

  return (
    <div>
      <div  data-testid="images" className="header"> 
      <h1>Photo Gallery</h1>
      <div style ={{display: "flex"}} >
        <TextField id="outlined-basic" value={searchQuery} onChange={handleSearchQueryChange} variant="outlined" fullWidth label="Search"/>
        <Button style ={{margin: "10px"}}  onClick={handleSearch} type="submit" variant="contained" sx={{ mx: "auto" }}> Search </Button>
      </div>
      {search &&  
      <div style ={{display: "flex"}}>
      <p className="para">Showing results for {currentSearchQuery}</p>
      <IconButton  onClick={handleCancel} aria-label="Example"><FontAwesomeIcon icon={faBan} /></IconButton>
      </div> }
      </div>
      <div className="main">
      <div>
      {previousPageExists?   <Button style ={{margin: "10px"}} onClick={handlePrevious} variant="contained">Previous</Button> : <Button style ={{marginRight: "10px"}} disabled>Previous</Button>}
      {nextPageExists?  <Button style ={{margin: "10px"}} onClick={handleNext} variant="contained">Next</Button> : <Button class="button" disabled>Next</Button>}
      </div>
      {!loading && <ImageGrid curatedPhotos={curatedPhotos}></ImageGrid> }
    </div>
    </div>
  );
}

export default Images;