import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Container from 'components/Container';
import { formatDate } from 'utils/formatDate';
import { media } from 'utils/media';
import { getReadTime } from 'utils/readTime';
import Header from 'views/SingleArticlePage/Header';
import MetadataHead from 'views/SingleArticlePage/MetadataHead';
import OpenGraphHead from 'views/SingleArticlePage/OpenGraphHead';
import ShareWidget from 'views/SingleArticlePage/ShareWidget';
import StructuredDataHead from 'views/SingleArticlePage/StructuredDataHead';
import ArticleImage from 'components/ArticleImage';
import Code from 'components/Code';
import Link from 'components/Link';
import Quote from 'components/Quote';

interface PostData {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  imageUrl: string;
  body: MDXRemoteSerializeResult;
}

interface SingleArticlePageProps {
  slug: string;
  data: {
    getPostsDocument: {
      data: PostData;
    };
  };
}

export default function SingleArticlePage(props: SingleArticlePageProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [readTime, setReadTime] = useState('');

  useEffect(() => {
    calculateReadTime();
    lazyLoadPrismTheme();

    function calculateReadTime() {
      const currentContent = contentRef.current;
      if (currentContent) {
        setReadTime(getReadTime(currentContent.textContent || ''));
      }
    }

    function lazyLoadPrismTheme() {
      const prismThemeLinkEl = document.querySelector('link[data-id="prism-theme"]');

      if (!prismThemeLinkEl) {
        const headEl = document.querySelector('head');
        if (headEl) {
          const newEl = document.createElement('link');
          newEl.setAttribute('data-id', 'prism-theme');
          newEl.setAttribute('rel', 'stylesheet');
          newEl.setAttribute('href', '/prism-theme.css');
          newEl.setAttribute('media', 'print');
          newEl.setAttribute('onload', "this.media='all'; this.onload=null;");
          headEl.appendChild(newEl);
        }
      }
    }
  }, []);

  const { slug, data } = props;
  const content = data.getPostsDocument.data.body;

  // MDX components for rendering
  const components = {
    Quote: (props: any) => <Quote {...props} />,
    ArticleImage: (props: any) => <ArticleImage {...props} />,
    Code: (props: any) => <Code {...props} />,
  };

  if (!data) {
    return null;
  }
  const { title, description, date, tags, imageUrl } = data.getPostsDocument.data;
  const meta = { 
    title, 
    description, 
    date: date, 
    tags: Array.isArray(tags) ? tags.join(', ') : '', 
    imageUrl, 
    author: '' 
  };
  const formattedDate = formatDate(new Date(date));
  const absoluteImageUrl = imageUrl.replace(/\/+/, '/');
  return (
    <>
      <OpenGraphHead slug={slug} {...meta} />
      <StructuredDataHead slug={slug} {...meta} />
      <MetadataHead {...meta} />
      <CustomContainer id="content" ref={contentRef}>
        <ShareWidget title={title} slug={slug} />
        <Header title={title} formattedDate={formattedDate} imageUrl={absoluteImageUrl} readTime={readTime} />
        <MDXRemote {...content} components={components} />
      </CustomContainer>
    </>
  );
}

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  
  try {
    const filenames = fs.readdirSync(postsDirectory);
    const paths = filenames
      .filter(name => name.endsWith('.mdx'))
      .map(name => ({
        params: { slug: name.replace('.mdx', '') }
      }));

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    return {
      paths: [],
      fallback: false,
    };
  }
}

export async function getStaticProps({ params }: GetStaticPropsContext<{ slug: string }>) {
  const { slug } = params as { slug: string };
  
  try {
    const postsDirectory = path.join(process.cwd(), 'posts');
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data: frontMatter, content } = matter(fileContents);

    // Serialize the MDX content
    const mdxSource = await serialize(content);

    // Ensure tags is always an array
    let tags = frontMatter.tags || [];
    if (typeof tags === 'string') {
      tags = tags.split(',').map((tag: string) => tag.trim());
    }

    const data = {
      getPostsDocument: {
        data: {
          title: frontMatter.title || 'Untitled',
          description: frontMatter.description || '',
          date: frontMatter.date || new Date().toISOString(),
          tags: tags,
          imageUrl: frontMatter.imageUrl || '/demo-illustration-1.svg',
          body: mdxSource,
        }
      }
    };

    return {
      props: { 
        slug, 
        data 
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

const CustomContainer = styled(Container)`
  position: relative;
  max-width: 90rem;
  margin: 10rem auto;

  ${media.tablet(`
    margin: 5rem auto;
  `)}
`;

