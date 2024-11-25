const { Date } = require('mongoose');
const mongoose = require('mongoose');

//------------ Item Schema ------------//
const ItemSchema = new mongoose.Schema({
  highlights_list: Object,
  item_price: Number,
  item_name: String,
  item_summary: Object,
  item_specifications: Object,
  item_features: Object,
  item_thumbnail: String,
  item_images: String,
}, { timestamps: true });

ItemSchema.pre('save', async function(next) {
  console.log('just before saving ItemSchema... ');
  next();
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;