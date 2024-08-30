const { getConnection } = require("../config/dbConfig");

const queryPerkpp = `
   SELECT 
    A.KPP_PENERIMA AS KODE_KPP,
    SUBSTR(B.NAMA, 13, 99) AS NAMA_KPP,
    SUM(CASE WHEN A.TAHUN='2024' THEN A.TARGET ELSE 0 END) AS RENCANA,
    SUM(CASE WHEN A.TAHUN='2024' AND A.BULAN BETWEEN '01' AND '12' THEN A.NETTO ELSE 0 END) AS NETTO_TAHUN_INI,
    CASE 
      WHEN SUM(CASE WHEN A.TAHUN='2024' THEN A.TARGET ELSE 0 END) > 0 
      THEN (SUM(CASE WHEN A.TAHUN='2024' AND A.BULAN BETWEEN '01' AND '12' THEN A.NETTO ELSE 0 END) / SUM(CASE WHEN A.TAHUN='2024' THEN A.TARGET ELSE 0 END)) * 100 
      ELSE 0 
    END AS CAPAIAN
  FROM GASANPIAN.PENERIMAAN_PERAR_MVIEW A
  LEFT JOIN GASANPIAN.KPP B ON A.KPP_PENERIMA = B.KODE
  WHERE A.TAHUN IN ('2024', '2023')
    AND A.BULAN BETWEEN '01' AND '12'
    AND B.KODE != '736'
  GROUP BY A.KPP_PENERIMA, B.NAMA
  ORDER BY A.KPP_PENERIMA
`;

const fetchPerkpp = async () => {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute(queryPerkpp);
    return result.rows;
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
};

module.exports = { fetchPerkpp };
