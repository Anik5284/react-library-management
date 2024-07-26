import React, { useContext, useEffect, useState } from 'react';
import { Box, Container, Table, Tbody, Td, Text, Thead, Th, Tr, Image, useToast} from '@chakra-ui/react';
import { AuthContext } from '../../context/UserContext';
import axios from 'axios';
import Loader from '../Loader/Loader';



const UserBorrowed = () => {
    const { user } = useContext(AuthContext);
    const [returnReqBooks, setReturnReqBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasFetched, setHasFetched] = useState(false);
    const toast = useToast();

    useEffect(()=>{
        async function fetchReturnReqList(){
            setLoading(true);
            const config ={
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            }
            const {data}=await axios.get(`/api/book/returnReqList`,config);
            setHasFetched(true);
            setLoading(false);
            if (Array.isArray(data)) {
                setReturnReqBooks(data);
            } else {
                toast({
                    title: 'No request',
                    description: data.message,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                setReturnReqBooks([]);
            }
            console.log(data);
        }
        if(!hasFetched)
            fetchReturnReqList();
    });

    return (
        <>
            {!loading  ? (
                <Container maxW="container.xl">
                    <Box
                        bg="rgba(0,0,0,0.1)"
                        style={{
                            backdropFilter: "blur(15px) brightness(80%)"
                        }}
                        p={4}
                        borderRadius="2em"
                        display="flex"
                        flexDirection="column"
                    >
                        <Text
                            fontSize="2xl"
                            fontWeight="bold"
                            textAlign="center"
                        >
                            Books Return Request
                        </Text>
                        <Table variant="simple">
                            <Thead>
                                <Tr >
                                    <Th textColor="white" fontSize="medium">Title</Th>
                                    <Th textColor="white" fontSize="medium">Email</Th>
                                    <Th textColor="white" fontSize="medium">Author</Th>
                                    <Th textColor="white" fontSize="medium">isbn</Th>
                                    <Th textColor="white" fontSize="medium">Image</Th>
                                    <Th textColor="green" fontSize="medium" fontWeight="900">Accept</Th>
                                    <Th textColor="red" fontSize="medium" fontWeight="900">reject</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {returnReqBooks?.map((book, index) => (
                                    <Tr key={index}>
                                        <Td>{book.title}</Td>
                                        <Td>{book.returnReq.email}</Td>
                                        <Td>{book.author}</Td>
                                        <Td>{book.isbnPre}</Td>
                                        <Td>
                                            <Image src={book.image} alt={book.title} boxSize="50px" />
                                        </Td>
                                        <Td class="tick-cross"><button class="tick">✔</button></Td>
                                        <Td class="tick-cross"><button class="cross">❌</button></Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>
                </Container>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default UserBorrowed;