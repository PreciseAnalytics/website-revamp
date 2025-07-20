import styled from 'styled-components';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import type { TinaMarkdownContent } from 'tinacms/dist/rich-text';
import { mq } from 'utils/media';
import ArticleImage from './ArticleImage';
import Code from './Code';
import Link from './Link';
import Quote from './Quote';

export default function RichText({ content }: { content: TinaMarkdownContent | TinaMarkdownContent[] }) {
  return (
    <Container>
      <TinaMarkdown content={content} components={components} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  section:not(:last-child) {
    margin-bottom: 3.8rem;
  }

  a {
    word-break: break-word;
  }

  ${mq('<=desktop', `
    .remark-highlight {
      width: 100%;
      overflow-x: auto;
    }
  `)}

  & > section,
  .footnotes {
    content-visibility: auto;
  }

  ol,
  ul {
    font-size: 1.8rem;
    line-height: 2.7rem;
    margin: 0;
    padding-left: 2.4rem;
    li {
      & > * {
        vertical-align: top;
      }
    }

    &:not(:last-child) {
      margin-bottom: 2.7rem;
    }
  }
`;

const Paragraph = styled.p`
  font-size: 1.8rem;
  line-height: 2.7rem;
  hanging-punctuation: first;

  &:not(:last-child) {
    margin-bottom: 2.7rem;
  }

  & + ul,
  & + li {
    margin-top: -1.5rem !important;
  }
`;

const SecondHeading = styled.h2`
  font-size: 2.5rem;
  line-height: 3.75rem;
  margin-bottom: 3.75rem;
`;

const ThirdHeading = styled.h3`
  font-size: 2.2rem;
  line-height: 3.4rem;
  margin-bottom: 3.4rem;
`;

const Break = styled.br`
  display: block;
  content: '';
  margin: 0;
  height: 3rem;
`;

const TextHighlight = styled.code`
  display: inline-block;
  padding: 0 0.6rem;
  color: rgb(var(--textSecondary));
  border-radius: 0.4rem;
  background-color: rgba(var(--primary), 0.8);
  font-size: 1.6rem;
  font-family: inherit;
`;

const components = {
  h2: (props: any) => <SecondHeading {...props} />,
  h3: (props: any) => <ThirdHeading {...props} />,
  p: (props: any) => <Paragraph {...props} />,
  br: (props: any) => <Break {...props} />,
  inlineCode: (props: any) => <TextHighlight {...props} />,
  img: (props: any) => <ArticleImage {...props} />,
  a: (props: any) => <Link {...props} />,
  code: (props: any) => <Code {...props} />,
  blockquote: (props: any) => <Quote {...props} />,
};
