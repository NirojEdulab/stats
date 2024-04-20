import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Flavanoids from "./components/Flavanoids";
import GammaStatistics from "./components/Gamma";
import { Button, Card, SimpleGrid, Space } from "@mantine/core";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            Component={() => (
              <div style={{ flex: "1", textAlign: "center" }}>
                <Card style={{ minWidth: "100%" }}>
                  <SimpleGrid cols={1} spacing="sm" verticalSpacing="sm">
                    <Flavanoids />
                    <GammaStatistics />
                  </SimpleGrid>
                  <Space h="lg" />
                </Card>
              </div>
            )}
          />
          <Route path="*" 
            Component={() => (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                Page not found!!!
                <Button component={Link} to={"/"}>Go to Home</Button>
              </div>
            )}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
