import React, { useState, useEffect } from "react";
import { Box, Typography, Container, Stack, Grid, CircularProgress } from "@mui/material";
import SelectDropdown from './OpenPositions/SelectDropdown';
import Jobs from './OpenPositions/Jobs';
import Banner from "./Banner";
import banner from '../images/banner.jpeg';
import colors from "../theme/colors";

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

  return (
    <>
      <Banner src={banner} text={"Join Us"} />
      <Box
        sx={{
          maxWidth: "1024px",
          width: "100%",
          margin: "0 auto",
          py: 5
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "1.6rem", lg: "2.1rem" },
            fontWeight: "400",
            textAlign: "center",
            letterSpacing: "-1px",
            mt: "2.5rem",
            mb: 2
          }}
        >
          Open Positions
        </Typography>
        <Typography variant="body1"
          sx={{
            fontSize: { md: "1rem", lg: "1.3rem" },
            fontWeight: "400",
            textAlign: "center",
            maxWidth: "768px",
            margin: "0 auto",
            p: "0 1.5rem 2.5rem 1.5rem"
          }}
        >
          Our data is training and testing autonomous systems at companies around the world. We're looking for talented visionaries to help us to expand our impact on the way artificial intelligence is developed.
        </Typography>
      </Box>
      {
        isLoading || data.length === 0 ? <Box sx={{
          display: "flex", justifyContent: "center",
        }}><CircularProgress sx={{
          color: colors.primary
        }} /></Box> : <>
          <Container maxWidth="lg" sx={{ px: "1.5rem" }}>
            <Grid container spacing={0} alignItems="center">
              <Typography
                sx={{ mr: 4 }}
              >
                Filter By:
              </Typography>
              <SelectDropdown
                items={uniqueCategories.location}
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                labels={filterLabels.location}
              />
              <SelectDropdown
                items={uniqueCategories.team}
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                labels={filterLabels.team}
              />
              <SelectDropdown
                items={uniqueCategories.commitment}
                value={selectedCommitment}
                onChange={(e) => setSelectedCommitment(e.target.value)}
                labels={filterLabels.commitment}
              />
            </Grid>
          </Container>
          <Container maxWidth="lg" sx={{ mb: "6rem", px: "1.5rem" }}>
            {filtered.map((list) => (
              <Stack key={list.team} sx={{ display: !list.jobs.length ? "none" : "block" }}>
                <Typography sx={{
                  textTransform: "uppercase",
                  color: colors.primary,
                  fontSize: "15px",
                  letterSpacing: "2px",
                  lineHeight: "1.2",
                  fontWeight: "bold",
                  mt: "80px",
                  mb: "10px",
                }}>{list.team}</Typography>
                <Grid container spacing={1} sx={{ mt: "40px" }}>
                  {list.jobs.map((job) => (
                    <Grid item key={job.id}>
                      <Jobs job={job} key={job.id} />
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            ))}
          </Container>
        </>
      }
    </>
  );
}

export default Home;
