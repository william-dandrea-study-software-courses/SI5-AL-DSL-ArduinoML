
# Connect Package & frontend

Need to be done for each update of the library
```shell
cd ./library
npm link

cd ../frontend
npm link typescript-arduinoml
```

# Tests

### Dual-check alarm

##### Code
```typescript

/**
 * It will trigger a buzzer if and only if two buttons are pushed at the very same time. Releasing at least one
 * of the button stop the sound.
 */
it("Dual-check alarm", () => {

    const buzzer: BuzzerBrick = new BuzzerBrick("BUZZER", 13, 1000, null);
    const button1: ButtonBrick = new ButtonBrick("BUTTON1", 11);
    const button2: ButtonBrick = new ButtonBrick("BUTTON2", 12);

    const mainState: State = new State("main");

    const noSoundBloc: CommandBlock = new CommandBlock([buzzer.toDown(), mainState.callState()]);
    const withSoundBloc: CommandBlock = new CommandBlock([buzzer.toUp(), mainState.callState()]);

    const switchToWithSound: ConditionalBlock = new ConditionalBlock([button1.isActive(), button2.isActive()], Operator.AND, withSoundBloc, noSoundBloc)

    mainState.addBlock(switchToWithSound);

    const application: Application = new Application([buzzer, button1, button2], [mainState], [mainState.callState()])
    console.log(application.export())
});
```

##### Resultat en ``.ino``

```
int BUZZER = 13;
int BUTTON1 = 11;
int BUTTON2 = 12;


void setup() {
	pinMode(BUZZER, OUTPUT);
	pinMode(BUTTON1, INPUT);
	pinMode(BUTTON2, INPUT);
}

void state_main() {
	
	if (digitalRead(BUTTON1) == HIGH && digitalRead(BUTTON2) == HIGH) {
		tone(BUZZER, 1000);
		state_main();
		
	} else {
		noTone(BUZZER);
		state_main();
		
	}
}

void loop() {
	state_main();
}
```

##### Déployé


