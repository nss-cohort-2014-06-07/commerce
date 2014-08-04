/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect = require('chai').expect;
var Item = require('../../app/models/item');
var dbConnect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');
var i1, i2, i3;

describe('Item', function(){
  before(function(done){
    dbConnect('commerce-test', function(){
      done();
    });
  });

  beforeEach(function(done){
    Item.collection.remove(function(){
      var o1 = {name:'iPad',   dimensions:{l:'3', w:'4', h:'5'}, weight:'2.5', color:'pink',   quantity:'30', msrp:'200', percentOff:'5'};
      var o2 = {name:'iMac',   dimensions:{l:'4', w:'5', h:'6'}, weight:'3.5', color:'orange', quantity:'40', msrp:'250', percentOff:'15'};
      var o3 = {name:'iWatch', dimensions:{l:'7', w:'8', h:'8'}, weight:'4.5', color:'red',    quantity:'50', msrp:'300', percentOff:'25'};

      i1 = new Item(o1);
      i2 = new Item(o2);
      i3 = new Item(o3);

      i1.save(function(){
        i2.save(function(){
          i3.save(function(){
            done();
          });
        });
      });
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

  describe('.all', function(){
    it('should get all items from database', function(done){
      Item.all(function(items){
        expect(items).to.have.length(3);
        expect(items[0]).to.respondTo('cost');
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find an item by its id', function(done){
      Item.findById(i1._id.toString(), function(item){
        expect(item.name).to.equal('iPad');
        expect(item).to.respondTo('cost');
        done();
      });
    });
  });

  describe('.deleteById', function(){
    it('should delete an item by its id', function(done){
      Item.deleteById(i1._id.toString(), function(){
        Item.all(function(items){
          expect(items).to.have.length(2);
          done();
        });
      });
    });
  });
});

