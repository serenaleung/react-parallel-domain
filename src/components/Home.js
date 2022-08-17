import React, { useState, useEffect } from "react";
import { Box, Typography, FormControl, Select, MenuItem, Container, Stack, Link, Button, CircularProgress } from "@mui/material";

function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uniqueCategories, setUniqueCategories] = useState({});
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedTeam, setSelectedTeam] = useState("all");
  const [selectedCommitment, setSelectedCommitment] = useState("all");

  useEffect(() => {
    setIsLoading(true)
    fetch(`https://api.lever.co/v0/postings/paralleldomain?mode=json`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setUniqueCategories({
          location: makeUniqueCategory(json, "location"),
          team: makeUniqueCategory(json, "team"),
          commitment: makeUniqueCategory(json, "commitment")
        });
        setIsLoading(false);
      })
      .catch((error) => console.log("error", error))
  }, []);

  const filterLabels = {
    location: "ALL LOCATIONS",
    team: "ALL TEAMS",
    commitment: "ALL WORK TYPES"
  };

  function makeUniqueCategory(data, category) {
    return [...new Set(data.map((d) => d.categories[category]))];
  }

  function groupTeams(list) {
    return list.reduce((prev, curr) => {
      return {
        ...prev,
        [curr.categories.team]: [...(prev[curr.categories.team] || []), curr]
      };
    }, {});
  }

  const filtered = Object.entries(groupTeams(data))
    .filter(([team]) => ["all", team].includes(selectedTeam))
    .map(([team, jobs]) => ({
      team, jobs: jobs
        .filter((job) =>
          ["all", job.categories.location].includes(selectedLocation)
        )
        .filter((job) =>
          ["all", job.categories.commitment].includes(selectedCommitment)
        )
    }));

  console.log("filtered", filtered)

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
      {isLoading || data.length === 0 ? <CircularProgress /> : <>
        <Typography>Filter By:</Typography>
        <FormControl>
          <Select
            value={selectedLocation}
            onChange={e => setSelectedLocation(e.target.value)}
          >
            <MenuItem value="all">
              {filterLabels.location}
            </MenuItem>
            {uniqueCategories.location.map((opt, i) => (
              <MenuItem key={i} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <Select
            value={selectedTeam}
            onChange={e => setSelectedTeam(e.target.value)}
          >
            <MenuItem value="all">
              {filterLabels.team}
            </MenuItem>
            {uniqueCategories.team.map((opt, i) => (
              <MenuItem key={i} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <Select
            value={selectedCommitment}
            onChange={e => setSelectedCommitment(e.target.value)}
          >
            <MenuItem value="all">
              {filterLabels.commitment}
            </MenuItem>
            {uniqueCategories.commitment.map((opt, i) => (
              <MenuItem key={i} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Container>
          {filtered.map((list) => (
            <Stack key={list.team}>
              <Typography>{list.team}</Typography>
              {list.jobs.map((job) => (
                <Link href="https://jobs.lever.co/paralleldomain/a71b87c8-b0a6-4425-bb96-91c169ca2318/apply">
                  <Box>
                    <Typography variant="h4" sx={{ mb: 1 }}>
                      {job.text}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography>
                      {job.categories.location} / {job.categories.team}
                    </Typography>
                  </Box>
                  <Box sx={{
                  }}>
                    <Button> Apply</Button>
                  </Box>
                </Link>
              ))}
            </Stack>
          ))}
        </Container>
      </>}
    </Box >
  );
}

export default Home;
