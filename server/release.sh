npx sequelize db:drop > drop.log
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all