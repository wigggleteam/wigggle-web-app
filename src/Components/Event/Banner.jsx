import React from 'react';
import { Image } from 'semantic-ui-react';
import styles from './event.module.less';

export const Banner = ({ imagesUrl }) => {

  const defaultImage = imagesUrl[0];

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.coverContainer}>
        <Image src={imagesUrl[0]} className={styles.coverImage} />
      </div>
      <div className={styles.rightContainer}>
        <Image src={imagesUrl[1] || defaultImage} className={styles.generalImage} />
        <Image src={imagesUrl[2] || defaultImage} className={styles.generalImage} />
        <Image src={imagesUrl[3] || defaultImage} className={styles.generalImage} />
      </div>
      <div style={{ clear: 'both' }} />
    </div>
  );
};
