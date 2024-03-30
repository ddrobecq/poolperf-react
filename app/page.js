import Game from './games/page';
import { _DEBUG } from './lib/tools';

export default function Home(props) {
  return (
    <Game {...props} />
  );
}
