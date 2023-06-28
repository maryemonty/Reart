import { AuthProvider } from "./AuthContext";
import Join from "./Join";
import SignUp from "./SignUp";

function RightBar() {
  return (
    <AuthProvider>
      <div className="d-flex justify-content-evenly buttons-user-join mb-5">
        <Join />
        <SignUp />
      </div>
    </AuthProvider>
  );
}

export default RightBar;
