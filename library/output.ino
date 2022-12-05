// generated by TypeScriptArduinoML
int BUTTON = 9;
int LED = 12;
void setup() {
	pinMode(BUTTON, INPUT);
	pinMode(LED, OUTPUT);
}
void state_off() {
	digitalWrite(LED, LOW);
	if (digitalRead(BUTTON) == HIGH) {
		state_on();
	} else {
		state_off();
	}
}

void state_on() {
	digitalWrite(LED, HIGH);
	if (digitalRead(BUTTON) == HIGH) {
		state_off();
	} else {
		state_on();
	}
}

void loop() { state_off(); }
