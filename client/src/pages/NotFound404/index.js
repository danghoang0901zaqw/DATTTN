import notFound from "~/assets/images/svg/notfound.svg";
import Button from "~/components/Button/Button";

import "./NotFound404.scss";

const NotFound = () => {
  return (
    <div className="notfound">
      <div className="notfound--img">
        <img src={notFound} alt="not-found" />
      </div>
      <Button className={"btn rounded"} to={"/"}>
        Back to Home Page
      </Button>
    </div>
  );
};

export default NotFound;
