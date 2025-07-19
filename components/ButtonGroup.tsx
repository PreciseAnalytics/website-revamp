import styled from 'styled-components';
import { media, mq } from 'utils/media';

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  
  & > *:not(:last-child) {
    margin-right: 2rem;
  }
  
  ${mq('<=tablet', `
    & > * {
      width: 100%;
    }
    
    & > *:not(:last-child) {
      margin-bottom: 2rem;
      margin-right: 0rem;
    }
  `)}
`;

export default ButtonGroup;