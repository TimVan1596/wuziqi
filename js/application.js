var game_app = angular.module('game_app', []);

game_app.controller('BoardGameController', ['$scope', '$window', function($scope, $window) {
    $scope.SUCCESS_NUMBER = 5;

    // SIZE is the board width and length
    $scope.SIZE = 15;
    
    $scope.BOARD = [];
    // BOARD value can be 0, 1, or 2
    for(var i=0; i< $scope.SIZE; i++){
        $scope.BOARD[i] = [];
        for(var j=0; j< $scope.SIZE; j++){
            $scope.BOARD[i][j] = 0;
        }
    }

    $scope.PLAYER = 0; // Player can be 0 (No Player), 1 (Black), 2 (White)
    $scope.check_result = function(row_index, col_index, value){
        console.log($scope.BOARD);
        console.log('row ' +row_index);
        console.log('col ' +col_index);

        // Check cross row
        var row_count = 1;
        for(var i = row_index-1; i >= 0; i--){
            if($scope.BOARD[i][col_index] != value){
                break;
            } else{
                row_count++;
            }
        }

        for(var i = row_index+1; i<$scope.SIZE; i++){
            if($scope.BOARD[i][col_index] != value){
                break;
            } else{
                row_count++;
            }   
        }

        if(row_count >= $scope.SUCCESS_NUMBER){
            return true;
        }


        var col_count = 1;
        for(var i = col_index-1; i >= 0; i--){
            if($scope.BOARD[row_index][i] != value){
                break;
            } else{
                col_count++;
            }
        }

        for(var i = col_index+1; i<$scope.SIZE; i++){
            if($scope.BOARD[row_index][i] != value){
                break;
            } else{
                col_count++;
            }
        }

        if(col_count >= $scope.SUCCESS_NUMBER){
            return true;
        }

        var down_diag_count = 1;
        for(var i=row_index-1, j= col_index-1; i >=0 && j>=0; i--, j--){
            if($scope.BOARD[i][j] != value){
                break;
            } else{
                down_diag_count++;
            }
        }

        for(var i=row_index+1, j=col_index+1; i<$scope.SIZE && j<$scope.SIZE; i++, j++){
            if($scope.BOARD[i][j] != value){
                break;
            } else {
                down_diag_count++;
            }
        }

        if(down_diag_count >= $scope.SUCCESS_NUMBER){
            return true;
        }

        var up_diag_count = 1;
        for(var i=row_index-1, j=col_index+1; i>=0 && j<$scope.SIZE; i--,j++){
            if($scope.BOARD[i][j] != value){
                break;
            } else {
                up_diag_count++;
            }
        }

        for(var i=row_index+1, j=col_index-1; i<$scope.SIZE && j>=0; i++, j--){
            if($scope.BOARD[i][j] != value){
                break;
            } else {
                up_diag_count++;
            }
        }

        if(up_diag_count >= $scope.SUCCESS_NUMBER){
            return true;
        }

        return false;
    };

    $scope.play_game = function(row_index, col_index, value){

        if($scope.BOARD[row_index][col_index]){
            return false;
        }

        $scope.BOARD[row_index][col_index] = value;

        var result = $scope.check_result(row_index, col_index, value);
        $scope.PLAYER = value % 2 + 1;
        if (result){
            $window.alert('Player ' + value + ' wins.');
        }
    };


}]);