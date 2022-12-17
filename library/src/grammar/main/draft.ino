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
