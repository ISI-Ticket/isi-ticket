const hubSpotKey = process.env.hubspot_key;

const moloniKey = {
    clientSecret : process.env.moloni_secret,
    devID : process.env.moloni_devID

};

exports.hubSpotKey = hubSpotKey;
exports.moloniKey = moloniKey;