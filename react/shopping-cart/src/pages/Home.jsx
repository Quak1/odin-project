import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main>
      <div>
        <h1>Lorem ipsum dolor sit amet consectetur.</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis veniam
          sed neque saepe velit, consequuntur adipisci perferendis ratione quo
          nesciunt! At animi illo, quos magnam delectus porro ex. Velit, iure.
        </p>
        <Link to="/store">Store</Link>
      </div>
      <div>
        <img src="/home.jpg" alt="Consumer electronics" />
      </div>
    </main>
  );
};

export default Home;
