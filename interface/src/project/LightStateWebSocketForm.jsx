import { Switch } from '@mui/material';

import { WEB_SOCKET_ROOT } from '../api/endpoints';
import { BlockFormControlLabel, FormLoader, MessageBox, SectionContent } from '../components';
import { updateValue, useWs } from '../utils';

import RgbSlider from '../components/RgbSlider';

export const LIGHT_SETTINGS_WEBSOCKET_URL = WEB_SOCKET_ROOT + "lightState";

const LightStateWebSocketForm = () => {
  const { connected, updateData, data } = useWs(LIGHT_SETTINGS_WEBSOCKET_URL);

  const updateFormValue = updateValue(updateData);

  const handleRgbSliderChange = (color, value) => {
    updateData(prevState => ({
      ...prevState,
      [color]: value
    }));
  };

  const content = () => {
    if (!connected || !data) {
      return (<FormLoader message="Connecting to WebSocket…" />);
    }
    return (
      <>
        <MessageBox
          level="info"
          message="The switch below controls the LED via the WebSocket. It will automatically update whenever the LED state changes."
          my={2}
        />
        <BlockFormControlLabel
          control={
            <Switch
              name="led_on"
              checked={data.led_on}
              onChange={updateFormValue}
              color="primary"
            />
          }
          label="LED State?"
        />

        <RgbSlider
          data={data}
          handleRgbSliderChange={handleRgbSliderChange}
        />
      </>
    );
  };

  return (
    <SectionContent title='WebSocket Example' titleGutter>
      {content()}
    </SectionContent>
  );
};

export default LightStateWebSocketForm;
