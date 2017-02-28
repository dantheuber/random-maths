'use strict';

var app = angular.module('app', []);
app.controller('ColatzController', ColatzController);
app.controller('KaprekarController', KaprekarController);

ColatzController.$inject = ['$timeout'];
function ColatzController($timeout) {
  var vm = this;
  vm.reset = init;
  vm.runSequence = runSequence;
  init(true);

  function validateInput() {
    return vm.input > 0;
  }

  function runSequence() {
    if (!validateInput()) return;
    init();
    $timeout(function () {
      vm.displaySequence = true;
      console.time('Colatz-'+vm.input);
      vm.sequence.push('starting with ' + vm.input + ' ' + (isEven(vm.input) ? 'Even - n / 2' : 'Odd - 3n+1'));
      // we are assuming it will eventually be 1
      while (vm.currentNumber !== 1) {
        var NumIsEven = isEven(vm.currentNumber);

        vm.currentNumber = NumIsEven ? even(vm.currentNumber) : odd(vm.currentNumber);

        if (vm.currentNumber !== 1) {
          vm.sequence.push(vm.currentNumber + ' - ' + (NumIsEven ? 'Even - n / 2' : 'Odd - 3n+1'));
        } else {
          vm.sequence.push(vm.currentNumber + ' and done!');
        }
      }
      console.timeEnd('Colatz-'+vm.input);
    });
  }

  function init(rng) {
    vm.input = rng ? randomNumber(1,2000) : vm.input;
    vm.sequence = [];
    $timeout(function () {
      vm.displaySequence = false;
    });
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

KaprekarController.$inject = ['$timeout'];
function KaprekarController ($timeout) {
  var vm = this;

  vm.reset = init;
  vm.start = start;
  vm.inputIsValid = inputIsValid;
  init(true);

  function start() {
    if (!inputIsValid()) return;
    init();
    console.time('kaprekar-' + vm.input);
    while(vm.currentNumber !== '6174') {
      vm.currentNumber = kap(vm.currentNumber);
    }
    $timeout(function () {
      vm.displaySequence = true;
    });
    console.timeEnd('kaprekar-' + vm.input);
  }

  function kap(stringNumber) {
    var arr = stringNumber.split('');
    var asc = arr.slice(0).sort();
    var desc = asc.slice(0).reverse();
    var n_desc = parseInt(desc.join(''), 10);
    var n_asc = parseInt(asc.join(''), 10);
    var nextNumber = n_desc - n_asc;
    var n_stringNumber = addZeroes(nextNumber);
    addToSequence(n_stringNumber, n_asc, n_desc);
    return n_stringNumber;
  }

  function addToSequence(numberString, asc, desc) {
    vm.sequence.push({
      number: numberString,
      ascending: asc,
      descending: desc
    });
  }

  function addZeroes(n) {
    var stringNumber = String(n);
    stringNumber.length;
    while(stringNumber.length < 4) {
      stringNumber = '0' + stringNumber;
    }
    return stringNumber;
  }

  function inputIsValid() {
    var validRegex = /^(\d)(?!\1+$)\d{3}$/;
    return validRegex.test(vm.input);
  }

  function init(rng) {
    vm.input = rng ? '' + randomNumber(1112,9998) : vm.input;
    vm.sequence = [];
    $timeout(function () {
      vm.displaySequence = false;
    });
    vm.currentNumber = vm.input;
  }
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
