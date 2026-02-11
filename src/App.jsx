import Header from './components/organisms/Header';
import Card from './components/moleculas/Card';

function App() {
  const handleClick = () => {
    console.log("Button clicked");
  };

  return (
    <>
      <Header />
      <Card
        title="Card"
        level={2}
        buttonLabel="Submit"
        buttonVariant="secondary"
        buttonOnClick={handleClick}
      />
    </>
  );
}

export default App;