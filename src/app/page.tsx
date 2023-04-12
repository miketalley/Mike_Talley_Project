import Characters from './components/Characters';
import Movies from './components/Movies';
import Quotes from './components/Quotes';

export default function Home() {
  return (
    <div className="container">
      <h1>Lab of the Rings</h1>
      <h2>Making it easy for developers to consume information about the trilogy</h2>
      <Characters />
      <Movies />
      <Quotes />
    </div>
  )
}
