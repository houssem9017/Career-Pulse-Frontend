import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, SimpleGrid } from '@chakra-ui/react';
import SkillsTable from "./dataTables/components/SkillsTable";
import {columnsDataDevelopment} from "./dataTables/variables/columnsData";

const EmployeeManagement = () => {
    const { employeeId } = useParams();
    const [employeeData, setEmployeeData] = useState(null);

    useEffect(() => {
        // Replace with your API endpoint
        const apiUrl = `http://localhost:5002/employee/byId/${employeeId}`;

        const fetchEmployeeData = async () => {
            try {
                const response = await axios.get(apiUrl);
                setEmployeeData(response.data);
                console.log("aaaa");
            } catch (error) {
                console.error('Error fetching employee data:', error);
                // Handle error appropriately
            }
        };

        fetchEmployeeData();
    }, [employeeId]); // Dependency array ensures this runs only when employeeId changes
    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <SimpleGrid mb='20px'>
                {/* Render your employee data here */}
                {employeeData ? (
                    <>
                     <SkillsTable
                                  skills={employeeData.skills}
                                  employeeName={employeeData.firstName+" "+employeeData.lastName}>
                     </SkillsTable>
                        </>
                ) : (
                    <p>Loading...</p>
                )}
            </SimpleGrid>
        </Box>
    );
}

export default EmployeeManagement;
