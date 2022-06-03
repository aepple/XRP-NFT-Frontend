import Page from '../../components/Page';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { green } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

import { useState, useEffect, useRef } from 'react';

import {
    Box,
    Fab,
    Button,
    Stack,
    Typography,
 } from '@mui/material';

 function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));

// Inspired by the former Facebook spinners.
function FacebookCircularProgress(props) {
  return (
    <Box sx={{ position: 'relative' }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={40}
        thickness={4}
        {...props}
      />
    </Box>
  );
}

export default function TestReact() {
    const [open, setOpen] = useState(false);
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [buffer, setBuffer] = useState(10);

    const timer2 = useRef();

    const progressRef = useRef(() => {});

    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    useEffect(() => {
        progressRef.current = () => {
            if (progress > 100) {
                setProgress(0);
                setBuffer(10);
            } else {
                const diff = Math.random() * 10;
                const diff2 = Math.random() * 10;
                setProgress(progress + diff);
                setBuffer(progress + diff + diff2);
            }
        };
    });

    useEffect(() => {
        const timer1 = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
            progressRef.current();
        }, 300);

        return () => {
            clearInterval(timer1);
            clearTimeout(timer2.current);
        };
    }, []);

    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
            bgcolor: green[700],
            },
        }),
    };

    const handleButtonClick = () => {
        if (!loading) {
        setSuccess(false);
        setLoading(true);
        timer2.current = window.setTimeout(() => {
            setSuccess(true);
            setLoading(false);
        }, 2000);
        }
    };

    return (
        <Page title="Progress" p={3}>
            <div>
            <Button
                variant="contained"
                onClick={handleToggle}>
                Load
            </Button>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            </div>
            <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
                Circular
            </Typography>
            <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                <CircularProgress color="secondary" />
                <CircularProgress color="success" />
                <CircularProgress color="inherit" />
                <CircularProgress variant="determinate" value={25} />
                <CircularProgress variant="determinate" value={50} />
                <CircularProgress variant="determinate" value={75} />
                <CircularProgress variant="determinate" value={100} />
                <CircularProgress variant="determinate" value={progress} />
                <CircularProgressWithLabel value={progress} />
            </Stack>
            <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
                Interactive integration
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ m: 1, position: 'relative' }}>
                    <Fab
                    aria-label="save"
                    color="primary"
                    sx={buttonSx}
                    onClick={handleButtonClick}
                    >
                    {success ? <CheckIcon /> : <SaveIcon />}
                    </Fab>
                    {loading && (
                    <CircularProgress
                        size={68}
                        sx={{
                        color: green[500],
                        position: 'absolute',
                        top: -6,
                        left: -6,
                        zIndex: 1,
                        }}
                    />
                    )}
                </Box>
                <Box sx={{ m: 1, position: 'relative' }}>
                    <Button
                    variant="contained"
                    sx={buttonSx}
                    disabled={loading}
                    onClick={handleButtonClick}
                    >
                    Accept terms
                    </Button>
                    {loading && (
                    <CircularProgress
                        size={24}
                        sx={{
                        color: green[500],
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                        }}
                    />
                    )}
                </Box>
            </Box>
            <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
                Linear color
            </Typography>
            <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={3}>
            <LinearProgress color="primary" />
            <LinearProgress variant="determinate" value={progress} />
            <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
            <LinearProgressWithLabel value={progress} />
            </Stack>
            <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
                Customization
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
            <FacebookCircularProgress />
            <br />
            <BorderLinearProgress variant="determinate" value={50} />
            </Box>
        </Page>
      );
}