import {
    Box,
    Button,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import React from "react";

const AdminTable = ({ users, onDelete, onEdit }) => {
    return (
        <Box overflowX="auto">
            <Table variant="simple" colorScheme="teal">
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Phone Number</Th>
                        <Th>Orders</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {users.map((user) => (
                        <Tr key={user.id} >
                            <Td>{user.name}</Td>
                            <Td>{user.email}</Td>
                            <Td>{user.phone}</Td>
                            <Td>{user.orders}</Td>
                            <Td>
                                <Button
                                    colorScheme="teal"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onEdit(user)}
                                    leftIcon={<EditIcon />}
                                    marginRight={2}
                                >
                                    Edit
                                </Button>
                                <Button
                                    colorScheme="red"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onDelete(user.id)}
                                    leftIcon={<DeleteIcon />}
                                >
                                    Delete
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            {users.length === 0 && (
                <Text textAlign="center" mt={4} color="black.500">
                    No users found.
                </Text>
            )}
        </Box>
    );
};

export default AdminTable;
