import styled from '@emotion/styled';

const List = styled.div`
  flex: 1;
`;

const ListTitle = styled.h3`
  font-weight: bold;
  letter-spacing: 0.05em;
`;

const Split = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 0.75em;
`;

export default ({ cons, pros }) => (
  <Split>
    <List>
      <ListTitle>PROS</ListTitle>

      <ul>
        {pros.map(pro => (
          <li key={pro}>{pro}</li>
        ))}
      </ul>
    </List>

    <List>
      <ListTitle>CONS</ListTitle>

      <ul>
        {cons.map(con => (
          <li key={con}>{con}</li>
        ))}
      </ul>
    </List>
  </Split>
);
