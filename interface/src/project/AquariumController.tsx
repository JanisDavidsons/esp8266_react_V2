
import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Tab } from '@mui/material';

import { RouterTabs, useRouterTab, useLayoutTitle } from '../components';

import DemoInformation from './DemoInformation';
import LightStateRestForm from './LightStateRestForm';
import LightStateWebSocketForm from './LightStateWebSocketForm';

const DemoProject: FC = () => {
  useLayoutTitle("Aquarium controller");
  const { routerTab } = useRouterTab();

  return (
    <>
      <RouterTabs value={routerTab}>
        <Tab value="information" label="Information" />
        <Tab value="rest" label="REST" />
        <Tab value="socket" label="WebSocket" />
      </RouterTabs>
      <Routes>
        <Route path="information" element={<DemoInformation />} />
        <Route path="rest" element={<LightStateRestForm />} />
        <Route path="socket" element={<LightStateWebSocketForm />} />
        <Route path="/*" element={<Navigate replace to="information" />} />
      </Routes>
    </>
  );
};

export default DemoProject;
