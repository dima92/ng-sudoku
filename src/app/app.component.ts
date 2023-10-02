import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sudoku';
  
  isRowValid(row: number, value: number): boolean {
  for (let col = 0; col < 9; col++) {
    if (this.grid[row][col] === value) {
      return false; // Значение уже присутствует в строке
    }
  }
  return true;
}

isColumnValid(col: number, value: number): boolean {
  for (let row = 0; row < 9; row++) {
    if (this.grid[row][col] === value) {
      return false; // Значение уже присутствует в столбце
    }
  }
  return true;
}

isBoxValid(startRow: number, startCol: number, value: number): boolean {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (this.grid[startRow + row][startCol + col] === value) {
        return false; // Значение уже присутствует в блоке 3x3
      }
    }
  }
  return true;
}

isValueValid(row: number, col: number, value: number): boolean {
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  
  return this.isRowValid(row, value) &&
         this.isColumnValid(col, value) &&
         this.isBoxValid(startRow, startCol, value);
}

solveSudoku(): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (this.grid[row][col] === 0) {
        for (let value = 1; value <= 9; value++) {
          if (this.isValueValid(row, col, value)) {
            this.grid[row][col] = value;
            
            if (this.solveSudoku()) {
              return true; // Решение найдено
            }
            
            this.grid[row][col] = 0; // Отменить выбор значения и продолжить перебор
          }
        }
        
        return false; // Нет допустимых значений
      }
    }
  }
  
  return true; // Все ячейки заполнены
}

}
