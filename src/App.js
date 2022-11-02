import './App.css';
import { TweetForm } from './components/tweetForm';
import { TweetList } from './components/tweetList';

function App() {
  return (
    <div className="App">
      <TweetForm />
      <hr />
      <TweetList />
    </div>
  );
}

export default App;
