int BUTTON = 9;
int BUZZER = 13;
int LED = 12;


void setup() {
	pinMode(BUTTON, INPUT);
	pinMode(BUZZER, OUTPUT);
	pinMode(LED, OUTPUT);
}

void state_UP() {
	digitalWrite(LED, HIGH);
	tone(BUZZER, 2000);

	if (digitalRead(BUTTON) == HIGH) {
		state_DOWN();

	} else {
		state_UP();

	}
}
void state_DOWN() {
	digitalWrite(LED, LOW);
	noTone(BUZZER);

	if (digitalRead(BUTTON) == HIGH) {
		state_UP();

	} else {
		state_DOWN();

	}
}

void loop() {
	state_DOWN();
}
