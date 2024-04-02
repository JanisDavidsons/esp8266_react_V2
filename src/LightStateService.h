#ifndef LightStateService_h
#define LightStateService_h

#include <HttpEndpoint.h>
#include <WebSocketTxRx.h>
#include <FastLED.h>

#define NUM_LEDS 1
#define CLOCK_PIN D5  // D5
#define DATA_PIN D6   // D6
#define LED_PIN 2
#define DEFAULT_LED_STATE false
#define OFF_STATE "OFF"
#define ON_STATE "ON"
#define LED_ON 0x0
#define LED_OFF 0x1
#define LIGHT_SETTINGS_ENDPOINT_PATH "/rest/lightState"
#define LIGHT_SETTINGS_SOCKET_PATH "/ws/lightState"

class LightState {
 public:
  bool ledOn;

  static void read(LightState& settings, JsonObject& root) {
    root["led_on"] = settings.ledOn;
  }

  static StateUpdateResult update(JsonObject& root, LightState& lightState) {
    boolean newState = root["led_on"] | DEFAULT_LED_STATE;
    if (lightState.ledOn != newState) {
      lightState.ledOn = newState;

      return StateUpdateResult::CHANGED;
    }
    return StateUpdateResult::UNCHANGED;
  }

  static void haRead(LightState& settings, JsonObject& root) {
    root["state"] = settings.ledOn ? ON_STATE : OFF_STATE;
  }

  static StateUpdateResult haUpdate(JsonObject& root, LightState& lightState) {
    String state = root["state"];
    boolean newState = false;
    if (state.equals(ON_STATE)) {
      newState = true;
    } else if (!state.equals(OFF_STATE)) {
      return StateUpdateResult::ERROR;
    }
    if (lightState.ledOn != newState) {
      lightState.ledOn = newState;
      return StateUpdateResult::CHANGED;
    }
    return StateUpdateResult::UNCHANGED;
  }
};

class LightStateService : public StatefulService<LightState> {
 public:
  CRGB leds[NUM_LEDS];
  LightStateService(AsyncWebServer* server,SecurityManager* securityManager);
  void begin();
  void checkTimer();

 private:
  HttpEndpoint<LightState> _httpEndpoint;
  WebSocketTxRx<LightState> _webSocket;
  const int onHour = 13;
  const int onMinute = 0;
  const int offHour = 22;
  const int offMinute = 0;
  int previousMinute = -1;

  void registerConfig();
  void onConfigUpdated();
};

#endif
