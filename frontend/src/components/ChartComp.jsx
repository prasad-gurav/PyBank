import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function BasicBars() {

    function getLastThreeDates() {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const twoDaysAgo = new Date(today);
        twoDaysAgo.setDate(today.getDate() - 2);
        const formatDate = (date) => date.toLocaleDateString('en-GB'); 

        return [ formatDate(today),
            formatDate(yesterday),
            formatDate(twoDaysAgo)];}

    const lastThreeDates = getLastThreeDates();
    console.log(lastThreeDates);

    return (
        <BarChart
            xAxis={[{ scaleType: 'band', data: [...lastThreeDates.reverse()] }]}
            series={[
                { data: [1, 6, 3],color:'#F8BF28'}, // Customize color for the first series
                { data: [2, 5, 6], color: '#EF6820' }, // Customize color for the second series
            ]}
            width={715}
            height={450}
        />
    );
}
