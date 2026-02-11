import Header from './components/organisms/Header';
import Button from './components/atoms/Button';

function App() {
  const handleClick = () => {
    console.log("Button clicked");
  };

  return (
    <>
      <Header />
      <div>
        <Button
          text="Click me"
          onClick={() => console.log('Button clicked')}
        />
      </div>
    </>
  );
}

export default App;