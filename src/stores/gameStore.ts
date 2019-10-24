import {observable, action} from 'mobx';
import {Main as Snake_main} from "../components/snake-game/Main"

interface Game {
    start();
    handle_key(keyCode: number);
    end();
}

export default class GameStore {
    @observable game: string = 'snake';
    @observable score : number = 0;
    @observable isStart: boolean = false;
    @observable Game: Game;

    @action.bound start(game: string) {
        this.isStart = true;
        this.Game = this.gameFactory(game);
        this.Game.start();
    }

    @action.bound addScore() {
        this.score++;
    }

    @action.bound resetScore() {
        this.score = 0;
    }

    @action.bound restart(game: string) {
        if(!this.Game){
            this.start(game);
            return;
        }
        this.Game.end();
        this.Game = this.gameFactory(game);
        this.Game.start();
        this.isStart = true;
    }

    @action.bound handle_key(keyCode: number) {
        if(!this.Game) {
            return
        }
        this.Game.handle_key(keyCode);
    }

    @action.bound quit() {
        this.isStart = false;
        this.Game = null;
    }

    gameFactory(game: string): Game {
        switch(game) {
            case "snake": return new Snake_main();
        }
        return null;
    }
};