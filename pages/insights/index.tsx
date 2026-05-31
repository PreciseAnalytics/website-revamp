import Head from 'next/head';
import Link from 'next/link';
import path from 'path';
import fs from 'fs';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { GetStaticProps } from 'next';
import AnimatedHeader from 'components/AnimatedHeader';
import Container from 'components/Container';
import { media } from 'utils/media';

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

interface Props {
  posts: Post[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const filePath = path.join(process.cwd(), 'content', 'insights.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  const posts: Post[] = JSON.parse(raw);

  return {
    props: { posts: posts.sort((a, b) => b.date.localeCompare(a.date)) },
    revalidate: 43200, // rebuild every 12 hours
  };
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function InsightsIndex({ posts }: Props) {
  return (
    <>
      <Head>
        <title>Insights from the Deployment Floor | Precise Analytics | Data Engineering & AI</title>
        <meta
          name="description"
          content="Practical guides, case studies, and hard-won lessons from putting data infrastructure into production. By the team at Precise Analytics."
        />
        <meta property="og:title" content="Insights from the Deployment Floor | Precise Analytics" />
        <meta property="og:description" content="Practical guides and lessons from putting data infrastructure into production." />
        <meta property="og:type" content="website" />
      </Head>
      <AnimatedHeader />
      <PageWrapper>
        <Container>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <PageHeader>
              <OverTitle>Insights</OverTitle>
              <PageTitle>Insights from the Deployment Floor</PageTitle>
              <PageSubtitle>
                Practical guides, case studies, and hard-won lessons from putting data infrastructure into production.
              </PageSubtitle>
            </PageHeader>
          </motion.div>

          <PostGrid>
            {posts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <PostCard>
                  <PostMeta>
                    <PostDate>{formatDate(post.date)}</PostDate>
                    <TagsRow>
                      {post.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </TagsRow>
                  </PostMeta>
                  <PostTitle>
                    <PostTitleLink href={`/insights/${post.slug}`}>{post.title}</PostTitleLink>
                  </PostTitle>
                  <PostExcerpt>{post.excerpt}</PostExcerpt>
                  <ReadMore href={`/insights/${post.slug}`}>Read more →</ReadMore>
                </PostCard>
              </motion.div>
            ))}
          </PostGrid>

          <CtaSection>
            <CtaTitle>Want results, not just reading material?</CtaTitle>
            <CtaText>Schedule a free consultation — we&apos;ll diagnose your data stack in 30 minutes.</CtaText>
            <CtaButton href="/schedule-consult">Schedule a Consultation →</CtaButton>
          </CtaSection>
        </Container>
      </PageWrapper>
    </>
  );
}

const PageWrapper = styled.div`padding: 4rem 0 8rem;`;

const PageHeader = styled.div`
  text-align: center;
  max-width: 80rem;
  margin: 0 auto 5rem;
`;

const OverTitle = styled.p`
  font-size: 1.3rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgb(255, 125, 0);
  margin-bottom: 1.2rem;
`;

const PageTitle = styled.h1`
  font-size: 5rem;
  font-weight: 800;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.6rem;

  ${media.tablet(`font-size: 3.6rem;`)}
`;

const PageSubtitle = styled.p`
  font-size: 1.9rem;
  line-height: 1.65;
  color: rgba(var(--text), 0.7);

  ${media.tablet(`font-size: 1.6rem;`)}
`;

const PostGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 85rem;
  margin: 0 auto 6rem;
`;

const PostCard = styled.article`
  background: rgba(var(--cardBackground), 0.85);
  border: 1px solid rgba(var(--text), 0.1);
  border-radius: 1.4rem;
  padding: 3.2rem;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:hover {
    border-color: rgba(255, 125, 0, 0.35);
    box-shadow: 0 6px 24px rgba(255, 125, 0, 0.08);
  }
`;

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  margin-bottom: 1.2rem;
  flex-wrap: wrap;
`;

const PostDate = styled.span`
  font-size: 1.3rem;
  color: rgba(var(--text), 0.5);
  font-weight: 500;
`;

const TagsRow = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  padding: 0.25rem 0.8rem;
  border-radius: 0.4rem;
  background: rgba(var(--text), 0.07);
  color: rgba(var(--text), 0.65);
  border: 1px solid rgba(var(--text), 0.1);
`;

const PostTitle = styled.h2`
  font-size: 2.6rem;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 1rem;

  ${media.tablet(`font-size: 2.1rem;`)}
`;

const PostTitleLink = styled(Link)`
  color: rgb(var(--text));
  text-decoration: none;
  transition: color 0.2s;

  &:hover { color: rgb(255, 125, 0); }
`;

const PostExcerpt = styled.p`
  font-size: 1.6rem;
  line-height: 1.7;
  color: rgba(var(--text), 0.75);
  margin-bottom: 1.6rem;
`;

const ReadMore = styled(Link)`
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(255, 125, 0);
  text-decoration: none;

  &:hover { text-decoration: underline; color: rgb(255, 165, 0); }
`;

const CtaSection = styled.div`
  max-width: 85rem;
  margin: 0 auto;
  text-align: center;
  padding: 4rem;
  background: linear-gradient(135deg, rgba(255, 125, 0, 0.08), rgba(255, 165, 0, 0.04));
  border: 1px solid rgba(255, 125, 0, 0.2);
  border-radius: 1.6rem;
`;

const CtaTitle = styled.h3`
  font-size: 2.8rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin-bottom: 0.8rem;

  ${media.tablet(`font-size: 2.2rem;`)}
`;

const CtaText = styled.p`
  font-size: 1.7rem;
  color: rgba(var(--text), 0.7);
  margin-bottom: 2.2rem;
`;

const CtaButton = styled(Link)`
  display: inline-block;
  background: linear-gradient(135deg, rgb(255, 125, 0), rgb(255, 165, 0));
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  padding: 1.4rem 3rem;
  border-radius: 0.9rem;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 125, 0, 0.35);
  }
`;
