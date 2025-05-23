import './App.css';
import Chessboard from './components/Chessboard/Chessboard';

const App = () => {
    return (
        <div className="app-container">
            <div className="side-panel left-panel">
                <p>Left Panel</p>
            </div>
            <div className="center-panel">
                <Chessboard />
            </div>
            <div className="side-panel right-panel">
                <p>Right Panel</p>
            </div>
        </div>
    );
};

export default App;
