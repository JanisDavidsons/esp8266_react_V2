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
#define DEFAULT_RED_VALUE 10
#define DEFAULT_GREEN_VALUE 10
#define DEFAULT_BLUE_VALUE 10
#define OFF_STATE "OFF"
#define ON_STATE "ON"
#define LED_ON 0x0
#define LED_OFF 0x1
#define LIGHT_SETTINGS_ENDPOINT_PATH "/rest/lightState"
#define LIGHT_SETTINGS_SOCKET_PATH "/ws/lightState"

class LightState {
 public:
  bool ledOn;
  uint8_t redValue;
  uint8_t greenValue;
  uint8_t blueValue;

  static void read(LightState& settings, JsonObject& root) {
    root["led_on"] = settings.ledOn;
    root["red_value"] = settings.redValue;
    root["green_value"] = settings.greenValue;
    root["blue_value"] = settings.blueValue;
  }

  static StateUpdateResult update(JsonObject& root, LightState& lightState) {
    boolean newState = root["led_on"] | DEFAULT_LED_STATE;
    int red = root["red_value"] | DEFAULT_RED_VALUE;
    int green = root["green_value"] | DEFAULT_GREEN_VALUE;
    int blue = root["blue_value"] | DEFAULT_BLUE_VALUE;

  if (red != lightState.redValue || green != lightState.greenValue || blue != lightState.blueValue) {
      lightState.redValue   = red;
      lightState.greenValue = green;
      lightState.blueValue  = blue;

      return StateUpdateResult::CHANGED;
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
  int getOnHour() const;
  int getOnMinute() const;
  int getOffHour() const;
  int getOffMinute() const;
  int previousMinute = -1;

 private:
  HttpEndpoint<LightState> _httpEndpoint;
  WebSocketTxRx<LightState> _webSocket;
  const int onHour = 15;
  const int onMinute = 0;
  const int offHour = 22;
  const int offMinute = 0;

  void registerConfig();
  void onConfigUpdated();
};

#endif
