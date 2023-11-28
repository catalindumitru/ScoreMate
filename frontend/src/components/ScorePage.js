import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  Heading,
  Text,
  Button,
  AbsoluteCenter,
  Box,
  Grid,
  GridItem,
  Flex,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { getScore } from "../database/accessor";
import { USERNAME } from "../auth/user";

import "../style/ScorePage.css";

function ScorePage() {
  const { opponent } = useParams();
  const sessionScore = JSON.parse(sessionStorage.getItem("score"));
  const [score, setScore] = useState(
    sessionScore ? sessionScore[opponent] : {}
  );

  useEffect(() => {
    if (!sessionScore || !sessionScore[opponent]) {
      getScore(opponent).then((data) => {
        console.log(data);
        if (data["user1"] !== USERNAME) {
          [data["score1"], data["score2"]] = [data["score2"], data["score1"]];
          [data["user1"], data["user2"]] = [data["user2"], data["user1"]];
        }
        sessionStorage.setItem(
          "score",
          JSON.stringify({
            ...sessionScore,
            [opponent]: data,
          })
        );
        setScore(data);
      });
    }
  }, [opponent, sessionScore]);

  return (
    score && (
      <Grid
        templateRows="repeat(2, 1fr)"
        w="100%"
        h="100dvh"
        align="center"
        bg="#111418"
      >
        <GridItem rowSpan={1} alignSelf="center">
          <Card width="80%" bg="#0F1924">
            <CardHeader
              alignSelf="flex-start"
              marginBottom="40px"
              maxWidth="100%"
            >
              <Heading size="2xl" color="#8FC9F9">
                {" "}
                {USERNAME}
              </Heading>
            </CardHeader>
            <CardFooter alignSelf={"center"}>
              <Grid templateColumns="repeat(3, 1fr)" gap="10vw" maxWidth="100%">
                <GridItem colSpan={1} alignSelf={"center"}>
                  <Button bg="#66BB69" size="lg">
                    <Text fontSize="2xl">+</Text>
                  </Button>
                </GridItem>
                <GridItem colSpan={1} alignSelf={"center"}>
                  {" "}
                  <Text fontSize="5xl" align={"center"} color="#8FC9F9">
                    {score["score1"]}
                  </Text>
                </GridItem>
                <GridItem colSpan={1} alignSelf={"center"}>
                  <Button bg="#F44336" size="lg">
                    <Text fontSize="2xl">-</Text>
                  </Button>
                </GridItem>
              </Grid>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem rowSpan={1} alignSelf="center">
          <Card width="80%" bg="#0F1924">
            <CardHeader alignSelf={"center"}>
              <Grid
                templateColumns="repeat(3, 1fr)"
                gap={100}
                gap="10vw"
                maxWidth="100%"
              >
                <GridItem colSpan={1} alignSelf={"center"}>
                  <Button bg="#66BB69" size="lg">
                    <Text fontSize="2xl">+</Text>
                  </Button>
                </GridItem>
                <GridItem colSpan={1} alignSelf={"center"}>
                  {" "}
                  <Text fontSize="5xl" align={"center"} color="#8FC9F9">
                    {score["score2"]}
                  </Text>
                </GridItem>
                <GridItem colSpan={1} alignSelf={"center"}>
                  <Button bg="#F44336" size="lg">
                    <Text fontSize="2xl">-</Text>
                  </Button>
                </GridItem>
              </Grid>
            </CardHeader>
            <CardFooter alignSelf={"flex-end"} marginTop="40px" maxWidth="100%">
              <Heading size="2xl" color="#8FC9F9">
                {" "}
                {opponent}
              </Heading>
            </CardFooter>
          </Card>
        </GridItem>
      </Grid>
    )
  );
}

export default ScorePage;
