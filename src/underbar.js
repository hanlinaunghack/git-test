(function() {
  'use strict';
  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    /* START SOLUTION */
    return val;
    /* END SOLUTION */
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {

    //Returns empty array if second argument is not a number
    //Returns empty array if object is passed with a second argument
    //if object is passed without second argument they want undefined
    //if n is given and n is not a number, return [];
    //if given empty array, return undefined
    //if n is undefined or 0, return array[0]

    if (!Array.isArray(array) && typeof array == 'object') {
      if (n === undefined) {
        return undefined;
      } else {
        return [];
      }
    }
    if (n !== undefined && typeof n !== 'number') { return [] }; //if
    if (array.length === 0) { if (n === undefined) { return undefined; } return []; };
    if (n === undefined || n === 0) { return array[0]; };
    return array.slice(0, n); //[1]

  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (!Array.isArray(array) && typeof array == 'object') {
      if (n === undefined) {
        return undefined;
      } else {
        return [];
      }
    }
    if (n !== undefined && typeof n !== 'number') { return [] };
    if (n == 0) { return [] };
    if (array.length === 0) { return undefined; };
    if (n === undefined || n === 0) { return array[array.length - 1]; }; //[1, 2, 3] --> array[2] --> 3
    if (n > array.length) { return array };
    return array.slice(array.length - n, array.length) //([1,2,3],2) ---> [2,3]
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    //should iterate over each value of the array
    //should iterate over array and access each index
    //should iterate over array and provide access to original collection
    //should iterate over object and provide access to each value
    //should only iterate over numeric keys on an array, not all properties
    //should iterate over objs and provide access to each key 
    //should iterate over objs and provide access to original object (new instance of iterated object)

    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
        //iterator(value , index , collection) << asked for
      }
    } else if (typeof collection === 'object') {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }

    };
  }

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target) {
    //should give index at which element appears
    //return -1 if element doesn't exist
    //third arguments represents starting index of search

    //if no third argument, loop through array and return index or -1
    if (!arguments[2]) {
      for (var i = 0; i < array.length; i++) {
        if (array[i] === target) {
          return i;
        } //if the first element isn't the target it will return -1
      }
    } else {
      if (arguments[2] < 0) {
        var arra = array.slice(arguments[2])
        for (var i = 0; i < arra.length; i++) {
          if (arra[i] === target) {
            return i + (array.length - arra.length)
          }
        }
      } else {
        for (var i = arguments[2]; i < array.length; i++) {
          if (array[i] === target) {
            return i;
          }
        }
      } //if there is 3rd argument, then start loop at given index
    }
    return -1;
  };

  _.findIndex = function(collection, predicate) {
    //should work with arrays
    //should return index of first index that passes truth test
    //should return -1 if no element passes truth test
    //shouldn't modify input array

    /* START SOLUTION */
    if (!predicate) {
      predicate = function(x) { return x };
    }
    for (var i = 0; i < collection.length; i++) {
      if (predicate(collection[i]) === true) {
        return i;
      }
    }
    return -1;
    /* END SOLUTION */
  }


  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    /* START SOLUTION */
    var newarray = [];
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        if (test(collection[i])) {
          newarray.push(collection[i]);
        };
      };
    } else if (typeof collection === 'object') {
      for (var key in collection) {
        if (test(collection[key])) {
          newarray.push(collection[key])
        }
      }
    }

    return newarray;
    /* END SOLUTION */
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    /* START SOLUTION */
    var newarray = [];
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        if (!test(collection[i])) {
          newarray.push(collection[i]);
        };
      };
    } else if (typeof collection === 'object') {
      for (var key in collection) {
        if (!test(collection[key])) {
          newarray.push(collection[key])
        }
      }
    }
    return newarray;
    /* END SOLUTION */
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {
    /* START SOLUTION */
    var newarray = [];
    var imgarray = [];
    if (typeof isSorted === 'function') {
      iterator = isSorted;
    }
    if (isSorted === true) {
      array = array.sort((a, b) => a - b)
      var x = [500, 600, 700, 800, 900, 1000].filter(function(e) {
        return e % 100 == 0;
      })
      x.forEach(e => console.log(e))
      var y = x.reduce((sum, curr) => sum * curr, 1)
    }
    if (iterator) {
      var x = array.map(function(element, index, array) {
        return iterator(element, index, array);
      });
      for (var i = 0; i < array.length; i++) {
        if (imgarray.indexOf(x[i]) < 0) {
          imgarray.push(x[i]); //push x array into the imgarray <<< a clone, to check if elements repeat
          newarray.push(array[i]); //push array elements into newarray <<< solution
        };
      };
    } else {
      for (var i = 0; i < array.length; i++) {
        if (newarray.indexOf(array[i]) < 0) { //if element does not exist in newarray push that element into newarray;
          newarray.push(array[i]);
        };
      };
    };
    return newarray; // you get a unique array;
    /* END SOLUTION */
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    //should return new array of transformed values
    //should iterate over every element and its index input array
    //should return array
    //should map object and return new array 

    /* START SOLUTION */
    let output = [];
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        output.push(iterator(collection[i], i, collection));
      }
    } else if (typeof collection === 'object') {
      for (var key in collection) {
        output.push(iterator(collection[key], key, collection));
      }
    };
    return output;
    /* END SOLUTION */
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.

    //should return array
    //if given array, return array of values
    //shouldn't mutate original argument
    //if given mixed data type array should return values
    //if given array of objects and non-existent key, returns undefined
    //should return empty array if not given array or object

    /* START SOLUTION */
    var output = [];
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        if (typeof collection[i] == 'object' && !Array.isArray(collection[i])) {
          collection[i][key] ? output.push(collection[i][key]) : output.push(undefined)
        } else {
          if (collection[i] === key) {
            output.push(collection[i])
          }
        }
      }
    }
    return output;
    /* END SOLUTION */
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  _.reduce = function(collection, iterator, accumulator) {
    //should work when no memo provided
    //should reduce in correct order
    //should work when memo is primitive value
    //should work when memo is object
    //shouldn't mutate input array

    /* START SOLUTION */
    if (accumulator == undefined) {
      var x = 1;
      accumulator = collection[0];
    } else {
      var x = 0;
    }
    if (Array.isArray(collection)) {
      for (var i = x; i < collection.length; i++) {
        accumulator = iterator(accumulator, collection[i]); //if memo is not given it is collection[0]
      }
    }
    return accumulator;
    /* END SOLUTION */
  };


  //-----------------------------ADVANCED CONTENT


  _.initial = function(array, n) {
    /* START SOLUTION */
    if (!Array.isArray(array) && typeof array == 'object') {
      array = Object.values(array);
      n = 1;
    }
    var i = 0;
    if (!n) {
      n = 1;
    }
    while (i++ < n) {
      array.pop();
    }
    return array;
    /* END SOLUTION */
  };

  _.rest = function(array, n) {
    /* START SOLUTION */
    if (!Array.isArray(array) && typeof array == 'object') {
      array = Object.values(array);
      n = 1;
    }
    if (n === undefined) {
      n = 1;
    };
    return array.slice(n);
    /* END SOLUTION */
  };

  _.has = function(object, key) {
    /* START SOLUTION */
    var x = Object.keys(object);
    if (x.indexOf(key) < 0) {
      return false;
    };
    return true;
    /* END SOLUTION */
  };

  _.compact = function(array) {
    /* START SOLUTION */
    var newArray = [];
    if (!Array.isArray(array) && typeof array == 'object') {
      array = Object.values(array);
    }
    for (var i = 0; i < array.length; i++) {
      if (array[i]) {
        newArray.push(array[i])
      }
    }
    return newArray;
    /* END SOLUTION */
  };

  _.without = function(array, target) {
    /* START SOLUTION */
    var newArray = [];
    if (!Array.isArray(array) && typeof array == 'object') {
      array = Object.values(array);
    };

    function iterator(array, targetArray) {
      for (var i = 0; i < array.length; i++) {
        if (!targetArray.has(array[i])) {
          newArray.push(array[i])
        }
      }
    };
    if (arguments.length > 2) {
      var targetArray = new Set(Array.prototype.slice.call(arguments, 1));
      iterator(array, targetArray);
    } else {
      var targetArray = new Set([target]);
      iterator(array, targetArray);
    };
    return newArray;
    /* END SOLUTION */
  };

  _.range = function(start , end , step) {
    /* START SOLUTION */
    var newArray = [];
    if (!step) {
      step = 1;
    }
    if (start > end) {
      for (var i = start ; i > end ; i = i + step) {
        newArray.push(i);
      };
    } else if (start < end) {
      for (var i = start ; i < end ; i = i + step) {
        newArray.push(i);
      };
    }
    return newArray;
    /* END SOLUTION */
  };

  _.pairs = function(start , end , step) {
    /* START SOLUTION */
    var newArray = [];
    if (!step) {
      step = 1;
    }
    if (start > end) {
      for (var i = start ; i > end ; i = i + step) {
        newArray.push(i);
      };
    } else if (start < end) {
      for (var i = start ; i < end ; i = i + step) {
        newArray.push(i);
      };
    }
    return newArray;
    /* END SOLUTION */
  };

  
  object
  where
  invert
  mapObject
  partition
  findWhere

}());