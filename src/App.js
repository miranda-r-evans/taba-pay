import { ActiveNodeProvider } from "./context/ActiveNodeContext";
import Page from "./Page";

function App() {
  return (
    <div className="App">
      <ActiveNodeProvider>
        <Page/>
      </ActiveNodeProvider>
    </div>
  );
}

export default App;
