/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect = require('chai').expect;
var Item = require('../../app/models/item');
var dbConnect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');

describe('Item', function(){
  before(function(done){
    dbConnect('commerce-test', function(){
      done();
    });
  });

  beforeEach(function(done){
    Item.collection.remove(function(){
      done();
    });
  });

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

  describe('#cost', function(){
    it('should compute cost for an item', function(){
      var o = {name:'iPad', dimensions:{l:'3', w:'4', h:'5'}, weight:'2.5', color:'pink', quantity:'30', msrp:'200', percentOff:'5'};
      var ipad = new Item(o);
      var cost = ipad.cost();

      expect(cost).to.be.closeTo(190, 0.1);
    });
  });

  describe('#save', function(){
    it('should save an item to the database', function(done){
      var o = {name:'iPad', dimensions:{l:'3', w:'4', h:'5'}, weight:'2.5', color:'pink', quantity:'30', msrp:'200', percentOff:'5'};
      var ipad = new Item(o);
      ipad.save(function(){
        expect(ipad._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });
});

