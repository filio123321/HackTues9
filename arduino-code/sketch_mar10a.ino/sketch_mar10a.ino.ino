#include <SoftwareSerial.h>

SoftwareSerial BTSerial(19, 18); // RX | TX

void setup() {
  Serial.begin(9600);
  BTSerial.begin(9600);
  pinMode(9, OUTPUT);
  digitalWrite(9, HIGH);
  BTSerial.write("AT");
  delay(1000);
  BTSerial.write("AT+ROLE=2");
  delay(1000);
  BTSerial.write("AT+NAME=BogIGospodSaVMen");
  delay(1000);
  BTSerial.write("AT+PSWD=1234");
  delay(1000);
  BTSerial.write("AT+UART=9600,0,0");
  delay(1000);
  BTSerial.write("AT+CMODE=0"); // Enable connectability
  delay(1000);
  digitalWrite(9, LOW);
}

void loop() {
  if (BTSerial.available()) {
    Serial.write(BTSerial.read());
  }
}