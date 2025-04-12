const { shallowCopy } = require('ethers/lib/utils');
const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: 'Challenging API',
        description: 'Daily social challenge API application where the user can develop courage, eliminate social anxiety and lose fear. The challenges will be split into four categories: emotional, physical, intellectual and social challenges.'
    },
    host: "challenging.onrender.com",
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointFiles, doc);
