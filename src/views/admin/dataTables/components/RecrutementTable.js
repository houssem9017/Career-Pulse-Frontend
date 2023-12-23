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
    Link,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import { AndroidLogo, AppleLogo, WindowsLogo } from "components/icons/Icons";
import Menu from "components/menu/MainMenu";
import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { useHistory } from 'react-router-dom';

export default function RecrutementTable(props) {
  const { tableData } = props;
    const teamColors = {
        "Innovators": "#8A2BE2",
        "Communicators": "#efb000",
        "Planners": "#1E90FF",
        "Motivators": "#FF4500",
        "Analysts": "#3bbf73",
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
              Header: 'Suggested team',
              accessor: 'suggested_team',
              Cell: ({ value }) => {
                  const color = teamColors[value] || "#000000";
                  return (
                      <Text style={{ color: color }} fontWeight={"bold"}>
                          {value}
                      </Text>
                  );
              },
          },
          {
              Header: 'Reason',
              accessor: 'reason',
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
