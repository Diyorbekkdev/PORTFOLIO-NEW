import notFound from "../../assets/rafiki.png";
const NotFound = () => {
  return (
    <div className="notfound">
      <img src={notFound} alt="notfound" />
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
    </div>
  );
};

export default NotFound;
