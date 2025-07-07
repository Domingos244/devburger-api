const configDatabase = {
  development: {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    database: 'devburger',
    define: {
      timestamps: true,
      underscored: true,
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

export default configDatabase;
