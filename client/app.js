angular.module('dndCharTracker',[])


.controller('CharCtrl', function ($scope, $http){
  this.data;
  $scope.user = {};
  $scope.user.name = '';
  $scope.user.align = '';
  $scope.user.race = '';
  $scope.user.class = '';
  $scope.user.gender= 'male'
  $scope.user.exp = 0;
  $scope.user.level = 0;
  $scope.user.str = 0;
  $scope.user.dex = 0;
  $scope.user.con = 0;
  $scope.user.int = 0;
  $scope.user.wis = 0;
  $scope.user.cha = 0;
  $scope.user.event = ' ';
  $scope.user.dice = 0;
  var that = this;

  $scope.save = function (name,align,race,classname,gender,exp,level,str,dex,con,inte,wis,cha,eventname,dice) {
    var data = {
      name : name,
      align : align,
      race : race,
      classname : classname,
      gender : gender,
      exp : exp,
      level : level,
      str : str,
      dex : dex,
      con : con,
      inte : inte,
      wis : wis,
      cha : cha,
      eventname : eventname,
      dice: dice
    };
    console.log(JSON.stringify(data));

    $http({
      method: 'POST',
      url: '/',
      data: JSON.stringify(data)
      }).then(function successCallback(response) {
        //success
        $scope.data = response.data;

      }, function errorCallback(response) {
        //error
        console.log(response);
    });
  };

});



