import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography} from "@mui/material";

import './new-brick.component.css';
import {useState} from "react";


export const NewBrickComponent = () => {

    const [brickType, setBrickType] = useState();

    // <Typography variant="h2">Add a new brick</Typography>
    return (<>

        <h2>Ajouter une nouvelle brick</h2>

        <div className="NewBrickMainSection">

            <div className="NewBrickMainSection_1">

                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Type de brick</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="button" control={<Radio />} label="Button" />
                        <FormControlLabel value="buzzer" control={<Radio />} label="Buzzer" />
                        <FormControlLabel value="led" control={<Radio />} label="Led" />
                    </RadioGroup>
                </FormControl>

            </div>

            <div className="NewBrickMainSection_2"></div>
            <div className="NewBrickMainSection_3"></div>

        </div>





    </>)

}
