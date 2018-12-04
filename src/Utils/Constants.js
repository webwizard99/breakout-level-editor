// Copied from gameController in Main.js
const Constants = {
    levelSize: {
        x: 640,
        y: 480 
    },
    columnsProto: 16,
    rowsProto: 32,
    
    cell: {
        width: (640 / 16),
        height: (480 / 32)
    },

    blockProto: {
        width: ((640 / 16) * 0.95),
        height: ((480 / 32) * 0.90)
    },

    maxRows: 14

};

export default Constants;

