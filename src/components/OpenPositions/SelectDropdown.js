import React from "react";
import { FormControl, Select, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import colors from "../../theme/colors";

export default function SelectDropdown({ items, value, onChange, labels }) {
    return (
        <FormControl sx={{ minWidth: { xs: "100%", md: "100%", lg: 330 }, p: { xs: "0.5rem 0", md: "0.5rem 0", lg: "0 0.5rem" } }} >
            <Select
                value={value}
                onChange={onChange}
                IconComponent={KeyboardArrowDownIcon}
                sx={{
                    ".MuiSelect-iconOutlined": {
                        color: colors.primary,
                    },
                }}
                MenuProps={{
                    sx: { backgroundColor: "rgba(0, 0, 0, 0.8)" },
                    PaperProps: {
                        sx: {
                            backgroundColor: colors.secondaryVariant2,
                            "&& .Mui-selected, && .MuiMenuItem-root.Mui-selected, & .MuiMenuItem-root:hover, & .MuiMenuItem-root.Mui-selected:hover": {
                                backgroundColor: colors.secondaryVariant1
                            }
                        }
                    }
                }}
            >
                <MenuItem value={"all"}>{labels}</MenuItem>
                {items.map((opt, i) => (
                    <MenuItem key={i} value={opt}>
                        {opt}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}
