import { List } from '@mui/material';
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote';

import { PROJECT_PATH } from '../api/env';
import LayoutMenuItem from '../components/layout/LayoutMenuItem';

const ProjectMenu = () => (
  <List>
    <LayoutMenuItem icon={SettingsRemoteIcon} label="Demo Project" to={`/${PROJECT_PATH}/demo`} disabled={false} />
  </List>
);

export default ProjectMenu;
