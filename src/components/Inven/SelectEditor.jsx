import React from 'react';
import { Select, MenuItem } from '@mui/material';
import { GridEditSingleSelectCell } from '@mui/x-data-grid';

const options = ["많음", "적당함", "적음", "없음"];

function SelectEditor(props) {
    const { id, value, api } = props;

    const handleChange = (event) => {
        api.setEditCellValue({ id, field: 'size', value: event.target.value });
    };

    return (
        <Select
            value={value}
            onChange={handleChange}
            fullWidth
        >
            {options.map((option) => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            ))}
        </Select>
    );
}

export default SelectEditor;
