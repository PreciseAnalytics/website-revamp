import React from 'react';
import styled from 'styled-components';

import playIcon from '../public/play-icon.svg';

interface YoutubeVideoProps {
  title?: string;
  url: string;
}

export default function YoutubeVideo(props: YoutubeVideoProps) {
  const { title, url } = props;
  const videoHash = extractVideoHashFromUrl(url);
  const safeTitle = escapeHtmlAttr(title || 'YouTube video');
  const srcDoc = `<style>
  * {
    padding: 0;
    margin: 0;
    overflow: hidden;
  }
  
  html,
  body {
    height: 100%
  }
  
  img,
  span {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    margin: auto;
  }

  .thumbnail {
    object-fit: cover;
  }
  
  .play {
    display: flex;
    justify-content: center;
    display: block;
    height: 10vw;
    width: 100%;
  }
  </style>
  <a style="color: rgb(var(--primary))" href="https://www.youtube.com/embed/${videoHash}?autoplay=1">
    <img class="thumbnail" src="https://img.youtube.com/vi/${videoHash}/hqdefault.jpg" width="1280" height="720" alt="${safeTitle} thumbnail">
    <img class="play" src="${playIcon}" width="256" height="256" alt="Play the video">
  </a>`;
  return (
    <VideoContainer>
      <VideoFrame
        className=""
        width="100%"
        height="100%"
        src=""
        srcDoc={srcDoc}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={title}
        loading="lazy"
      />
    </VideoContainer>
  );
}

function extractVideoHashFromUrl(url: string) {
  try {
    const u = new URL(url);

    // Standard watch URL: https://www.youtube.com/watch?v=VIDEO_ID
    const v = u.searchParams.get('v');
    if (v) return v;

    // Short URL: https://youtu.be/VIDEO_ID
    if (u.hostname === 'youtu.be') return u.pathname.replace('/', '');

    // Embed URL: https://www.youtube.com/embed/VIDEO_ID
    const parts = u.pathname.split('/').filter(Boolean);
    const embedIndex = parts.indexOf('embed');
    if (embedIndex !== -1 && parts[embedIndex + 1]) return parts[embedIndex + 1];

    return '';
  } catch {
    return '';
  }
}

function escapeHtmlAttr(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export const VideoContainer = styled.div`
  display: flex;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  -webkit-mask-image: -webkit-radial-gradient(white, black);

  &:before {
    display: block;
    content: '';
    width: 100%;
    padding-top: 56.25%;
  }
`;

const VideoFrame = styled.iframe`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
