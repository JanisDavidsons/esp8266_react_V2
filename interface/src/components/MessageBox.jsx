import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import ErrorIcon from '@mui/icons-material/Error';

const LEVEL_ICONS = {
  success: CheckCircleOutlineOutlinedIcon,
  info: InfoOutlinedIcon,
  warning: ReportProblemOutlinedIcon,
  error: ErrorIcon
};

const LEVEL_BACKGROUNDS = {
  success: (theme) => theme.palette.success.dark,
  info: (theme) => theme.palette.info.main,
  warning: (theme) => theme.palette.warning.dark,
  error: (theme) => theme.palette.error.dark,
};

const MessageBox = ({ level, message, sx, children, ...rest }) => {
  const theme = useTheme();
  const Icon = LEVEL_ICONS[level];
  const backgroundColor = LEVEL_BACKGROUNDS[level](theme);
  const color = theme.palette.getContrastText(backgroundColor);
  return (
    <Box
      p={2}
      display="flex"
      alignItems="center"
      borderRadius={1}
      sx={{ backgroundColor, color, ...sx }}
      {...rest}
    >
      <Icon />
      <Typography sx={{ ml: 2, flexGrow: 1 }} variant="body1">
        {message}
      </Typography>
      {children}
    </Box>
  );
};

export default MessageBox;
