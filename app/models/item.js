'use strict';

function Item(o){
  this.name           = o.name;
  this.dimensions     = {};
  this.dimensions.l   = o.dimensions.l * 1;
  this.dimensions.w   = o.dimensions.w * 1;
  this.dimensions.h   = o.dimensions.h * 1;
  this.weight         = o.weight * 1;
  this.color          = o.color;
  this.quantity       = o.quantity * 1;
  this.msrp           = o.msrp * 1;
  this.percentOff     = o.percentOff * 1;
}

module.exports = Item;

