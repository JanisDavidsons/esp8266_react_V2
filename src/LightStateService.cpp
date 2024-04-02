#include <LightStateService.h>

LightStateService::LightStateService(AsyncWebServer* server,
                                     SecurityManager* securityManager) :
    _httpEndpoint(LightState::read,
                  LightState::update,
                  this,
                  server,
                  LIGHT_SETTINGS_ENDPOINT_PATH,
                  securityManager,
                  AuthenticationPredicates::IS_AUTHENTICATED),
    _webSocket(LightState::read,
               LightState::update,
               this,
               server,
               LIGHT_SETTINGS_SOCKET_PATH,
               securityManager,
               AuthenticationPredicates::IS_AUTHENTICATED){

  FastLED.addLeds<P9813, DATA_PIN, CLOCK_PIN>(leds, NUM_LEDS);
  pinMode(LED_PIN, OUTPUT);

  // configure settings service update handler to update LED state
  addUpdateHandler([&](const String& originId) { onConfigUpdated(); }, false);
}

void LightStateService::begin() {
  _state.ledOn = DEFAULT_LED_STATE;
  onConfigUpdated();
}

void LightStateService::onConfigUpdated() {
  digitalWrite(LED_PIN, _state.ledOn ? LED_ON : LED_OFF);

  _state.ledOn ?
    leds[0].setRGB(255, 255, 255):
    leds[0].setRGB(0, 0, 0);
    FastLED.show();
}

void LightStateService::registerConfig() {
  DynamicJsonDocument doc(256);

  doc["schema"] = "json";
  doc["brightness"] = false;

  String payload;
  serializeJson(doc, payload);
}


void LightStateService::checkTimer() {
  time_t now = time(nullptr);
  tm* currentTime = localtime(&now);
  int currentHour = currentTime->tm_hour;
  int currentMinute = currentTime->tm_min;

  if (currentMinute != previousMinute) {
    previousMinute = currentMinute;

    if (currentHour == onHour && currentMinute == onMinute) {
      _state.ledOn = true;
      onConfigUpdated();
    }

    if (currentHour == offHour && currentMinute == offMinute) {
      _state.ledOn = false;
      onConfigUpdated();
    }
  }
}
