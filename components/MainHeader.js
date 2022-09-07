import styles from '../styles/MainImage.module.css';

const MainHeader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <ul className={styles.dynamictxts}>
          <li className={styles.dynamicli}>
            <span className={styles.dynamicspan}>Discover</span>
          </li>
          <li className={styles.dynamicli}>
            <span className={styles.dynamicspan}>Inspire</span>
          </li>
          <li className={styles.dynamicli}>
            <span className={styles.dynamicspan}>Create</span>
          </li>
          <li className={styles.dynamicli}>
            <span className={styles.dynamicspan}>Share</span>
          </li>
        </ul>
        <div className={styles.statictxt}>Ideas</div>
      </div>
    </div>
  );
};

export default MainHeader;
