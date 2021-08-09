import styled from "styled-components";
import Top from "../component/Top";

const index = () => {
  return (
    <Container>
      <p>aaaa</p>
      <Top />
    </Container>
  );
};

const Container = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
`;

export default index;
