import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <main className={styles.container}>
      <div className={styles.infoContainer}>
        <h1 className={styles.title}>
          Lorem ipsum <span className={styles.blueText}>dolor</span> sit
          consectetur.
        </h1>
        <p className={styles.info}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis veniam
          sed neque saepe velit, consequuntur adipisci perferendis ratione quo
          nesciunt!
        </p>
        <Link to="/store" className={styles.linkButton}>
          Store
        </Link>
      </div>
      <div className={styles.imageContainer}>
        <img src="/home.jpg" alt="Consumer electronics" />
      </div>
    </main>
  );
};

export default Home;
