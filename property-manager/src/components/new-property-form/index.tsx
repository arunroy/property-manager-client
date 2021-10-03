import { useState, useRef, useEffect, FormEvent, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DatePicker from '@mui/lab/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import PropTypes, { InferProps } from 'prop-types';
import moment from 'moment';

const ViewModes = {
    ADD: 0,
    UPDATE: 1
};

function PropertyForm({ viewMode, address: addressFromProps, propertyType: propertyTypeFromProps, availableDate: availableDateFromProps }: InferProps<typeof PropertyForm.propTypes>) {

  const fileInputRef = useRef(null);
  const [moveInAvailableDate, setMoveInAvailableDate] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageFiles, setImageFiles] = useState({});
  const [validationError, setValidationError] = useState('');
  const [address, setAddress] = useState('');

  const handleAddNewProperty = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log('Adding new property...');
    const propertyDetails = {
      'address': address,
      'availableDate': moveInAvailableDate? moment(moveInAvailableDate).toISOString(): '',
      'description': description,
      'images': imageFiles,
      'price': price,
      'type': propertyType,
    };
    console.log(propertyDetails);
  }
  const handleOnFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    try{
      const target = event.target as HTMLInputElement;
      const files = target.files as FileList;
      if(files.length > 2) {
        throw 'Sorry, only two files can be uploaded';
      }
      setImageFiles({files});
    }
    catch(e: any) {
      setValidationError(e);
      console.log(validationError);
    }
  }

  useEffect(() => {
    console.log(addressFromProps);
    addressFromProps && setAddress(addressFromProps);
    availableDateFromProps && setMoveInAvailableDate(availableDateFromProps);
    propertyTypeFromProps && setPropertyType(propertyTypeFromProps);
  }, [addressFromProps, propertyTypeFromProps])

  const handleChange = (event: SelectChangeEvent) => {
    setPropertyType(event.target.value as string);
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '40ch' },
        '& .MuiSelect-root': { m: 1, width: '20ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
          <h4>Add new property</h4>
          <h5>{validationError}</h5>
          <div>
            <TextField
            id="outlined-address"
            label="Address"
            helperText="Property address"
            value = {address}
            onChange={(e) => { setAddress(e.currentTarget.value)}}
            />
          </div>
          <div>
            <TextField
            id="outlined-description"
            label="Description"
            multiline
            maxRows={10}
            value={description}
            helperText="Detailed description of the property"
            onChange={(e) => { setDescription(e.currentTarget.value)}}
            />
          </div>
          <div>
            <TextField
            id="outlined-price"
            label="Price"
            helperText=""
            value={price}
            onChange={(e) => { setPrice(e.currentTarget.value)}}
            />
          </div>
          <div>
              <FormControl fullWidth>
                <DatePicker
                  label="Date available"
                  value={moveInAvailableDate}
                  onChange={(newValue) => {
                  setMoveInAvailableDate(moment(newValue).toISOString());
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </FormControl>
          </div>
        <div>
          <div>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Property Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={propertyType}
              label="Property Type"
              onChange={handleChange}
            >
              <MenuItem value='Flat'>Flat</MenuItem>
              <MenuItem value='Studio'>Studio</MenuItem>
              <MenuItem value='House'>House</MenuItem>
            </Select>
          </FormControl>
          </div>
          <div>

            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              multiple
              onChange={handleOnFileChange}
              ref={fileInputRef}
            />
          </div>
          <div>
            <label htmlFor="raised-button-file">
              <Button variant="contained" component="span">
                Upload
              </Button>
            </label> 
          </div>
        </div>
          {
              viewMode === ViewModes.ADD &&
              <Button variant="contained" onClick={handleAddNewProperty}>Add Property</Button>
          }
          {
              viewMode === ViewModes.UPDATE &&
              <Button variant="contained" type="submit">Edit Property</Button>
          }
      </div>

    </Box>
  );
}

PropertyForm.defaultProps = {
    viewMode: ViewModes.ADD,
    address: '',
    propertyType: '',
    availableDate: ''
}
PropertyForm.propTypes = {
    viewMode: PropTypes.number,
    address: PropTypes.string,
    propertyType: PropTypes.string,
    availableDate: PropTypes.string
} 

export default PropertyForm;