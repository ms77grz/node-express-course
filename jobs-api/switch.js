'use strict';

const { parseMultipartData } = require('strapi-utils');
const csv = require('csvtojson');
const fs = require('fs');

module.exports = {
  async updatePrices(ctx) {
    if (ctx.is('multipart')) {
      // parse the multipart data, you will need to send file as files.files key
      // and some random json object in the data key
      const { files } = parseMultipartData(ctx);
      // convert the local tmp file to a buffer
      const buffer = fs.readFileSync(files.files.path);
      // stream that file buffer into the conversion function to get usable json
      let json = await csv().fromString(buffer.toString());
      // finally loop through the json and fire the Strapi update queries
      await json.map(async product => {
        await strapi
          .query('product')
          .update({ id: product.id }, { price: product.price });
      });
      return { updated: true };
    } else {
      return ctx.badRequest('request format incorrect');
    }
  },
};
