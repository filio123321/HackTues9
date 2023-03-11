#include <Arduino_LSM6DS3.h>
#include <ArduinoBLE.h>

#define MAGNET 5

BLEService ledService("19B10000-E8F2-537E-4F6C-D104768A1214");
float calx = 0, caly = 0, calz = 0;
bool ringing = false;

bool magnet(){
  if(digitalRead(MAGNET)){
    return false;
  }else{
    return true;
  }

}

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

  if(magnet()){
    ringing = true;
  }
  if (IMU.accelerationAvailable()) {
    IMU.readAcceleration(x, y, z);
    x-=calx;
    y-=caly;
    z-=calz;
    if (x >= 1 || x <= -1 || y >= 1 || y <= -1 || z >= 1 || z <= -1) {
      Serial.println("moving\t" + String(x) + "\t" + String(y) + "\t" + String(z));
      ringing = true;
    }
  }
}

void btSetup() {
  if (!BLE.begin()) {
    Serial.println("starting BLE failed!");
    while (1);
  }

  BLE.setLocalName("baken_paken");

  BLE.addService(ledService);

  BLE.advertise();
}

void btUpdate() {
  BLEDevice central = BLE.central();

  if (central) {
    ringing = false;
    Serial.print("Connected to central: ");
    Serial.println(central.address());

    while (central.connected());

    Serial.print("Disconnected from central: ");
    Serial.println(central.address());
    calibrate();
  }
}

void setup() {
  Serial.begin(9600);
  while (!Serial);
  btSetup();
  acSetup();
  calibrate();
  pinMode(8, OUTPUT);
}

void loop() {
  btUpdate();
  acUpdate();
  if (ringing) {
    tone(8, 5000);
    delay(100);
    noTone(8);
    delay(100);
  }
}