import { AuthProvider } from "./AuthContext";
import Join from "./Join";
import SignUp from "./SignUp";

const RightBar = () => {
  return (
    <div className="d-flex justify-content-evenly buttons-user-join my-2">
      <AuthProvider>
        <Join />
        <SignUp />
      </AuthProvider>
    </div>
  );
};

export default RightBar;
