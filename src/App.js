import "./App.css";
import Home from "./Components/Home";
import useUser from "./Hooks/useUser";
import SigninView from "./Views/SignInView";

function App() {
  const user = useUser();
  
  if (user && Object.keys(user).length > 0) return <Home />;
  return <SigninView />;
}
export default App;
