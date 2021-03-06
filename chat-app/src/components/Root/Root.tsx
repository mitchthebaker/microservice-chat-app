import React, { useState, useEffect } from "react";
import { gql } from "@apollo/client";
import { Spinner } from "@blueprintjs/core";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import apolloClient from "#root/api/apolloClient";
import userSessionAtom from "#root/recoil/atoms/userSession";

import Initialized from "./Initialized/Initialized";

const SpinnerWrapper = styled.div`
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
`;

const query = gql`
  {
    userSession(me: true) {
      user {
        username
      }
    }
  }
`;

const Root = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [, setUserSession] = useRecoilState(userSessionAtom);

  useEffect(() => {
    apolloClient.query({ query }).then((res) => {
      const userSession = res.data?.userSession ?? null;
      setUserSession(userSession);
      setIsLoading(false);
    });
  }, []);

  return isLoading ? (
    <SpinnerWrapper>
      <Spinner />
    </SpinnerWrapper>
  ) : (
    <Initialized />
  );
};

export default Root;