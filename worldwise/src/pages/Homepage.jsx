
import PageNav from "../components/PageNav";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";

function Homepage() {


  return (
    <main className={styles.homepage}>
      <PageNav/>
      <section>
        <h1>
          You travel the World
          <br />
          WorldWise keep track Your Adventures
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <Link to='login' className="cta" >Start Tracking Now</Link>
      </section>
    </main>
  );
}

export default Homepage;
