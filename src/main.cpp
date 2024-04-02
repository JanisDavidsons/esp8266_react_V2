#include <ESP8266React.h>
#include <LightStateService.h>

#define SERIAL_BAUD_RATE 9600

AsyncWebServer server(80);
ESP8266React esp8266React(&server);
LightStateService lightStateService = LightStateService(&server, esp8266React.getSecurityManager());

void setup() {
  Serial.begin(SERIAL_BAUD_RATE);
  esp8266React.begin();
  lightStateService.begin();
  server.begin();
}

void loop() {
  esp8266React.loop();
}
