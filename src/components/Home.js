import React, { useState, useEffect } from "react";
import { Box, Typography, FormControl, Select, MenuItem } from "@mui/material";

function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`https://api.lever.co/v0/postings/paralleldomain?mode=json`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      })
      .catch((error) => console.log("error", error))
  }, []);

  return (
    <Box sx={{ maxWidth: "1024px", width: "100%", margin: "0 auto", py: 5 }}>
      <Typography variant="h3" sx={{ textAlign: "center", mb: 2 }}>
        Open Positions
      </Typography>
      <Typography
        sx={{ textAlign: "center", maxWidth: "768px", margin: "0 auto" }}
      >
        Our data is training and testing autonomous systems at companies around
        the world. We're looking for talented visionaries to help us to expand
        our impact on the way artificial intelligence is developed.
      </Typography>
      <Typography>Filter By:</Typography>
      <FormControl>
        <Select
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Placeholder</em>;
            }
            return selected.join(', ');
          }}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            Placeholder
          </MenuItem>
          {data.map((d, index) => (
            <MenuItem
              key={index}
              value={index}
            >
              {d.categories.location}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography>{data.map(d => {
        return d.categories.location
      })}
      </Typography>
    </Box>
  );
}

export default Home;
