import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const Home = () => {
  return (
    <div className="my-10 mx-5">
      <Button asChild>
        <Link to="/">Home</Link>
      </Button>
    </div>
  );
};

export default Home;
