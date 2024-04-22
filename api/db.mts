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
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

interface PlaceInstance extends Model<Place>, Place {}

const Place = db.define<PlaceInstance>("Place", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tags: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  price: {
    type: DataTypes.NUMBER,
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
  userId: {
    type: DataTypes.INTEGER,
  },
  placeId: {
    type: DataTypes.NUMBER,
  },
});

//* User reservation relation
User.hasMany(Reservation, { foreignKey: "userId" });
Reservation.belongsTo(User, { foreignKey: "userId" });

//* Place reservation relation
Place.hasMany(Reservation, { foreignKey: "placeId" });
Reservation.belongsTo(Place, { foreignKey: "placeId" });
// * sync all models
// await db
//   .sync({ force: true })
//   .then(() => {
//     console.log("Database synchronized");
//   })
//   .catch((err) => {
//     console.error("Error synchronizing database:", err);
//   });

//* validate connection
async function validateConnection() {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export { db, User, Reservation, Place, validateConnection };
