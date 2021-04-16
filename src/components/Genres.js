import { Chip } from "@material-ui/core";
import axios from "axios"
import { useEffect, useState } from "react";

const Genres = ({
    selectGenres,
    setSelectGenres,
    genres,
    setGenres,
    type,
    setType,
    setPage,
}) => {
    const handleAdd = (genre) => {
        setSelectGenres([...selectGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        setPage(1);
    }
    
    const handleRemove = (genre) => {
        setSelectGenres(
            selectGenres.filter((selected) => selected.id !== genre.id)
        );
        setGenres([...genres, genre]);
        setPage(1);
    }

    const fetchGenres = async () => {
       const {data} = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
  
      setGenres(data.genres);
    };

    useEffect(() => {
       fetchGenres();

       return ()=> {
           setGenres({});
       }
    }, [])

    return (
        <div style={{padding: "6px 0"}}>
            {selectGenres && selectGenres.map((genre) =>(
                <Chip
                  label={genre.name}
                  style={{margin: 2}}
                  color="primary"
                  size="small"
                  key={genre.id}
                  clickable
                  onDelete={() => handleRemove(genre)}
                />
           )
           )}

           {genres && genres.map((genre) =>(
                <Chip
                  label={genre.name}
                  style={{margin: 2}}
                  size="small"
                  key={genre.id}
                  clickable
                  onClick={()=> handleAdd(genre)}
                />
           )
           )}
        </div>
    )
}

export default Genres
