module.exports = {
  development: {
    dialect: 'postgres',
    host: 'localhost', // <-- cuidado: 'Localhost' com L maiúsculo pode dar erro
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'devburger',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },

  test: {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'devburger_test',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },

  production: {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'devburger_prod',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },
};



