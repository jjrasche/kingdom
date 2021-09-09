export var PlayerType;
(function (PlayerType) {
    PlayerType[PlayerType["Human"] = 0] = "Human";
    PlayerType[PlayerType["RandomLogic"] = 1] = "RandomLogic";
    PlayerType[PlayerType["BestLogic"] = 2] = "BestLogic";
    PlayerType[PlayerType["AI"] = 3] = "AI";
})(PlayerType || (PlayerType = {}));
export class Player {
    constructor() {
        this.alive = true;
    }
}
//# sourceMappingURL=player.js.map