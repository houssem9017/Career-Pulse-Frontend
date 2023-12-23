// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
// Custom components
import BarChart from "components/charts/BarChart";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  barChartDataConsumption,
  barChartOptionsConsumption,
} from "variables/charts";
import { MdBarChart } from "react-icons/md";

export default function WeeklyRevenue(props) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Ratio',
        backgroundColor: 'rgba(30,136,229,0.7)', // Example color, you can change it
        borderColor: 'rgba(30,136,229,1)', // Example color, you can change it
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(30,136,229,0.9)', // Example color, you can change it
        hoverBorderColor: 'rgba(30,136,229,1)', // Example color, you can change it
        data: [],
      },
    ],
  });

  // Define chart options if needed
  const chartOptions = barChartOptionsConsumption;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/your-api-endpoint'); // Replace with your API endpoint
        const data = response.data;

        // Update chartData state with the fetched data
        setChartData({
          ...chartData,
          labels: data.map(item => item.manager),
          datasets: [{
            ...chartData.datasets[0],
            data: data.map(item => item.ratio),
          }],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error
      }
    };

    fetchData();
  }, []);
  return (
    <Card align='center' direction='column' w='100%' {...props}>
      <Flex align='center' w='100%' px='15px' py='10px'>
        <Text
          me='auto'
          color={'rgba(30,136,229,1)'}
          fontSize='xl'
          fontWeight='700'
          lineHeight='100%'>
          Weekly Revenue
        </Text>
        <Button
          align='center'
          justifyContent='center'
          bg={'rgba(30,136,229,1)'}
          _hover={'rgba(30,136,229,1)'}
          _focus={'rgba(30,136,229,1)'}
          _active={'rgba(30,136,229,1)'}
          w='37px'
          h='37px'
          lineHeight='100%'
          borderRadius='10px'
          {...props}>
          <Icon as={MdBarChart} color={'rgba(30,136,229,1)'} w='24px' h='24px' />
        </Button>
      </Flex>

      <Box h='240px' mt='auto'>
        <BarChart
            chartData={chartData}
            chartOptions={barChartOptionsConsumption}
        />
      </Box>
    </Card>
  );
}
