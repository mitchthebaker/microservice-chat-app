import { gql, useMutation } from "@apollo/client";
import { Button, Card, Classes, Elevation, FormGroup, InputGroup, Intent } from "@blueprintjs/core";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import { useRecoilState } from "recoil";

import userSessionAtom from "#root/recoil/atoms/userSession";
import useGenerateId from "#utils/hooks/forms/useGenerateId";
import toaster from "#utils/misc/toaster";

interface FormData {
  username: string;
  password: string;
}

const Form = styled.form`
  margin: auto;
  width: 25rem;
`;

const Heading = styled.strong.attrs({
  className: Classes.HEADING
})`
  display: block;
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
`;

const LargeFormGroup = styled(FormGroup)`
  .bp3-label {
    font-size: 1rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const mutation = gql`
  mutation($password: String!, $username: String!) {
    createUserSession(
      password: $password
      username: $username
    ) {
      user {
        username
      }
    }
  }
`;

const Login = () => {
  const { 
    control,
    handleSubmit, 
  } = useForm<FormData>();
  const [createUserSession] = useMutation(mutation);
  const generateId = useGenerateId();
  const [, setUserSession] = useRecoilState(userSessionAtom);

  const onSubmit = async ({ username, password }: FormData) => {
    try {
    const result = await createUserSession({ variables: { password, username}});
    console.log(result);
    } catch(err) {
      toaster.show({ intent: Intent.DANGER, message: "Something went wrong! Please try again." });
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}> 
        <Card elevation={Elevation.TWO}>
          <Heading> Chat App </Heading>
          <LargeFormGroup label="Username" labelFor={generateId("username")}>
            <Controller 
              control={control}
              name="username"
              render={({
                field: { onChange, onBlur, ref, value },
              }) => (
                <InputGroup 
                  defaultValue={value}
                  id={generateId("username")} 
                  inputRef={ref}
                  large 
                  onBlur={onBlur}
                  onChange={onChange}
                />
              )}
            />
          </LargeFormGroup>
          <LargeFormGroup label="Password" labelFor={generateId("password")}>
            <Controller
              control={control}
              name="password"
              render={({
                field: { onChange, onBlur, ref, value },
              }) => (
                <InputGroup 
                  defaultValue={value}
                  id={generateId("password")}
                  inputRef={ref}
                  large
                  onBlur={onBlur}
                  onChange={onChange}
                />
              )}
            />
          </LargeFormGroup>
          <Button intent={Intent.PRIMARY} large type="submit">
            Login
          </Button>
        </Card>
      </Form>
    </Wrapper>
  );
};

export default Login;

/*
<LargeFormGroup label="Password" labelFor={generateId("password")}>
            <InputGroup name="password" id={generateId("password")} large type="password" {...register("password"), { required: true }} />
          </LargeFormGroup>
*/