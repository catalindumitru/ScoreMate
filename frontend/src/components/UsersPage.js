import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { USERNAME } from "../auth/user";
import { getOpponents } from "../database/accessor";
import {
  Card,
  CardBody,
  Heading,
  Text,
  Button,
  Grid,
  GridItem,
  Box,
} from "@chakra-ui/react";

function UsersPage() {
  const [opponents, setOpponents] = useState(
    JSON.parse(sessionStorage.getItem("opponents")) || []
  );

  useEffect(() => {
    const fetchData = async () => {
      if (sessionStorage.getItem("opponents")) return;

      const newOpponents = await getOpponents(USERNAME).then(
        (res) => res.opponents
      );
      sessionStorage.setItem("opponents", JSON.stringify(newOpponents));
      setOpponents(newOpponents);
      console.log(newOpponents);
    };

    fetchData();
  }, []);

  return (
    <Box w="100%" h="100dvh" bg="#111418" align="center">
      <Grid templateRows="repeat(2, 1fr)" w="80%" h="100dvh">
        <GridItem h="10%" paddingTop="25">
          <Heading size="2xl" color="#8FC9F9">
            Opponents
          </Heading>
        </GridItem>
        <GridItem>
          <UserCardList users={opponents} />
        </GridItem>
      </Grid>
    </Box>
  );
}

function UserCardList({ users }) {
  return (
    <Grid gap="5">
      {users.map((user, idx) => (
        <GridItem>
          <UserCard user={user}></UserCard>
        </GridItem>
      ))}
    </Grid>
  );
}

function UserCard({ user }) {
  return (
    <Link to={`score/${user}`}>
      <Card w="80%" bg="#0F1924" _hover={{ bg: "teal" }}>
        <CardBody>
          <Text fontSize="3xl" color="#8FC9F9">
            {user}
          </Text>
        </CardBody>
      </Card>
    </Link>
  );
}

export default UsersPage;
