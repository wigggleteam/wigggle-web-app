import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Grid, Icon, Button } from 'semantic-ui-react';
import styles from './event.module.less';

export const EventHeading = ({ title, tags, shareUrl }) => {
  const textAreaRef = useRef(null);

  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    setCopied(true);
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    setTimeout(() => setCopied(false), 4000);
  };

  return (
    <Grid className={styles.headingSection}>
      <Grid.Row columns={2}>
        <Grid.Column>
          <Title>{title}</Title>
          <Languages>{tags.join(' | ')}</Languages>
        </Grid.Column>
        <Grid.Column>
          <Button basic onClick={handleCopy} className={styles.copyButton}>
            {!copied
              && (
              <div className={styles.shareButton}>
                <Icon name="share square outline" />
                {' '}
                Share
              </div>
              )}
            { copied
              && (
              <div className={styles.copied}>
                <Icon name="copy" />
                {' '}
                Copied
              </div>
              )}
          </Button>
          <textarea
            style={{ opacity: 0 }}
            ref={textAreaRef}
            value={shareUrl}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const Title = styled.h1`
  margin: 0;
`;

const Languages = styled.h4`
  font-weight: 600;
  font-size: 18px;
  margin: 10px 0;
`;
