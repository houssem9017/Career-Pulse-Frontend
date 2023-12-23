import {
    Flex,
    Table,
    Progress,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from "react-table";
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";

export default function ColumnsTable(props) {
    const { tableData } = props;

    const columns = useMemo(
        () => [
            {
                Header: 'First Name',
                accessor: 'firstName',
            },
            {
                Header: 'Last Name',
                accessor: 'lastName',
            },
            {
                Header: 'Chance de démission',
                accessor: 'left',
                Cell: ({ value }) => {
                    let colorScheme = 'red';
                    if (value < 0.4) {
                        colorScheme = 'green';
                    } else if (value < 0.7) {
                        colorScheme = 'orange';
                    }
                    return (
                        <Progress
                            colorScheme={colorScheme}
                            h='8px'
                            w='108px'
                            value={value * 100}
                        />
                    );
                },
            },
            {
                Header: 'Salaire',
                accessor: 'salary_status',
                Cell: ({ value }) => {
                    let color;
                    // Define your conditions for changing the color
                    if (value === 'Excessivement rémunéré') {
                        color = 'orange'; // Example color
                    } else if (value === 'Insuffisamment rémunéré') {
                        color = 'red'; // Example color
                    } else {
                        color = 'green'; // Default color
                    }

                    return (
                        <div style={{ color: color, fontWeight: 'bold' }}>
                            {value}
                        </div>
                    );
                },
            },
            {
                Header: 'Raison possible',
                accessor: 'reason',
            }
        ],
        []
    );

    const data = useMemo(() => tableData, [tableData]);

    const tableInstance = useTable(
        {
            columns,
            data,
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
    } = tableInstance;

    return (
        <Card
            direction='column'
            w='100%'
            px='0px'
            overflowX={{ sm: "scroll", lg: "hidden" }}>
            <Flex px='25px' justify='space-between' mb='10px' align='center'>
                <Text
                    fontSize='22px'
                    fontWeight='700'
                    lineHeight='100%'>
                    List of employees
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
                            <Tr {...row.getRowProps()} key={index}>
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
