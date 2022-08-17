import React from "react";
import { Link, Box, Grid, Card, Chip, Typography, Button } from "@mui/material";
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import colors from "../../theme/colors";

export default function Jobs({ job }) {
    return (
        <Card sx={{ minWidth: { xs: 450, sm: 550, md: 370 }, maxWidth: { xs: 450, md: 370 }, minHeight: 240, maxHeight: 240, backgroundColor: "#243341", p: "1rem" }}>
            <Link href="https://jobs.lever.co/paralleldomain/a71b87c8-b0a6-4425-bb96-91c169ca2318/apply" underline="none">
                <Grid sx={{ height: 210, p: 2, display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
                    <Box>
                        <Typography variant="h4" sx={{ mb: 1 }}>
                            {job.text}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography component={'span'}
                            sx={{ letterSpacing: 1.1, fontSize: "0.75rem", fontWeight: 400, fontFamily: "ProximaNova,Helvetica,Arial,serif", lineHeight: 1.57, mb: 1 }}>
                            <Grid item>
                                <Chip icon={<PlaceOutlinedIcon sx={{ "&&": { color: colors.primary } }} />} label={job.categories.location} />
                            </Grid>
                            <Grid item>
                                <Chip icon={<GroupsOutlinedIcon sx={{ "&&": { color: colors.primary } }} />} label={job.categories.team} />
                            </Grid>
                        </Typography>
                    </Box>
                    <Box sx={{
                    }}>
                        <Button sx={{
                            border: "2px solid rgba(255, 172, 60, 0.5)",
                            "&:hover": {
                                border: "2px solid"
                            }
                        }} > Apply</Button>
                    </Box>
                </Grid>
            </Link>
        </Card >
    )
}

