#include <ArduinoBLE.h>

BLEService ledService("19B10000-E8F2-537E-4F6C-D104768A1214");

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
    Serial.print("Connected to central: ");
    Serial.println(central.address());

    while (central.connected());

    Serial.print("Disconnected from central: ");
    Serial.println(central.address());
  }
}

void setup() {
  btSetup();
}
void loop() {
  btLoop();
}
