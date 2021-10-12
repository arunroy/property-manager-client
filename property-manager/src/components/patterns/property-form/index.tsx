import { useState, useRef, useReducer, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DatePicker from '@mui/lab/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import moment from 'moment';
import { formReducer, initialState } from '../../../hooks/formhandler-hook';

interface PropertyFormProps {
  onSubmitHandler(details: Object): any 
}
function PropertyForm(props: PropertyFormProps) {

  const [state, dispatch] = useReducer(formReducer, initialState);
  const fileInputRef = useRef(null);
  const [imageFiles, setImageFiles] = useState({});
  const [validationError, setValidationError] = useState('');

  const dispatchFormInputAction = (field: string, value: string) => dispatch({type: 'field', field, value})

  const formSubmitClickHandler = () => {
    console.log('submitting form data..');
    props.onSubmitHandler(state);
  }

  const handleOnFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    try{
      const target = event.target as HTMLInputElement;
      const files = target.files as FileList;
      if(files.length > 2) {
        throw new Error('Sorry, only two files can be uploaded');
      }
      setImageFiles({files});
    }
    catch(e: any) {
      setValidationError(e);
      console.log(validationError);
    }
  }

  const handleChange = (event: SelectChangeEvent) => {
    dispatchFormInputAction('propertyType', event.target.value);
  }

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
          <h5>{validationError}</h5>
          <div>
            <TextField
            id="outlined-address"
            label="Address"
            helperText="Property address"
            value = {state.address}
            onChange={(e) => dispatchFormInputAction('propertyType', e.currentTarget.value)}
            />
          </div>
          <div>
            <TextField
            id="outlined-description"
            label="Description"
            multiline
            maxRows={10}
            value={state.description}
            helperText="Detailed description of the property"
            onChange={(e) => dispatchFormInputAction('description', e.currentTarget.value)}
            />
          </div>
          <div>
            <TextField
            id="outlined-price"
            label="Price"
            helperText=""
            value={state.price}
            onChange={(e) => dispatchFormInputAction('price', e.currentTarget.value)}
            />
          </div>
          <div>
              <FormControl fullWidth>
                <DatePicker
                  label="Date available"
                  value={state.moveInAvailableDate}
                  onChange={(newValue) => {
                    const availableDate = moment(newValue).toISOString();
                    dispatchFormInputAction('availableDate', availableDate);
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
              value={state.propertyType}
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
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Property Type</InputLabel>
              <Button variant="contained" component="span"  onClick={formSubmitClickHandler}>
                  Submit
              </Button>
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
      </div>

    </Box>
  );
}

export default PropertyForm;