import React from 'react';
import { useCountdown } from './useCountDown';
import styled from 'styled-components';
import { Typography } from '@mui/material'

const ExpiredNotice = () => {
    return (
        <Typography variant='subtitle1'>Time expired</Typography>
    );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
    return (
        <ShowCounterContainer>
            <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 3} />
            <p>:</p>
            <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
            <p>:</p>
            <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
            <p>:</p>
            <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
        </ShowCounterContainer>
    );
};

const DateTimeDisplay = ({ value, type, isDanger }) => {
    return (
        <CountDown>
            <Typography variant='subtitle1'>{value}</Typography>
            <Typography>{type}</Typography>
        </CountDown>
    );
};

export const CountdownTimer = ({ targetDate }) => {
    const [days, hours, minutes, seconds] = useCountdown(targetDate);

    if (days + hours + minutes + seconds <= 0) {
        return <ExpiredNotice />;
    } else {
        return (
            <ShowCounter
                days={days}
                hours={hours}
                minutes={minutes}
                seconds={seconds}
            />
        );
    }
};

export default CountdownTimer;

const ShowCounterContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0.5rem;
text-decoration: none;
`

const CountDown = styled.div`
    line-height: 1.25rem;
    padding: 0 0.75rem 0 0.75rem;
    align-items: center;
    display: flex;
    flex-direction: column;
`
