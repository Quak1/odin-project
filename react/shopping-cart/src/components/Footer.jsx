import { Link } from "react-router-dom";
import styles from "./styles/Footer.module.css";
import TwitterIcon from "./icons/TwitterIcon";
import FacebookIcon from "./icons/FacebookIcon";
import InstagramIcon from "./icons/InstagramIcon";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <h3 className={styles.title}>Store</h3>
      <ul className={styles.linkList}>
        <li>
          <Link to="#">Home</Link>
        </li>
        <li>
          <Link to="#">About</Link>
        </li>
        <li>Discount codes:</li>
        <li>DISC10</li>
        <li>DISC15</li>
        <li>DISC20</li>
      </ul>

      <ul className={styles.socials}>
        <li>
          <Link to="#">
            <TwitterIcon />
          </Link>
        </li>
        <li>
          <Link to="#">
            <FacebookIcon />
          </Link>
        </li>
        <li>
          <Link to="#">
            <InstagramIcon />
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
