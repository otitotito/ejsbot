require("dotenv").config();
const oracledb = require("oracledb");

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_HOST + "/" + process.env.DB_NAME,
  poolMin: 10,
  poolMax: 10,
  poolIncrement: 0,
};

let poolPromise;

// Membuat pool koneksi
const initializePool = async () => {
  if (!poolPromise) {
    poolPromise = oracledb
      .createPool(dbConfig)
      .then((pool) => {
        console.log("Pool koneksi berhasil dibuat.");
        return pool;
      })
      .catch((err) => {
        console.error("Gagal membuat pool koneksi:", err);
        throw err;
      });
  }
  return poolPromise;
};

async function getConnection() {
  try {
    const pool = await initializePool();
    const connection = await pool.getConnection();
    return connection;
  } catch (error) {
    console.error("Koneksi database gagal:", error);
    throw error;
  }
}

module.exports = { getConnection };
