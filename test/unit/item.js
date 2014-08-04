/* jshint expr:true */
/* global describe, it */

'use strict';

var expect = require('chai').expect;
var Item = require('../../app/models/item');

describe('Item', function(){
  describe('constructor', function(){
    it('should create a new Item object', function(){
      var o = {name:'iPad', dimensions:{l:'3', w:'4', h:'5'}, weight:'2.5', color:'pink', quantity:'30', msrp:'200', percentOff:'5'};
      var ipad = new Item(o);

      expect(ipad).to.be.instanceof(Item);
      expect(ipad.name).to.equal('iPad');
      expect(ipad.dimensions.l).to.equal(3);
      expect(ipad.dimensions.w).to.equal(4);
      expect(ipad.dimensions.h).to.equal(5);
      expect(ipad.weight).to.be.closeTo(2.5, 0.1);
      expect(ipad.color).to.equal('pink');
      expect(ipad.quantity).to.equal(30);
      expect(ipad.msrp).to.equal(200);
      expect(ipad.percentOff).to.equal(5);
    });
  });
});

