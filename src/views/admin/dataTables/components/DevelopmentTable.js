/* eslint-disable */
import {
  Flex,
  Progress,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
    Button,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

export default function DevelopmentTable(props) {
  const { tableData } = props;

    const handleRowClick = (row) => {
        window.open(`http://localhost:3001/dashboard#/admin/gestion-des-employes/${row.original._id}`, "_blank");
    };
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
              Header: 'Pourcentage de préparation',
              accessor: 'readiness_percentage',
              Cell: ({ value }) => {
                  let colorScheme = 'green';
                  if (value < 50) {
                      colorScheme = 'red';
                  } else if (value < 70) {
                      colorScheme = 'orange';
                  }
                  return (
                      <Progress
                          colorScheme={colorScheme}
                          h='8px'
                          w='203px'
                          value={value}
                      />
                  );
              },
          },
          {
              Header: 'Action',
              accessor: 'left',
              Cell: ({ row }) => {
                  let buttonText = 'Default';
                  let buttonColor = 'gray';
                  if (row.original.readiness_percentage < 50) {
                      buttonText = 'Suggest courses';
                      buttonColor = 'red';
                  } else if (row.original.readiness_percentage < 70) {
                      buttonText = "Change team";
                      buttonColor = 'orange';
                  } else {
                      buttonText = 'Promote';
                      buttonColor = 'green';
                  }

                  return (
                      <Button colorScheme={buttonColor}>
                          {buttonText}
                      </Button>
                  );
              },
          },
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
    initialState
  } = tableInstance;
  initialState.pageSize = 10;
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("secondaryGray.500", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
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
                            <Tr
                                {...row.getRowProps()}
                                key={index}
                                onClick={() => handleRowClick(row)} // Assuming each row data has an _id field
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
