import { FC, FormEvent } from "react";
import styled from "styled-components";
import { Card } from "../../components/Card";
import { primary, primaryAccessible } from "../../theme/colors";
import { Input } from "../../components/Input";
import { fetchSession } from "../../redux/reducers/user";
import { useAppDispatch } from "../../redux/hooks";

export const LoginView: FC = () => {
  const dispatch = useAppDispatch();

  const handleSubmitForm = (event: FormEvent) => {
    event.preventDefault();

    const data = new FormData(event.target as HTMLFormElement);
    dispatch(
      fetchSession(
        Object.fromEntries(data) as {
          client_id: string;
          email: string;
          name: string;
        }
      )
    );
  };

  return (
    <Center>
      <LoginCard>
        <form onSubmit={handleSubmitForm}>
          <LoginForm>
            Login
            <input
              type={"hidden"}
              name={"client_id"}
              value={"ju16a6m81mhid5ue1z3v2g0uh"}
            />
            <Input label={"Name: "} name={"name"} type={"text"} required />
            <Input label={"Email: "} name={"email"} type={"email"} required />
            <StyledButton type="submit">GO</StyledButton>
          </LoginForm>
        </form>
      </LoginCard>
    </Center>
  );
};

const LoginCard = styled(Card)`
  max-width: 300px;
`;

const Center = styled.div`
  background-color: antiquewhite;
  display: grid;
  width: 100vw;
  height: 100vh;
  align-content: center;
  justify-items: center;
`;

const StyledButton = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  color: ${primaryAccessible};
  background-color: ${primary};
  align-self: self-end;
  font-weight: bold;

  &:hover {
    background-color: darkblue;
    cursor: pointer;
  }
`;

const LoginForm = styled.div`
  color: black;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
