/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/


import React, { useState, useEffect } from 'react';

// Chakra imports
import {
  Box,
  useColorModeValue,
} from "@chakra-ui/react";


import {columnsDataDevelopment} from "../dataTables/variables/columnsData";
import tableDataDevelopment from "../dataTables/variables/tableDataDevelopment.json";
import DevelopmentTable from "../dataTables/components/DevelopmentTable";

export default function FutureCareers() {
    const [tableData, setTableData] = useState([]);
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
    useEffect(() => {
        fetch('http://localhost:5002/employee/all')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setTableData(data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);
  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
          <DevelopmentTable
              columnsData={columnsDataDevelopment}
              tableData={tableData}
          />
    </Box>
  );
}
