import { FC } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

import AquariumController from './AquariumController';

const ProjectRouting: FC = () => {
  return (
    <Routes>
      {
        // Add the default route for your project below
      }
      <Route path="/*" element={<Navigate to="demo/information" />} />
      {
        // Add your project page routes below.
      }
      <Route path="demo/*" element={<AquariumController />} />
    </Routes>
  );
};

export default ProjectRouting;
