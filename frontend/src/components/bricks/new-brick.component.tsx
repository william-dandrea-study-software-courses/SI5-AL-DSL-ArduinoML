import {
    Button, Divider,
    FormControl,
    FormControlLabel,
    FormLabel, List, ListItem, ListItemButton, ListItemText,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material";

import './new-brick.component.css';
import {useCallback, useRef, useState} from "react";
import {Brick, ButtonBrick, BuzzerBrick, LedBrick} from "typescript-arduinoml";
import {BricksService} from "../../services/bricks.service";


export const NewBrickComponent = () => {

    const [brickType, setBrickType] = useState<string>('');

    const [buttonName, setButtonName] = useState<string>('');
    const [buttonPin, setButtonPin] = useState<string>('');

    const [ledName, setLedName] = useState<string>('');
    const [ledPin, setLedPin] = useState<string>('');

    const [buzzerName, setBuzzerName] = useState<string>('');
    const [buzzerPin, setBuzzerPin] = useState<string>('');
    const [buzzerFrequency, setBuzzerFrequency] = useState<string>('');
    const [buzzerDuration, setBuzzerDuration] = useState<string>('');

    const [currentBricks, setCurrentBricks] = useState<Brick[]>(BricksService.currentBricks);

    const changeBrickType = useCallback((value: string) => {
        setBrickType(value);
    }, [setBrickType])

    const onNewBrick = (value: string) => {
        if (value === 'button') {
            console.log(buttonName);
            console.log(buttonPin);
            if (buttonName !== '' && buttonPin !== '') {
                BricksService.addNewBrick(new ButtonBrick(buttonName, +buttonPin))
                setCurrentBricks(BricksService.currentBricks);
            }
        }
        if (value === 'led') {
            console.log(ledName);
            console.log(ledPin);
            if (ledName !== '' && ledPin !== '') {
                BricksService.addNewBrick(new LedBrick(ledName, +ledPin))
                setCurrentBricks(BricksService.currentBricks);
            }
        }
        if (value === 'buzzer') {
            console.log(buzzerName);
            console.log(buzzerPin);
            console.log(buzzerFrequency);
            console.log(buzzerDuration);
            if (buzzerName !== '' && buzzerPin !== '' && buzzerFrequency !== '') {
                BricksService.addNewBrick(new BuzzerBrick(buzzerName, +buzzerPin, +buzzerFrequency, buzzerDuration === '' ? null : +buzzerDuration ))
                setCurrentBricks(BricksService.currentBricks);
            }
        }
    }



    // <Typography variant="h2">Add a new brick</Typography>
    return (<>

        <h2>Ajouter une nouvelle brick</h2>

        <div className="NewBrickMainSection">

            <div className="NewBrickMainSection_1">

                <h3>Type de brick</h3>

                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Type de brick</FormLabel>
                    <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="buzzer" name="radio-buttons-group">
                        <FormControlLabel value="button" control={<Radio />} label="Button" onClick={() => changeBrickType("button")}/>
                        <FormControlLabel value="buzzer" control={<Radio />} label="Buzzer" onClick={() => changeBrickType("buzzer")}/>
                        <FormControlLabel value="led" control={<Radio />} label="Led" onClick={() => changeBrickType("led")}/>
                    </RadioGroup>
                </FormControl>

            </div>

            <div className="NewBrickMainSection_2">

                <h3>Paramètres de la brick</h3>

                {brickType === 'button'
                    ?
                        <div>
                            <TextField variant="outlined" label="Name" type="text" value={buttonName} onChange={(event) => {setButtonName(event.target.value)}}/>
                            <p></p>
                            <TextField variant="outlined" label="Pin" type="number" value={buttonPin} onChange={(event) => {setButtonPin(event.target.value)}}/>
                            <p></p>
                            <Button variant="contained" onClick={() => onNewBrick('button')}>Valider</Button>
                        </div>
                    :
                        <div></div>
                }

                {brickType === 'led'
                    ?
                    <div>
                        <TextField variant="outlined" label="Name" type="text" value={ledName} onChange={(event) => {setLedName(event.target.value)}}/>
                        <p></p>
                        <TextField variant="outlined" label="Pin" type="number" value={ledPin} onChange={(event) => {setLedPin(event.target.value)}}/>
                        <p></p>
                        <Button variant="contained" onClick={() => onNewBrick('led')}>Valider</Button>
                    </div>
                    :
                    <div></div>
                }

                {brickType === 'buzzer'
                    ?
                    <div>
                        <TextField variant="outlined" label="Name" type="text" value={buzzerName} onChange={(event) => {setBuzzerName(event.target.value)}}/>
                        <p></p>
                        <TextField variant="outlined" label="Pin" type="number" value={buzzerPin} onChange={(event) => {setBuzzerPin(event.target.value)}}/>
                        <p></p>
                        <TextField variant="outlined" label="Frequency" type="number" value={buzzerFrequency} onChange={(event) => {setBuzzerFrequency(event.target.value)}}/>
                        <p></p>
                        <TextField variant="outlined" label="Duration (not mandatory)" type="number" value={buzzerDuration} onChange={(event) => {setBuzzerDuration(event.target.value)}}/>
                        <p></p>
                        <Button variant="contained" onClick={() => onNewBrick('buzzer')}>Valider</Button>
                    </div>
                    :
                    <div></div>
                }

            </div>
            <div className="NewBrickMainSection_3">
                <h3>Vos bricks</h3>


                <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper',}} component="nav" aria-label="mailbox folders">
                    {currentBricks.map(brick => {
                        return <>
                            <ListItemButton>
                                <ListItemText primary={brick.pin} />
                            </ListItemButton>
                            <Divider />
                        </>
                    })}
                </List>
            </div>

        </div>





    </>)

}
