'use strict';

var app = angular.module('app', []);
app.controller('ColatzController', ColatzController);

ColatzController.$inject = [];
function ColatzController() {  
  var vm = this;
  vm.reset = init;
  vm.runSequence = runSequence;
  init(true);

  function validateInput() {
    return vm.input > 0;
  }

  function runSequence() {
    console.log('running on ', vm.input);
    if (!validateInput()) return;
    init();
    vm.displaySequence = true;
    vm.sequence.push('starting with ' + vm.input + ' ' + (isEven(vm.input) ? 'Even - n / 2' : 'Odd - 3n+1'));
    // we are assuming it will eventually be 1
    while (vm.currentNumber !== 1) {
      var NumIsEven = isEven(vm.currentNumber);
      if(NumIsEven) {
        vm.currentNumber = even(vm.currentNumber);
      } else {
        vm.currentNumber = odd(vm.currentNumber);
      }
      if (vm.currentNumber !== 1) {
        vm.sequence.push(vm.currentNumber + ' - ' + (NumIsEven ? 'Even - n / 2' : 'Odd - 3n+1'));
      } else {
        vm.sequence.push(vm.currentNumber + ' and done!');
      }
    }
    console.log('done!');
  }

  function init(rng) {
    vm.input = rng ? randomNumber() : vm.input;
    vm.sequence = [];
    vm.displaySequence = false;
    vm.currentNumber = vm.input;
  }

  function isEven(n) {
    return n % 2 == 0;
  }

  function even(n) {
    return n / 2;
  }

  function odd(n) {
    return 3 * n + 1;
  }
}

function randomNumber() {
  return Math.ceil(Math.random() * 20);
}