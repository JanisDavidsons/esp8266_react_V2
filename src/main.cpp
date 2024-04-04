#include <ESP8266React.h>
#include "LightStateService.h"
#include <Arduino.h>
#include <arduino-timer.h>

#define SERIAL_BAUD_RATE 9600

AsyncWebServer server(80);
ESP8266React esp8266React(&server);
LightStateService lightStateService = LightStateService(&server, esp8266React.getSecurityManager());

/* timed evenets */
auto timer = timer_create_default();
void every1000MsCallback();

void setup() {
  Serial.begin(SERIAL_BAUD_RATE);
  esp8266React.begin();
  lightStateService.begin();
  server.begin();
  every1000MsCallback();
}

void loop() {
  esp8266React.loop();
   timer.tick();
}

void every1000MsCallback()
{
  timer.every(
      1000,
      [](void *) -> bool
      {
        lightStateService.checkTimer();
        return true;
      });
}