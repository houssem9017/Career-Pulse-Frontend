import React, { useMemo, useEffect } from 'react';
import {
    Flex, Progress, Table, Tbody, Td, Text, Th, Thead, Tr,
    useColorModeValue
} from "@chakra-ui/react";
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from "react-table";

export default function SkillsTable(props) {

    const skillsData = useMemo(() => {
        return Object.entries(props.skills).map(([skill, readiness]) => ({
            skill,
            readiness_percentage: readiness
        }));
    }, [props.skills]);

    const columns = useMemo(() => [
        {
            Header: 'Skill',
            accessor: 'skill',
        },
        {
            Header: 'Progress',
            accessor: 'readiness_percentage',
            Cell: ({ value }) => {
                let colorScheme = 'green';
                if (value < 3) {
                    colorScheme = 'red';
                } else if (value < 4) {
                    colorScheme = 'orange';
                }
                return (
                    <Progress
                        colorScheme={colorScheme}
                        h='8px'
                        w='203px'
                        value={value * 20}
                    />
                );
            },
        }
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        setPageSize
    } = useTable(
        {
            columns,
            data: skillsData,
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );
    useEffect(() => {
        setPageSize(25); // Set the page size here
    }, [setPageSize]);

    const textColor = useColorModeValue("secondaryGray.900", "white");
    const iconColor = useColorModeValue("secondaryGray.500", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

    return (
        <Card direction='column' w='100%' px='0px' overflowX={{ sm: "scroll", lg: "hidden" }}>
            <Flex px='25px' justify='space-between' mb='10px' align='center'>
                <Text fontSize='22px' fontWeight='700' lineHeight='100%'>
                    Name: {props.employeeName}
                </Text>
                <Menu />
            </Flex>
            <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
                <Thead>
                    {headerGroups.map((headerGroup, index) => (
                        <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                            {headerGroup.headers.map((column, index) => (
                                <Th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    pe='10px'
                                    key={index}
                                    borderColor='transparent'>
                                    <Flex
                                        justify='space-between'
                                        align='center'
                                        fontSize='12px'
                                        color='gray.400'>
                                        {column.render("Header")}
                                    </Flex>
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {page.map((row, index) => {
                        prepareRow(row);
                        return (
                            <Tr
                                {...row.getRowProps()}
                                key={index}
                                style={{ cursor: 'pointer' }}
                            >
                                {row.cells.map((cell, index) => (
                                    <Td
                                        {...cell.getCellProps()}
                                        key={index}
                                        fontSize='14px'
                                        py='8px'
                                        borderColor='transparent'>
                                        {cell.render('Cell')}
                                    </Td>
                                ))}
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </Card>
    );
}
