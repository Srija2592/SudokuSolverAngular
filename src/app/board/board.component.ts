import { Component } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {

  print(){
    console.log("hello");
  }


  board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]];

  EMPTY_CELL = ".";
  NUMBER_OF_ROWS = 9;
  NUMBER_OF_COLUMNS = 9;
  SUB_BOARD_WIDTH = 3;
  SUB_BOARD_HEIGHT = 3;

  solveSudoku(board: string[][]): void {
    
    this.solve(board);
  };

  solve(board: string[][]) : boolean{
    for(let i = 0 ; i < this.NUMBER_OF_ROWS ; i++){
      for(let j = 0 ; j < this.NUMBER_OF_COLUMNS ; j++){

        // only check the possible values if cell is empty
        if(board[i][j] === this.EMPTY_CELL){

          // check values from 1 through 9
          for(let val = 1 ; val <= 9 ; val++) {
            if(this.check(i, j, String(val), board)) {

              // if the value passes the check function
              // then try to use it in the board
              board[i][j] = String(val)
              if(this.solve(board))
                return true;

              // if value didn't work, empty the cell
              // and try a different value
              board[i][j] = ".";
            }
          }

          // if none of the values work for this cell
          // backtrack and try a diffent value
          return false;
        }
      }
    }

    // This will be reached when all the cells are filled
    return true;
  }

  check(row: number, column:number, value: string, board: string[][]){
    for(let i = 0 ; i < this.NUMBER_OF_COLUMNS ; i++)
      if(board[row][i] === value)
        return false;

    for(let i = 0 ; i < this.NUMBER_OF_ROWS ; i++)
      if(board[i][column] === value)
        return false;

    const subBoardRows = Math.floor(row / this.SUB_BOARD_HEIGHT) * this.SUB_BOARD_HEIGHT;
    const subBoardColumns = Math.floor(column / this.SUB_BOARD_WIDTH) * this.SUB_BOARD_WIDTH;

    for(let i = 0 ; i < this.SUB_BOARD_HEIGHT ; i++)
      for(let j = 0 ; j < this.SUB_BOARD_WIDTH ; j++)
        if(board[i + subBoardRows][j + subBoardColumns] === value)
          return false;
    return true;
  }


}
