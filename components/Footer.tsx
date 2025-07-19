import NextLink from 'next/link';
import { FacebookIcon, LinkedinIcon, TwitterIcon } from 'react-share';
import styled from 'styled-components';
import Container from 'components/Container';
import { media, mq } from 'utils/media';

type SingleFooterListItem = { title: string; href: string };
type FooterListItems = SingleFooterListItem[];
type SingleFooterList = { title: string; items: FooterListItems };
type FooterItems = SingleFooterList[];

const footerItems: FooterItems = [
  {
    title: 'Solutions',
    items: [
      { title: 'ETL & Data Integration', href: '/solutions#etl-integration' },
      { title: 'Custom Dashboards', href: '/solutions#custom-dashboards' },
      { title: 'AI & ML Solutions', href: '/solutions#ai-ml-solutions' },
      { title: 'Data Strategy', href: '/solutions#data-strategy' },
    ],
  },
  {
    title: 'Industries',
    items: [
      { title: 'Healthcare', href: '/industries?industry=healthcare' },
      { title: 'Manufacturing', href: '/industries?industry=manufacturing' },
      { title: 'Finance', href: '/industries?industry=fintech' },
      { title: 'Retail', href: '/industries?industry=retail' },
    ],
  },
  {
    title: 'Company',
    items: [
      { title: 'About Us', href: '/about-us' },
      { title: 'Services', href: '/services' },
      { title: 'Contact', href: '/contact' },
      { title: 'Capabilities Statement', href: '/capabilities-statement' },
    ],
  },
  {
    title: 'Legal',
    items: [
      { title: 'Privacy Policy', href: '/privacy-policy' },
      { title: 'Terms of Service', href: '/terms-of-service' },
      { title: 'Cookies Policy', href: '/cookies-policy' },
    ],
  },
];

export default function Footer() {
  return (
    <FooterWrapper>
      <Container>
        <ListContainer>
          {footerItems.map((singleItem) => (
            <FooterList key={singleItem.title} {...singleItem} />
          ))}
        </ListContainer>
        <BottomBar>
          <ShareBar>
            <NextLink href="https://www.twitter.com/preciseanalytics">
              <TwitterIcon size={50} round={true} />
            </NextLink>

            <NextLink href="https://www.facebook.com/preciseanalytics">
              <FacebookIcon size={50} round={true} />
            </NextLink>

            <NextLink href="https://www.linkedin.com/company/precise-analytics">
              <LinkedinIcon size={50} round={true} />
            </NextLink>
          </ShareBar>
          <Copyright>&copy; Copyright 2025 Precise Analytics</Copyright>
        </BottomBar>
      </Container>
    </FooterWrapper>
  );
}

function FooterList({ title, items }: SingleFooterList) {
  return (
    <ListWrapper>
      <ListHeader>{title}</ListHeader>
      {items.map((singleItem) => (
        <ListItem key={singleItem.href} {...singleItem} />
      ))}
    </ListWrapper>
  );
}

function ListItem({ title, href }: SingleFooterListItem) {
  return (
    <ListItemWrapper>
      <NextLink href={href}>{title}</NextLink>
    </ListItemWrapper>
  );
}

const FooterWrapper = styled.div`
  padding-top: 10rem;
  padding-bottom: 4rem;
  background: rgb(var(--secondary));
  color: rgb(var(--textSecondary));
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ListHeader = styled.p`
  font-weight: bold;
  font-size: 2.25rem;
  margin-bottom: 2.5rem;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5rem;
  margin-right: 5rem;

  & > *:not(:first-child) {
    margin-top: 1rem;
  }

  ${mq('<=tablet', `
    flex: 0 40%;
    margin-right: 1.5rem;
  `)}

  ${mq('<=phone', `
    flex: 0 100%;
    margin-right: 0rem;
  `)}
`;

const ListItemWrapper = styled.p`
  font-size: 1.6rem;

  a {
    text-decoration: none;
    color: rgba(var(--textSecondary), 0.75);
  }
`;

const ShareBar = styled.div`
  & > *:not(:first-child) {
    margin-left: 1rem;
  }
`;

const Copyright = styled.p`
  font-size: 1.5rem;
  margin-top: 0.5rem;
`;

const BottomBar = styled.div`
  margin-top: 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${mq('<=tablet', 'flex-direction: column;')}
`;