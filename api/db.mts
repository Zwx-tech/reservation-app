import { Sequelize, DataTypes, Model } from "sequelize";

const db = new Sequelize({
  dialect: "sqlite",
  storage: "db/db.sqlite",
});

//* DEFINE USER
interface UserInstance extends Model<User>, User {}
const User = db.define<UserInstance>("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

//* Reservation model
interface ReservationInstance
  extends Model<ReservationModel>,
    ReservationModel {}
const Reservation = db.define<ReservationInstance>("Reservation", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  secondName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  discountCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  additionalInformation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  reservationDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

User.hasMany(Reservation, { foreignKey: "userId" });
Reservation.belongsTo(User, { foreignKey: "userId" });

//* sync all models
await db
  .sync({ force: true })
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Error synchronizing database:", err);
  });

//* validate connection
async function validateConnection() {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export { db, User, Reservation, validateConnection };
