import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  Heading,
  Text,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { getScore, updateScore } from "../database/accessor";
import { USERNAME } from "../auth/user";

import "../style/ScorePage.css";

function ScorePage() {
  const { opponent } = useParams();
  const sessionScore = JSON.parse(sessionStorage.getItem("score"));
  const [score, setScore] = useState(
    sessionScore ? sessionScore[opponent] : {}
  );

  const parseScoreDB = useCallback(
    (scoreDB) => {
      const score = {};
      [score[USERNAME], score[opponent]] =
        scoreDB["user1"] === USERNAME
          ? [scoreDB["score1"], scoreDB["score2"]]
          : [scoreDB["score2"], scoreDB["score1"]];

      return score;
    },
    [opponent]
  );

  const updateSessionScore = useCallback(
    (newScore) => {
      sessionStorage.setItem(
        "score",
        JSON.stringify({
          ...sessionScore,
          [opponent]: newScore,
        })
      );
    },
    [opponent, sessionScore]
  );

  useEffect(() => {
    const fetchData = async () => {
      if (sessionScore && sessionScore[opponent]) return;

      const newScore = parseScoreDB(await getScore(USERNAME, opponent));
      setScore(newScore);
      updateSessionScore(newScore);
    };

    fetchData();
  }, [opponent, sessionScore, parseScoreDB, updateSessionScore]);

  function handleScoreButton(target, operation) {
    return async () => {
      await updateScore(USERNAME, opponent, target, operation);
      const newScore = {
        ...score,
        [target]:
          operation === "increase" ? score[target] + 1 : score[target] - 1,
      };
      setScore(newScore);
      updateSessionScore(newScore);
    };
  }

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
                  <Button
                    bg="#66BB69"
                    size="lg"
                    onClick={handleScoreButton(USERNAME, "increase")}
                  >
                    <Text fontSize="2xl">+</Text>
                  </Button>
                </GridItem>
                <GridItem colSpan={1} alignSelf={"center"}>
                  {" "}
                  <Text fontSize="5xl" align={"center"} color="#8FC9F9">
                    {score[USERNAME]}
                  </Text>
                </GridItem>
                <GridItem colSpan={1} alignSelf={"center"}>
                  <Button
                    bg="#F44336"
                    size="lg"
                    onClick={handleScoreButton(USERNAME, "decrease")}
                  >
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
              <Grid templateColumns="repeat(3, 1fr)" gap="10vw" maxWidth="100%">
                <GridItem colSpan={1} alignSelf={"center"}>
                  <Button
                    bg="#66BB69"
                    size="lg"
                    onClick={handleScoreButton(opponent, "increase")}
                  >
                    <Text fontSize="2xl">+</Text>
                  </Button>
                </GridItem>
                <GridItem colSpan={1} alignSelf={"center"}>
                  {" "}
                  <Text fontSize="5xl" align={"center"} color="#8FC9F9">
                    {score[opponent]}
                  </Text>
                </GridItem>
                <GridItem colSpan={1} alignSelf={"center"}>
                  <Button
                    bg="#F44336"
                    size="lg"
                    onClick={handleScoreButton(opponent, "decrease")}
                  >
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
