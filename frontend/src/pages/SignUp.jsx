import SignUpForm from "../components/SignUpForm";

const SignUp = () => {
  return (
    <div className="d-flex  container px-5 container">
      <div className="row container d-flex  mt-5 pt-5">
        <div className="col-md-7 container pt-5">
          <h1 className="text-secondary">
            The <span className="text-primary">Social</span> Network
          </h1>
          <p className="fs-2 display-1 pt-3 ">
            Connect with your friend, family and Loved ones Instantly.
          </p>
          <p className="fs-5 display-5 pt-3">
            <b className="text-decoration-underline">socialnetwork</b> helps you
            to connect and exchange thoughts, ideas, and content with your{" "}
            <span className="text-success">friends</span>, colleagues and{" "}
            <span className="text-danger">loved</span> ones. It's as easy as
            using the form on the right and begin sharing what's on your mind!
          </p>
        </div>
        <div className="col-md-4">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
