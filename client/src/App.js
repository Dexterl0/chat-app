import Router from "./Router";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </div>
  );
}

export default App;
