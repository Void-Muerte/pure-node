/*
* Create and export configuration variables
*/
// Container for all the environments
var environments = {}

// Staging {default} environment
environments.staging = {
    'port': 3000,
    'envName': 'staging'
}
// Production environment
environments.production = {
    'port': 5000,
    'envNanme': 'production'
}

// Determine which environment was passed as a command-line argument
const currentEnvironment = typeof(process.env.NODE_ENV) =='string'?process.env.NODE_ENV.toLowerCase(): '';

// Check if environment is one of the defined environments else default

const environmentToExport = typeof(environments[currentEnvironment])=='object'? environments[currentEnvironment]:environments.staging;

// export the module
module.exports = environmentToExport;