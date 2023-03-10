#include <Arduino_LSM6DS3.h>

float calx = 0, caly = 0, calz = 0;
bool ringing = false;

void acSetup() {
  if (!IMU.begin()) {
    Serial.println("Failed to initialize IMU!");

    while (1);
  }
}

void calibrate(){
  float x, y, z;
  if (IMU.accelerationAvailable()) {
    IMU.readAcceleration(x, y, z);
    calx = x;
    caly = y;
    calz = z;
    Serial.println("Calibrating:\t" + String(x) + "\t" + String(y) + "\t" + String(z));
  }
}

void reset() {
  ringing = false;
}

void acUpdate() {
  float x, y, z;

  if (IMU.accelerationAvailable()) {
    IMU.readAcceleration(x, y, z);
    x-=calx;
    y-=caly;
    z-=calz;
    if (x >= 1 || x <= -1 || y >= 1 || y <= -1 || z >= 1 || z <= -1) {
      Serial.println("moving");
      ringing = true;
    }
  }
}

void setup() {
  Serial.begin(9600);
  while (!Serial);
  acSetup();
  calibrate();
}

void loop() {
  acUpdate();
}