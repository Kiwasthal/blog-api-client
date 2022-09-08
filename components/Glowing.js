import styles from '../styles/Glowing.module.css';

const Glowing = () => {
  return (
    <div className={styles.container}>
      <div className={styles.glowing}>
        <span className={styles.firstPrt}></span>
        <span className={styles.secondPrt}></span>
        <span className={styles.thirdPrt}></span>
      </div>
    </div>
  );
};

export default Glowing;
