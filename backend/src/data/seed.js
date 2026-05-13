//backend/src/data/seed.js
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { connectDB } from "../config/db.js";

// Models
import Station from "../models/Station.js";
import Area from "../models/Area.js";
import Leader from "../models/Leader.js";
import AccountabilityItem from "../models/AccountabilityItem.js";

/**
 * Keep your existing rawData array here.
 * Paste the full list you already have from your current seed file.
 */
const rawData = [
  { cty: "NAIROBI", cCode: "274", const: "WESTLANDS", wCode: "1366", ward: "KITISURU", sCode: "001", name: "KABETE VETLAB PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "274", const: "WESTLANDS", wCode: "1366", ward: "KITISURU", sCode: "002", name: "ST MARTIN`S SCHOOL KIBAGARE" },
  { cty: "NAIROBI", cCode: "274", const: "WESTLANDS", wCode: "1366", ward: "KITISURU", sCode: "004", name: "LOWER KABETE PRIMARY" },
  { cty: "NAIROBI", cCode: "274", const: "WESTLANDS", wCode: "1366", ward: "KITISURU", sCode: "003", name: "LORESHO PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "274", const: "WESTLANDS", wCode: "1366", ward: "KITISURU", sCode: "006", name: "KABETE REHABILITATION CENTRE" },
  { cty: "NAIROBI", cCode: "274", const: "WESTLANDS", wCode: "1367", ward: "PARKLANDS/HIGHRIDGE", sCode: "007", name: "MUGUGA GREEN PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "274", const: "WESTLANDS", wCode: "1367", ward: "PARKLANDS/HIGHRIDGE", sCode: "009", name: "WESTLANDS PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "274", const: "WESTLANDS", wCode: "1367", ward: "PARKLANDS/HIGHRIDGE", sCode: "011", name: "HOSPITAL HILL PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "274", const: "WESTLANDS", wCode: "1367", ward: "PARKLANDS/HIGHRIDGE", sCode: "012", name: "HIGHRIDGE PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "274", const: "WESTLANDS", wCode: "1367", ward: "PARLANDS/HIGHRIDGE", sCode: "010", name: "CITY PARK MARKET" },
  { cty: "NAIROBI", cCode: "274", const: "WESTLANDS", wCode: "1368", ward: "KARURA", sCode: "015", name: "KARURA FOREST PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "274", const: "WESTLANDS", wCode: "1368", ward: "KARURA", sCode: "016", name: "CHELETA PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "274", const: "WESTLANDS", wCode: "1368", ward: "KARURA", sCode: "017", name: "MJI WA HURUMA" },
  { cty: "NAIROBI", cCode: "274", const: "WESTLANDS", wCode: "1368", ward: "KARURA", sCode: "014", name: "K.C.C. COLLEGE" },
  { cty: "NAIROBI", cCode: "274", const: "WESTLANDS", wCode: "1368", ward: "KARURA", sCode: "019", name: "HOSPITAL HILL HIGH SCHOOL" },
  { cty: "NAIROBI", cCode: "274", const: "WESTLANDS", wCode: "1369", ward: "KANGEMI", sCode: "020", name: "KIHUMBUINI PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "274", const: "WESTLANDS", wCode: "1369", ward: "KANGEMI", sCode: "021", name: "NEW KIHUMBUINI PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "274", const: "WESTLANDS", wCode: "1369", ward: "KANGEMI", sCode: "022", name: "KANGEMI SOCIAL HALL" },
  { cty: "NAIROBI", cCode: "274", const: "WESTLANDS", wCode: "1370", ward: "MOUNTAIN VIEW", sCode: "023", name: "KABETE TECHNICAL TRAINING INSTITUTE" },
  { cty: "NAIROBI", cCode: "274", const: "WESTLANDS", wCode: "1370", ward: "MOUNTAIN VIEW", sCode: "024", name: "ST JOSEPH PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "274", const: "WESTLANDS", wCode: "1370", ward: "MOUNTAIN VIEW", sCode: "025", name: "KANGEMI PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "275", const: "DAGORETTI NORTH", wCode: "1371", ward: "KILIMANI", sCode: "001", name: "NAIROBI PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "275", const: "DAGORETTI NORTH", wCode: "1371", ward: "KILIMANI", sCode: "002", name: "ST GEORGE`S PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "275", const: "DAGORETTI NORTH", wCode: "1371", ward: "KILIMANI", sCode: "003", name: "KILIMANI PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "275", const: "DAGORETTI NORTH", wCode: "1371", ward: "KILIMANI", sCode: "005", name: "LAVINGTON PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "275", const: "DAGORETTI NORTH", wCode: "1371", ward: "KILIMANI", sCode: "006", name: "MUTHANGARI PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "275", const: "DAGORETTI NORTH", wCode: "1372", ward: "KAWANGWARE", sCode: "007", name: "DELIVERENCE CHURCH RIRUTA" },
  { cty: "NAIROBI", cCode: "275", const: "DAGORETTI NORTH", wCode: "1372", ward: "KAWANGWARE", sCode: "008", name: "KAWANGWARE PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "275", const: "DAGORETTI NORTH", wCode: "1372", ward: "KAWANGWARE", sCode: "009", name: "PRECIOUS BLOOD GIRLS SCHOOL,RIRUTA" },
  { cty: "NAIROBI", cCode: "275", const: "DAGORETTI NORTH", wCode: "1373", ward: "GATINA", sCode: "010", name: "GATINA CHIEFS CAMP" },
  { cty: "NAIROBI", cCode: "275", const: "DAGORETTI NORTH", wCode: "1373", ward: "GATINA", sCode: "011", name: "WORLD HOPE CENTER" },
  { cty: "NAIROBI", cCode: "275", const: "DAGORETTI NORTH", wCode: "1373", ward: "GATINA", sCode: "012", name: "GATINA PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "275", const: "DAGORETTI NORTH", wCode: "1374", ward: "KILELESHWA", sCode: "013", name: "JKUAT KARBASIRAN AVENUE" },
  { cty: "NAIROBI", cCode: "275", const: "DAGORETTI NORTH", wCode: "1374", ward: "KILELESHWA", sCode: "014", name: "ST MARY`S SCHOOL" },
  { cty: "NAIROBI", cCode: "275", const: "DAGORETTI NORTH", wCode: "1374", ward: "KILELESHWA", sCode: "015", name: "CONSOLATA SCHOOL" },
  { cty: "NAIROBI", cCode: "275", const: "DAGORETTI NORTH", wCode: "1374", ward: "KILELESHWA", sCode: "016", name: "KILELESHWA PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "275", const: "DAGORETTI NORTH", wCode: "1375", ward: "KABIRO", sCode: "019", name: "KABIRO PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "275", const: "DAGORETTI NORTH", wCode: "1375", ward: "KABIRO", sCode: "004", name: "MUSLIM PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "275", const: "DAGORETTI NORTH", wCode: "1375", ward: "KABIRO", sCode: "006", name: "ST. ANTHONY HIGH SCHOOL" },
  { cty: "NAIROBI", cCode: "275", const: "DAGORETTI NORTH", wCode: "1375", ward: "KABIRO", sCode: "021", name: "HGM PRIMARY SCHOOL,RIRUTA" },
  { cty: "NAIROBI", cCode: "276", const: "DAGORETTI SOUTH", wCode: "1376", ward: "MUTU-INI", sCode: "001", name: "KIRIGU PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "276", const: "DAGORETTI SOUTH", wCode: "1376", ward: "MUTU-INI", sCode: "002", name: "MUTUINI PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "276", const: "DAGORETTI SOUTH", wCode: "1376", ward: "MUTU-INI", sCode: "003", name: "MUTUINI HIGH SCHOOL" },
  { cty: "NAIROBI", cCode: "276", const: "DAGORETTI SOUTH", wCode: "1376", ward: "MUTU-INI", sCode: "004", name: "GITIBA PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "276", const: "DAGORETTI SOUTH", wCode: "1377", ward: "NGANDO", sCode: "005", name: "LENANA SCHOOL" },
  { cty: "NAIROBI", cCode: "276", const: "DAGORETTI SOUTH", wCode: "1377", ward: "NGANDO", sCode: "006", name: "NGANDO CHIEFS CAMP" },
  { cty: "NAIROBI", cCode: "276", const: "DAGORETTI SOUTH", wCode: "1377", ward: "NGANDO", sCode: "007", name: "CITY PRIME ACADEMY" },
  { cty: "NAIROBI", cCode: "276", const: "DAGORETTI SOUTH", wCode: "1377", ward: "NGANDO", sCode: "008", name: "DAGORETTI CORNER PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "276", const: "DAGORETTI SOUTH", wCode: "1378", ward: "RIRUTA", sCode: "009", name: "RIRUTA SATELLITE PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "276", const: "DAGORETTI SOUTH", wCode: "1378", ward: "RIRUTA", sCode: "010", name: "KINYANJUI ROAD PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "276", const: "DAGORETTI SOUTH", wCode: "1378", ward: "RIRUTA", sCode: "011", name: "KIVULI CENTER" },
  { cty: "NAIROBI", cCode: "276", const: "DAGORETTI SOUTH", wCode: "1378", ward: "RIRUTA", sCode: "012", name: "ACK RIRUTA WEST" },
  { cty: "NAIROBI", cCode: "276", const: "DAGORETTI SOUTH", wCode: "1378", ward: "RIRUTA", sCode: "013", name: "NDURARUA PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "276", const: "DAGORETTI SOUTH", wCode: "1379", ward: "UTHIRU/RUTHIMITU", sCode: "015", name: "ACK KIURU NURSERY SCHOOL" },
  { cty: "NAIROBI", cCode: "276", const: "DAGORETTI SOUTH", wCode: "1379", ward: "UTHIRU/RUTHIMITU", sCode: "016", name: "KAGIRA PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "276", const: "DAGORETTI SOUTH", wCode: "1379", ward: "UTHIRU/RUTHIMITU", sCode: "017", name: "RUTHIMITU PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "276", const: "DAGORETTI SOUTH", wCode: "1379", ward: "UTHIRU/RUTHIMITU", sCode: "018", name: "CHIEF`S CAMP,MUTHUA" },
  { cty: "NAIROBI", cCode: "276", const: "DAGORETTI SOUTH", wCode: "1379", ward: "UTHIRU/RUTHIMITU", sCode: "019", name: "UTHIRU CENTRE" },
  { cty: "NAIROBI", cCode: "276", const: "DAGORETTI SOUTH", wCode: "1380", ward: "WAITHAKA", sCode: "020", name: "KABIRIA PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "276", const: "DAGORETTI SOUTH", wCode: "1380", ward: "WAITHAKA", sCode: "021", name: "NEMBU PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "276", const: "DAGORETTI SOUTH", wCode: "1380", ward: "WAITHAKA", sCode: "022", name: "MUKARARA PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "276", const: "DAGORETTI SOUTH", wCode: "1380", ward: "WAITHAKA", sCode: "023", name: "WAITHAKA COMMUNITY SOCIAL HALL" },
  { cty: "NAIROBI", cCode: "277", const: "LANGATA", wCode: "1381", ward: "KAREN", sCode: "001", name: "ST. MARY'S PRI SCH" },
  { cty: "NAIROBI", cCode: "277", const: "LANGATA", wCode: "1381", ward: "KAREN", sCode: "003", name: "KAREN 'C' PRI SCH" },
  { cty: "NAIROBI", cCode: "277", const: "LANGATA", wCode: "1381", ward: "KAREN", sCode: "004", name: "CCCT / MMU MBAGATHI" },
  { cty: "NAIROBI", cCode: "277", const: "LANGATA", wCode: "1381", ward: "KAREN", sCode: "006", name: "NGONG FOREST PRI" },
  { cty: "NAIROBI", cCode: "277", const: "LANGATA", wCode: "1381", ward: "KAREN", sCode: "007", name: "PCEA KUWINDA" },
  { cty: "NAIROBI", cCode: "277", const: "LANGATA", wCode: "1382", ward: "NAIROBI WEST", sCode: "013", name: "MADARAKA PRI SCH" },
  { cty: "NAIROBI", cCode: "277", const: "LANGATA", wCode: "1382", ward: "NAIROBI WEST", sCode: "014", name: "KONGONI PRI SCH" },
  { cty: "NAIROBI", cCode: "277", const: "LANGATA", wCode: "1382", ward: "NAIROBI WEST", sCode: "015", name: "NYAYO NAT. STADIUM" },
  { cty: "NAIROBI", cCode: "277", const: "LANGATA", wCode: "1382", ward: "NAIROBI WEST", sCode: "016", name: "KPA GROUNDS" },
  { cty: "NAIROBI", cCode: "277", const: "LANGATA", wCode: "1383", ward: "MUGUMU-INI", sCode: "017", name: "LANGATA ROAD PRI" },
  { cty: "NAIROBI", cCode: "277", const: "LANGATA", wCode: "1383", ward: "MUGUMU-INI", sCode: "018", name: "UHURU GARDENS PRI" },
  { cty: "NAIROBI", cCode: "277", const: "LANGATA", wCode: "1383", ward: "MUGUMU-INI", sCode: "019", name: "LANGATA WEST PRI" },
  { cty: "NAIROBI", cCode: "277", const: "LANGATA", wCode: "1383", ward: "MUGUMU-INI", sCode: "021", name: "ST. CHARLES LWANGA SCHOOL" },
  { cty: "NAIROBI", cCode: "277", const: "LANGATA", wCode: "1383", ward: "MUGUMU-INI", sCode: "025", name: "BANGLADESH VILLAGE" },
  { cty: "NAIROBI", cCode: "277", const: "LANGATA", wCode: "1384", ward: "SOUTH C", sCode: "026", name: "KEWI - SOUTH C" },
  { cty: "NAIROBI", cCode: "277", const: "LANGATA", wCode: "1384", ward: "SOUTH C", sCode: "027", name: "MOW GROUNDS (SOUTH C)" },
  { cty: "NAIROBI", cCode: "277", const: "LANGATA", wCode: "1384", ward: "SOUTH C", sCode: "028", name: "KIRDI (SOUTH C)" },
  { cty: "NAIROBI", cCode: "277", const: "LANGATA", wCode: "1384", ward: "SOUTH C", sCode: "029", name: "KHALSA PRI. SCH" },
  { cty: "NAIROBI", cCode: "277", const: "LANGATA", wCode: "1385", ward: "NYAYO HIGHRISE", sCode: "030", name: "NYAYO HIGHRISE PARKING" },
  { cty: "NAIROBI", cCode: "277", const: "LANGATA", wCode: "1385", ward: "NYAYO HIGHRISE", sCode: "031", name: "UNDUGU SOCIETY" },
  { cty: "NAIROBI", cCode: "277", const: "LANGATA", wCode: "1385", ward: "NYAYO HIGHRISE", sCode: "032", name: "PCEA SILANGA HIGH SCH" },
  { cty: "NAIROBI", cCode: "277", const: "LANGATA", wCode: "1385", ward: "NYAYO HIGHRISE", sCode: "033", name: "ST. JUDE CHURCH" },
  { cty: "NAIROBI", cCode: "277", const: "LANGATA", wCode: "1385", ward: "NYAYO HIGHRISE", sCode: "034", name: "SOWETO RESOURCE CENTRE" },
  { cty: "NAIROBI", cCode: "278", const: "KIBRA", wCode: "1386", ward: "LAINI SABA", sCode: "001", name: "Y.M.C.A KIBERA" },
  { cty: "NAIROBI", cCode: "278", const: "KIBRA", wCode: "1386", ward: "LAINI SABA", sCode: "002", name: "MASHIMONI SCHOOL" },
  { cty: "NAIROBI", cCode: "278", const: "KIBRA", wCode: "1387", ward: "LINDI", sCode: "003", name: "LINDI MOSQUE GROUNDS" },
  { cty: "NAIROBI", cCode: "278", const: "KIBRA", wCode: "1387", ward: "LINDI", sCode: "004", name: "MASHIMONI SQUATERS" },
  { cty: "NAIROBI", cCode: "278", const: "KIBRA", wCode: "1388", ward: "MAKINA", sCode: "005", name: "OLD KIBERA PRI SCH" },
  { cty: "NAIROBI", cCode: "278", const: "KIBRA", wCode: "1388", ward: "MAKINA", sCode: "006", name: "RAILA EDUC CENTER" },
  { cty: "NAIROBI", cCode: "278", const: "KIBRA", wCode: "1388", ward: "MAKINA", sCode: "008", name: "ACK HOLLY TRINITY - KIBERA" },
  { cty: "NAIROBI", cCode: "278", const: "KIBRA", wCode: "1388", ward: "MAKINA", sCode: "009", name: "MAKINA SELF HELP PRI" },
  { cty: "NAIROBI", cCode: "278", const: "KIBRA", wCode: "1388", ward: "MAKINA", sCode: "010", name: "KIBRA SOCIAL GRNDS" },
  { cty: "NAIROBI", cCode: "278", const: "KIBRA", wCode: "1389", ward: "WOODLEY", sCode: "011", name: "UPPER HILL SEC SCH" },
  { cty: "NAIROBI", cCode: "278", const: "KIBRA", wCode: "1389", ward: "WOODLEY", sCode: "013", name: "MBAGATHI RD PRI" },
  { cty: "NAIROBI", cCode: "278", const: "KIBRA", wCode: "1389", ward: "WOODLEY", sCode: "015", name: "JOSEPH KANGETHE PRI" },
  { cty: "NAIROBI", cCode: "278", const: "KIBRA", wCode: "1389", ward: "WOODLEY", sCode: "016", name: "TOY PRI SCH" },
  { cty: "NAIROBI", cCode: "278", const: "KIBRA", wCode: "1389", ward: "WOODLEY", sCode: "017", name: "JAMHURI PRI SCH" },
  { cty: "NAIROBI", cCode: "278", const: "KIBRA", wCode: "1390", ward: "SARANGOMBE", sCode: "019", name: "AYANY PRI SCH" },
  { cty: "NAIROBI", cCode: "278", const: "KIBRA", wCode: "1390", ward: "SARANGOMBE", sCode: "021", name: "OLYMPIC PRI SCH" },
  { cty: "NAIROBI", cCode: "278", const: "KIBRA", wCode: "1390", ward: "SARANGOMBE", sCode: "023", name: "KAG OLYMPIC EDUC CENTER" },
  { cty: "NAIROBI", cCode: "278", const: "KIBRA", wCode: "1390", ward: "SARANGOMBE", sCode: "020", name: "MISSIONARIES OF CHARITY" },
  { cty: "NAIROBI", cCode: "278", const: "KIBRA", wCode: "1390", ward: "SARANGOMBE", sCode: "024", name: "KIBERA PAG CHURCH SCH" },
  { cty: "NAIROBI", cCode: "279", const: "ROYSAMBU", wCode: "1391", ward: "GITHURAI", sCode: "001", name: "WONDERLAND INTEGRATED PRI" },
  { cty: "NAIROBI", cCode: "279", const: "ROYSAMBU", wCode: "1391", ward: "GITHURAI", sCode: "002", name: "GITHURAI SPORTS GROUND" },
  { cty: "NAIROBI", cCode: "279", const: "ROYSAMBU", wCode: "1391", ward: "GITHURAI", sCode: "003", name: "GITHURAI PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "279", const: "ROYSAMBU", wCode: "1392", ward: "KAHAWA WEST", sCode: "004", name: "KAHAWA WEST BAPTIST ACADEMY" },
  { cty: "NAIROBI", cCode: "279", const: "ROYSAMBU", wCode: "1392", ward: "KAHAWA WEST", sCode: "005", name: "MAHIGA PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "279", const: "ROYSAMBU", wCode: "1392", ward: "KAHAWA WEST", sCode: "006", name: "KAMITI PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "279", const: "ROYSAMBU", wCode: "1392", ward: "KAHAWA WEST", sCode: "008", name: "KIWANJA PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "279", const: "ROYSAMBU", wCode: "1393", ward: "ZIMMERMAN", sCode: "010", name: "ROYSAMBU PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "279", const: "ROYSAMBU", wCode: "1393", ward: "ZIMMERMAN", sCode: "011", name: "CORNERSTONE ACADEMY" },
  { cty: "NAIROBI", cCode: "279", const: "ROYSAMBU", wCode: "1393", ward: "ZIMMERMAN", sCode: "012", name: "NJATHAINI PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "279", const: "ROYSAMBU", wCode: "1394", ward: "ROYSAMBU", sCode: "013", name: "MUTHAIGA PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "279", const: "ROYSAMBU", wCode: "1394", ward: "ROYSAMBU", sCode: "014", name: "THIKA ROAD PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "279", const: "ROYSAMBU", wCode: "1394", ward: "ROYSAMBU", sCode: "015", name: "GARDEN ESTATE PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "279", const: "ROYSAMBU", wCode: "1394", ward: "ROYSAMBU", sCode: "016", name: "MARURUI PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "279", const: "ROYSAMBU", wCode: "1394", ward: "ROYSAMBU", sCode: "017", name: "INDEPENDENT PRESBYTERIAN CHURCH" },
  { cty: "NAIROBI", cCode: "279", const: "ROYSAMBU", wCode: "1395", ward: "KAHAWA", sCode: "018", name: "GREEN ANGELS ACADEMY" },
  { cty: "NAIROBI", cCode: "279", const: "ROYSAMBU", wCode: "1395", ward: "KAHAWA", sCode: "019", name: "KAMUTHI HOUSING COOP" },
  { cty: "NAIROBI", cCode: "279", const: "ROYSAMBU", wCode: "1395", ward: "KAHAWA", sCode: "020", name: "KAHAWA WEST PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "280", const: "KASARANI", wCode: "1396", ward: "CLAY CITY", sCode: "001", name: "KASARANI ACADEMY SEC" },
  { cty: "NAIROBI", cCode: "280", const: "KASARANI", wCode: "1396", ward: "CLAY CITY", sCode: "002", name: "MUREMA PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "280", const: "KASARANI", wCode: "1396", ward: "CLAY CITY", sCode: "003", name: "MAJI MAZURI GROUND" },
  { cty: "NAIROBI", cCode: "280", const: "KASARANI", wCode: "1396", ward: "CLAY CITY", sCode: "004", name: "GLOBAL ACADEMY" },
  { cty: "NAIROBI", cCode: "280", const: "KASARANI", wCode: "1397", ward: "MWIKI", sCode: "005", name: "FIRM FOUNDATION ACADEMY" },
  { cty: "NAIROBI", cCode: "280", const: "KASARANI", wCode: "1397", ward: "MWIKI", sCode: "006", name: "DELIVERANCE CHURCH MWIKI" },
  { cty: "NAIROBI", cCode: "280", const: "KASARANI", wCode: "1397", ward: "MWIKI", sCode: "007", name: "BRIGHT STAR HIGH SCHOOL" },
  { cty: "NAIROBI", cCode: "280", const: "KASARANI", wCode: "1397", ward: "MWIKI", sCode: "008", name: "ST. DOMINIC PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "280", const: "KASARANI", wCode: "1398", ward: "KASARANI", sCode: "009", name: "NGUMBA DISPENSARY" },
  { cty: "NAIROBI", cCode: "280", const: "KASARANI", wCode: "1398", ward: "KASARANI", sCode: "010", name: "KISE - KASARANI" },
  { cty: "NAIROBI", cCode: "280", const: "KASARANI", wCode: "1398", ward: "KASARANI", sCode: "011", name: "NEW KASARANI DC'S COMPOUND" },
  { cty: "NAIROBI", cCode: "280", const: "KASARANI", wCode: "1398", ward: "KASARANI", sCode: "012", name: "KASARANI PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "280", const: "KASARANI", wCode: "1398", ward: "KASARANI", sCode: "013", name: "YOUTH EMPOWERMENT CENTRE" },
  { cty: "NAIROBI", cCode: "280", const: "KASARANI", wCode: "1399", ward: "NJIRU", sCode: "014", name: "NJIRU ACK PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "280", const: "KASARANI", wCode: "1399", ward: "NJIRU", sCode: "015", name: "JEHOVAH JIRE PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "280", const: "KASARANI", wCode: "1399", ward: "NJIRU", sCode: "016", name: "MWENGENYE RESOURCE CENTRE" },
  { cty: "NAIROBI", cCode: "280", const: "KASARANI", wCode: "1399", ward: "NJIRU", sCode: "017", name: "JEHOVAH JIREH SEC SCHOOL" },
  { cty: "NAIROBI", cCode: "280", const: "KASARANI", wCode: "1399", ward: "NJIRU", sCode: "018", name: "NJIRU PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "280", const: "KASARANI", wCode: "1400", ward: "RUAI", sCode: "019", name: "RUAI PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "280", const: "KASARANI", wCode: "1400", ward: "RUAI", sCode: "020", name: "NGUNDU PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "280", const: "KASARANI", wCode: "1400", ward: "RUAI", sCode: "023", name: "MUHURI MUCHIRI SEC SCHOOL" },
  { cty: "NAIROBI", cCode: "280", const: "KASARANI", wCode: "1400", ward: "RUAI", sCode: "024", name: "RUAI GIRLS SEC SCHOOL" },
  { cty: "NAIROBI", cCode: "280", const: "KASARANI", wCode: "1400", ward: "RUAI", sCode: "026", name: "ATHI PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "281", const: "RUARAKA", wCode: "1401", ward: "BABA DOGO", sCode: "001", name: "BABA DOGO PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "281", const: "RUARAKA", wCode: "1401", ward: "BABA DOGO", sCode: "002", name: "MM CHANDARIA PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "281", const: "RUARAKA", wCode: "1401", ward: "BABA DOGO", sCode: "003", name: "SACRED HEART CATHOLIC" },
  { cty: "NAIROBI", cCode: "281", const: "RUARAKA", wCode: "1401", ward: "BABA DOGO", sCode: "004", name: "ACREF CENTRE" },
  { cty: "NAIROBI", cCode: "281", const: "RUARAKA", wCode: "1402", ward: "UTALII", sCode: "005", name: "HEIDEMARIE MATHARE 4A PRI" },
  { cty: "NAIROBI", cCode: "281", const: "RUARAKA", wCode: "1402", ward: "UTALII", sCode: "006", name: "STIMA MEMBERS CLUB" },
  { cty: "NAIROBI", cCode: "281", const: "RUARAKA", wCode: "1402", ward: "UTALII", sCode: "007", name: "DRIVE IN PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "281", const: "RUARAKA", wCode: "1403", ward: "MATHARE NORTH", sCode: "008", name: "ST. STEPHENS NURSERY" },
  { cty: "NAIROBI", cCode: "281", const: "RUARAKA", wCode: "1403", ward: "MATHARE NORTH", sCode: "009", name: "MATHARE NORTH PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "281", const: "RUARAKA", wCode: "1403", ward: "MATHARE NORTH", sCode: "010", name: "ST. CHRISTOPHER WHOLISTIC" },
  { cty: "NAIROBI", cCode: "281", const: "RUARAKA", wCode: "1403", ward: "MATHARE NORTH", sCode: "011", name: "MATHARE NORTH SOCIAL HALL" },
  { cty: "NAIROBI", cCode: "281", const: "RUARAKA", wCode: "1404", ward: "LUCKY SUMMER", sCode: "012", name: "CHIEF'S COMPOUND LUCKY SUMMER" },
  { cty: "NAIROBI", cCode: "281", const: "RUARAKA", wCode: "1404", ward: "LUCKY SUMMER", sCode: "013", name: "LUCKY SUMMER OPEN GROUND" },
  { cty: "NAIROBI", cCode: "281", const: "RUARAKA", wCode: "1404", ward: "LUCKY SUMMER", sCode: "014", name: "TIBA JUNIOR ACADEMY" },
  { cty: "NAIROBI", cCode: "281", const: "RUARAKA", wCode: "1405", ward: "KOROGOCHO", sCode: "015", name: "NGUNYUMU PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "281", const: "RUARAKA", wCode: "1405", ward: "KOROGOCHO", sCode: "016", name: "KARIOBANGI BAPTIST YOUTH" },
  { cty: "NAIROBI", cCode: "281", const: "RUARAKA", wCode: "1405", ward: "KOROGOCHO", sCode: "017", name: "KOROGOCHO COMMUNITY CENTRE" },
  { cty: "NAIROBI", cCode: "281", const: "RUARAKA", wCode: "1405", ward: "KOROGOCHO", sCode: "018", name: "KASARANI YOUTH RESOURCE" },
  { cty: "NAIROBI", cCode: "281", const: "RUARAKA", wCode: "1405", ward: "KOROGOCHO", sCode: "019", name: "DANIEL COMBONI PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "282", const: "EMBAKASI SOUTH", wCode: "1406", ward: "IMARA DAIMA", sCode: "001", name: "MUKURU EDUCATIONAL CENTRE" },
  { cty: "NAIROBI", cCode: "282", const: "EMBAKASI SOUTH", wCode: "1406", ward: "IMARA DAIMA", sCode: "002", name: "EMBAKASI GIRLS SEC SCHOOL" },
  { cty: "NAIROBI", cCode: "282", const: "EMBAKASI SOUTH", wCode: "1406", ward: "IMARA DAIMA", sCode: "003", name: "IMARA DAIMA GROUNDS" },
  { cty: "NAIROBI", cCode: "282", const: "EMBAKASI SOUTH", wCode: "1407", ward: "KWA NJENGA", sCode: "004", name: "AA VILLA GROUND" },
  { cty: "NAIROBI", cCode: "282", const: "EMBAKASI SOUTH", wCode: "1407", ward: "KWA NJENGA", sCode: "005", name: "KWA NJENGA PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "282", const: "EMBAKASI SOUTH", wCode: "1407", ward: "KWA NJENGA", sCode: "006", name: "CHEMINADE TRAINING CENTRE" },
  { cty: "NAIROBI", cCode: "282", const: "EMBAKASI SOUTH", wCode: "1408", ward: "KWA REUBEN", sCode: "007", name: "REUBEN PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "282", const: "EMBAKASI SOUTH", wCode: "1408", ward: "KWA REUBEN", sCode: "008", name: "MAENDELEO LEARNING CENTRE" },
  { cty: "NAIROBI", cCode: "282", const: "EMBAKASI SOUTH", wCode: "1408", ward: "KWA REUBEN", sCode: "009", name: "GATOTO PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "282", const: "EMBAKASI SOUTH", wCode: "1409", ward: "PIPELINE", sCode: "010", name: "PCEA PIPELINE" },
  { cty: "NAIROBI", cCode: "282", const: "EMBAKASI SOUTH", wCode: "1409", ward: "PIPELINE", sCode: "011", name: "FREE PENTECOSTAL UZIMA" },
  { cty: "NAIROBI", cCode: "282", const: "EMBAKASI SOUTH", wCode: "1409", ward: "PIPELINE", sCode: "012", name: "KENYA PIPELINE ESTATE HALL" },
  { cty: "NAIROBI", cCode: "282", const: "EMBAKASI SOUTH", wCode: "1410", ward: "KWARE", sCode: "013", name: "JOBENPHA COMMUNITY SCHOOL" },
  { cty: "NAIROBI", cCode: "282", const: "EMBAKASI SOUTH", wCode: "1410", ward: "KWARE", sCode: "014", name: "UNIQUE ESTATE GATE" },
  { cty: "NAIROBI", cCode: "283", const: "EMBAKASI NORTH", wCode: "1411", ward: "KARIOBANGI NORTH", sCode: "001", name: "KARIOBANGI NORTH PRI" },
  { cty: "NAIROBI", cCode: "283", const: "EMBAKASI NORTH", wCode: "1411", ward: "KARIOBANGI NORTH", sCode: "002", name: "KARIOBANGI NORTH GIRLS" },
  { cty: "NAIROBI", cCode: "283", const: "EMBAKASI NORTH", wCode: "1411", ward: "KARIOBANGI NORTH", sCode: "003", name: "OUR LADY OF FATIMA SEC" },
  { cty: "NAIROBI", cCode: "283", const: "EMBAKASI NORTH", wCode: "1411", ward: "KARIOBANGI NORTH", sCode: "004", name: "MARURA PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "283", const: "EMBAKASI NORTH", wCode: "1411", ward: "KARIOBANGI NORTH", sCode: "005", name: "KARIOBANGI NORTH DAY NURSERY" },
  { cty: "NAIROBI", cCode: "283", const: "EMBAKASI NORTH", wCode: "1412", ward: "DANDORA I", sCode: "006", name: "DANDORA 1 PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "283", const: "EMBAKASI NORTH", wCode: "1413", ward: "DANDORA II", sCode: "007", name: "JAMES GICHURU PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "283", const: "EMBAKASI NORTH", wCode: "1413", ward: "DANDORA II", sCode: "008", name: "DANDORA SEC SCHOOL" },
  { cty: "NAIROBI", cCode: "283", const: "EMBAKASI NORTH", wCode: "1413", ward: "DANDORA II", sCode: "009", name: "WANGU PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "283", const: "EMBAKASI NORTH", wCode: "1414", ward: "DANDORA III", sCode: "010", name: "TOM MBOYA PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "283", const: "EMBAKASI NORTH", wCode: "1414", ward: "DANDORA III", sCode: "011", name: "DANDORA III CC HALL" },
  { cty: "NAIROBI", cCode: "283", const: "EMBAKASI NORTH", wCode: "1415", ward: "DANDORA IV", sCode: "012", name: "RONALD NGALA PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "283", const: "EMBAKASI NORTH", wCode: "1415", ward: "DANDORA IV", sCode: "013", name: "KINYAGO DANDORA PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "283", const: "EMBAKASI NORTH", wCode: "1415", ward: "DANDORA IV", sCode: "014", name: "USHIRIKA SEC SCHOOL" },
  { cty: "NAIROBI", cCode: "284", const: "EMBAKASI CENTRAL", wCode: "1416", ward: "KAYOLE NORTH", sCode: "001", name: "KAYOLE 1 PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "284", const: "EMBAKASI CENTRAL", wCode: "1417", ward: "KAYOLE CENTRAL", sCode: "002", name: "IMARA PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "284", const: "EMBAKASI CENTRAL", wCode: "1417", ward: "KAYOLE CENTRAL", sCode: "003", name: "BONDENI PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "284", const: "EMBAKASI CENTRAL", wCode: "1418", ward: "KAYOLE SOUTH", sCode: "004", name: "THAWABU PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "284", const: "EMBAKASI CENTRAL", wCode: "1418", ward: "KAYOLE SOUTH", sCode: "005", name: "MWANGAZA PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "284", const: "EMBAKASI CENTRAL", wCode: "1418", ward: "KAYOLE SOUTH", sCode: "006", name: "MWANGAZA SEC SCHOOL" },
  { cty: "NAIROBI", cCode: "284", const: "EMBAKASI CENTRAL", wCode: "1419", ward: "KOMAROCK", sCode: "007", name: "THE KOMAROCK SCHOOL" },
  { cty: "NAIROBI", cCode: "284", const: "EMBAKASI CENTRAL", wCode: "1419", ward: "KOMAROCK", sCode: "008", name: "KOMAROCK PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "284", const: "EMBAKASI CENTRAL", wCode: "1420", ward: "MATOPENI", sCode: "009", name: "KAYOLE NORTH PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "284", const: "EMBAKASI CENTRAL", wCode: "1420", ward: "MATOPENI", sCode: "010", name: "ESVAK COMMUNITY SCHOOL" },
  { cty: "NAIROBI", cCode: "285", const: "EMBAKASI EAST", wCode: "1421", ward: "UPPER SAVANNAH", sCode: "001", name: "DOONHOLM PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "285", const: "EMBAKASI EAST", wCode: "1421", ward: "UPPER SAVANNAH", sCode: "002", name: "GREEN SPAN MALL GROUNDS" },
  { cty: "NAIROBI", cCode: "285", const: "EMBAKASI EAST", wCode: "1422", ward: "LOWER SAVANNAH", sCode: "003", name: "EDELVALE PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "285", const: "EMBAKASI EAST", wCode: "1422", ward: "LOWER SAVANNAH", sCode: "004", name: "SOWETO SOCIAL HALL" },
  { cty: "NAIROBI", cCode: "285", const: "EMBAKASI EAST", wCode: "1423", ward: "EMBAKASI", sCode: "005", name: "EMBAKASI SOCIAL HALL" },
  { cty: "NAIROBI", cCode: "285", const: "EMBAKASI EAST", wCode: "1423", ward: "EMBAKASI", sCode: "006", name: "EMBAKASI PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "285", const: "EMBAKASI EAST", wCode: "1423", ward: "EMBAKASI", sCode: "007", name: "TASSIA CATHOLIC PRI" },
  { cty: "NAIROBI", cCode: "285", const: "EMBAKASI EAST", wCode: "1424", ward: "UTAWALA", sCode: "008", name: "UTAWALA ACADEMY" },
  { cty: "NAIROBI", cCode: "285", const: "EMBAKASI EAST", wCode: "1424", ward: "UTAWALA", sCode: "009", name: "AVIATION SCHOOL" },
  { cty: "NAIROBI", cCode: "285", const: "EMBAKASI EAST", wCode: "1425", ward: "MIHANGO", sCode: "010", name: "MAUA PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "285", const: "EMBAKASI EAST", wCode: "1425", ward: "MIHANGO", sCode: "011", name: "MIHANG'O PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "285", const: "EMBAKASI EAST", wCode: "1425", ward: "MIHANGO", sCode: "012", name: "IMMACULATE PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "286", const: "EMBAKASI WEST", wCode: "1426", ward: "UMOJA I", sCode: "001", name: "UMOJA 1 PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "286", const: "EMBAKASI WEST", wCode: "1427", ward: "UMOJA II", sCode: "002", name: "BUSARA PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "286", const: "EMBAKASI WEST", wCode: "1427", ward: "UMOJA II", sCode: "004", name: "KIFARU PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "286", const: "EMBAKASI WEST", wCode: "1427", ward: "UMOJA II", sCode: "005", name: "TUMAINI PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "286", const: "EMBAKASI WEST", wCode: "1428", ward: "MOWLEM", sCode: "006", name: "MOWLEM CENTER" },
  { cty: "NAIROBI", cCode: "286", const: "EMBAKASI WEST", wCode: "1429", ward: "KARIOBANGI SOUTH", sCode: "007", name: "KARIOBANGI SOUTH PRI" },
  { cty: "NAIROBI", cCode: "286", const: "EMBAKASI WEST", wCode: "1429", ward: "KARIOBANGI SOUTH", sCode: "008", name: "DR. MWENJE SEC SCHOOL" },
  { cty: "NAIROBI", cCode: "286", const: "EMBAKASI WEST", wCode: "1429", ward: "KARIOBANGI SOUTH", sCode: "009", name: "UHURU PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "286", const: "EMBAKASI WEST", wCode: "1429", ward: "KARIOBANGI SOUTH", sCode: "010", name: "BURUBURU I PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "286", const: "EMBAKASI WEST", wCode: "1429", ward: "KARIOBANGI SOUTH", sCode: "011", name: "NAIROBI RIVER PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "287", const: "MAKADARA", wCode: "1430", ward: "MARINGO/HAMZA", sCode: "001", name: "DR. KRAPF PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "287", const: "MAKADARA", wCode: "1430", ward: "MARINGO/HAMZA", sCode: "003", name: "ST MICHAELS PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "287", const: "MAKADARA", wCode: "1430", ward: "MARINGO/HAMZA", sCode: "004", name: "MARTIN LUTHER PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "287", const: "MAKADARA", wCode: "1430", ward: "MARINGO/HAMZA", sCode: "007", name: "DR. LIVINGSTONE PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "287", const: "MAKADARA", wCode: "1430", ward: "MARINGO/HAMZA", sCode: "008", name: "ST. ANNES GIRLS PRI" },
  { cty: "NAIROBI", cCode: "287", const: "MAKADARA", wCode: "1431", ward: "VIWANDANI", sCode: "009", name: "ST. ELIZABETH PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "287", const: "MAKADARA", wCode: "1431", ward: "VIWANDANI", sCode: "010", name: "STAR OF HOPE PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "287", const: "MAKADARA", wCode: "1431", ward: "VIWANDANI", sCode: "011", name: "BRIDGE INT. ACADEMIES" },
  { cty: "NAIROBI", cCode: "287", const: "MAKADARA", wCode: "1432", ward: "HARAMBEE", sCode: "012", name: "HARAMBEE PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "287", const: "MAKADARA", wCode: "1432", ward: "HARAMBEE", sCode: "013", name: "JERICHO SOCIAL HALL" },
  { cty: "NAIROBI", cCode: "287", const: "MAKADARA", wCode: "1432", ward: "HARAMBEE", sCode: "014", name: "BURU BURU GIRLS SEC" },
  { cty: "NAIROBI", cCode: "287", const: "MAKADARA", wCode: "1432", ward: "HARAMBEE", sCode: "015", name: "BIDII PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "287", const: "MAKADARA", wCode: "1432", ward: "HARAMBEE", sCode: "016", name: "BARAKA PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "287", const: "MAKADARA", wCode: "1433", ward: "MAKONGENI", sCode: "019", name: "ST. PAUL'S PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "287", const: "MAKADARA", wCode: "1433", ward: "MAKONGENI", sCode: "020", name: "MAKONGENI PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "287", const: "MAKADARA", wCode: "1433", ward: "MAKONGENI", sCode: "021", name: "JOSEPH APUDO PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "287", const: "MAKADARA", wCode: "1433", ward: "MAKONGENI", sCode: "022", name: "ST JOHN'S PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "287", const: "MAKADARA", wCode: "1433", ward: "MAKONGENI", sCode: "023", name: "KALOLENI PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "288", const: "KAMUKUNJI", wCode: "1434", ward: "PUMWANI", sCode: "001", name: "MUTHURWA PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "288", const: "KAMUKUNJI", wCode: "1434", ward: "PUMWANI", sCode: "002", name: "KAMUKUNJI SEC SCHOOL" },
  { cty: "NAIROBI", cCode: "288", const: "KAMUKUNJI", wCode: "1434", ward: "PUMWANI", sCode: "003", name: "OUR LADY OF MERCY PRI" },
  { cty: "NAIROBI", cCode: "288", const: "KAMUKUNJI", wCode: "1434", ward: "PUMWANI", sCode: "004", name: "HESHIMA PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "288", const: "KAMUKUNJI", wCode: "1434", ward: "PUMWANI", sCode: "005", name: "PUMWANI SOCIAL HALL" },
  { cty: "NAIROBI", cCode: "288", const: "KAMUKUNJI", wCode: "1435", ward: "EASTLEIGH NORTH", sCode: "008", name: "NEW EASTLEIGH PRI" },
  { cty: "NAIROBI", cCode: "288", const: "KAMUKUNJI", wCode: "1435", ward: "EASTLEIGH NORTH", sCode: "009", name: "EASTLEIGH HIGH SCHOOL" },
  { cty: "NAIROBI", cCode: "288", const: "KAMUKUNJI", wCode: "1435", ward: "EASTLEIGH NORTH", sCode: "010", name: "ST.TERESA'S BOYS PRI" },
  { cty: "NAIROBI", cCode: "288", const: "KAMUKUNJI", wCode: "1436", ward: "EASTLEIGH SOUTH", sCode: "011", name: "ZAWADI PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "288", const: "KAMUKUNJI", wCode: "1436", ward: "EASTLEIGH SOUTH", sCode: "012", name: "KIAMBIU SOCIAL HALL" },
  { cty: "NAIROBI", cCode: "288", const: "KAMUKUNJI", wCode: "1437", ward: "AIRBASE", sCode: "013", name: "EASTLEIGH AIRPORT PRI" },
  { cty: "NAIROBI", cCode: "288", const: "KAMUKUNJI", wCode: "1437", ward: "AIRBASE", sCode: "014", name: "MAINA WANJIGI SEC" },
  { cty: "NAIROBI", cCode: "288", const: "KAMUKUNJI", wCode: "1438", ward: "CALIFORNIA", sCode: "015", name: "NEW PUMWANI PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "288", const: "KAMUKUNJI", wCode: "1438", ward: "CALIFORNIA", sCode: "016", name: "BIAFRA HEALTH CENTER" },
  { cty: "NAIROBI", cCode: "289", const: "STAREHE", wCode: "1439", ward: "NAIROBI CENTRAL", sCode: "001", name: "NSSF GROUNDS" },
  { cty: "NAIROBI", cCode: "289", const: "STAREHE", wCode: "1439", ward: "NAIROBI CENTRAL", sCode: "002", name: "MOI AVENUE PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "289", const: "STAREHE", wCode: "1439", ward: "NAIROBI CENTRAL", sCode: "003", name: "KENYA POLY UNIVERSITY" },
  { cty: "NAIROBI", cCode: "289", const: "STAREHE", wCode: "1440", ward: "NGARA", sCode: "007", name: "JAMUHURI HIGH SCHOOL" },
  { cty: "NAIROBI", cCode: "289", const: "STAREHE", wCode: "1440", ward: "NGARA", sCode: "008", name: "CITY PRIMARY SCHOOL" },
  { cty: "NAIROBI", cCode: "289", const: "STAREHE", wCode: "1441", ward: "PANGANI", sCode: "013", name: "PANGANI GIRLS HIGH" },
  { cty: "NAIROBI", cCode: "289", const: "STAREHE", wCode: "1444", ward: "NAIROBI SOUTH", sCode: "022", name: "PLAINSVIEW PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "290", const: "MATHARE", wCode: "1445", ward: "HOSPITAL", sCode: "001", name: "OLD MATHARE PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "290", const: "MATHARE", wCode: "1447", ward: "HURUMA", sCode: "004", name: "HURUMA PRI SCHOOL" },
  { cty: "NAIROBI", cCode: "290", const: "MATHARE", wCode: "1450", ward: "KIAMAIKO", sCode: "011", name: "NDURURUNO PRI SCHOOL" }
];

const countyLeaders = [
  {
    office: "Governor",
    name: "Hon. Johnson Sakaja",
    party: "UDA",
    roleSummary: "Chief executive of Nairobi County and responsible for county-wide service delivery.",
    controls: [
      "County planning",
      "County budgeting priorities",
      "County executive leadership",
      "County service delivery",
    ],
    doesNotControl: [
      "National laws",
      "Parliament",
      "Senate",
    ],
    manifestoHighlights: [
      "Improve county health services",
      "Upgrade roads",
      "Increase transparency",
    ],
    officeHolderBio: "County governor profile for CivicHub seed data.",
    comparisonTags: ["budget", "city-planning", "service-delivery"],
    order: 1,
  },
  {
    office: "Senator",
    name: "Hon. Edwin Sifuna",
    party: "ODM",
    roleSummary: "Represents the county in the Senate and protects county interests.",
    controls: [
      "County interests in Senate",
      "Revenue oversight",
      "Devolution accountability",
    ],
    doesNotControl: [
      "County executive operations",
      "Ward-level administration",
      "National legislation by himself",
    ],
    manifestoHighlights: [
      "Protect county revenue",
      "Monitor funds",
      "Public oversight",
    ],
    officeHolderBio: "County senator profile for CivicHub seed data.",
    comparisonTags: ["oversight", "devolution", "accountability"],
    order: 2,
  },
  {
    office: "Woman Rep",
    name: "Hon. Esther Passaris",
    party: "ODM",
    roleSummary: "Represents women, youth, and marginalized groups at the county level.",
    controls: [
      "Advocacy",
      "Representation",
      "Oversight",
    ],
    doesNotControl: [
      "County executive decisions",
      "Ward budgets",
    ],
    manifestoHighlights: [
      "Youth support",
      "Women empowerment",
      "Safety",
    ],
    officeHolderBio: "Women representative profile for CivicHub seed data.",
    comparisonTags: ["women", "youth", "welfare"],
    order: 3,
  },
];

function makeLocalLeaders(item) {
  return [
    {
      office: "MP",
      name: `MP for ${item.const}`,
      party: "N/A",
      roleSummary: `Represents ${item.const} in the National Assembly.`,
      controls: [
        "National law-making",
        "Constituency representation",
        "Oversight",
      ],
      doesNotControl: [
        "County executive",
        "Ward assembly legislation",
      ],
      manifestoHighlights: [
        "Jobs",
        "Education",
        "Constituency roads",
      ],
      officeHolderBio: `Member of Parliament profile for ${item.const}.`,
      comparisonTags: ["jobs", "education", "roads"],
      order: 4,
    },
    {
      office: "MCA",
      name: `MCA for ${item.ward}`,
      party: "N/A",
      roleSummary: `Represents ${item.ward} in the county assembly.`,
      controls: [
        "Ward legislation",
        "County oversight",
        "Ward service delivery",
      ],
      doesNotControl: [
        "National legislation",
      ],
      manifestoHighlights: [
        "Drainage",
        "Street lighting",
        "Ward accountability",
      ],
      officeHolderBio: `Member of County Assembly profile for ${item.ward}.`,
      comparisonTags: ["ward", "assembly", "accountability"],
      order: 5,
    },
    {
      office: "Chief",
      name: `Chief of ${item.ward}`,
      department: "National Administration",
      roleSummary: `Coordinates national government functions at the local level in ${item.ward}.`,
      controls: [
        "Local administration",
        "Order coordination",
        "Service linkage",
      ],
      doesNotControl: [
        "Legislation",
        "County budgets",
      ],
      manifestoHighlights: [
        "Community coordination",
        "Issue escalation",
        "Resident support",
      ],
      officeHolderBio: `Area chief profile for ${item.ward}.`,
      comparisonTags: ["administration", "security", "coordination"],
      order: 6,
    },
  ];
}

function jitter(base, spread) {
  return Number((base + (Math.random() * spread - spread / 2)).toFixed(6));
}

function randomMapPercent(min = 10, max = 90) {
  return `${Math.floor(Math.random() * (max - min + 1)) + min}%`;
}
function pickStatus(index) {
  const statuses = [
    "Planned",
    "In progress",
    "Released",
    "Completed",
    "Delayed"
  ];
  return statuses[index % statuses.length];
}

async function seed() {
  let session = null;

  try {
    await connectDB(process.env.MONGO_URI);
    await mongoose.connection.dropDatabase();

    // Wipe collections in the right order
    await Promise.all([
      AccountabilityItem.deleteMany({}),
      Leader.deleteMany({}),
      Area.deleteMany({}),
      Station.deleteMany({}),
    ]);

    console.log("🚀 Starting CivicHub seed...");

    for (let i = 0; i < rawData.length; i++) {
      const item = rawData[i];

      const station = await Station.create({
        name: item.name,
        code: `${item.cCode}-${item.sCode}`,
        county: item.cty,
        constituency: item.const,
        ward: item.ward,
        openHours: "6:00 AM - 5:00 PM",
        isOpen: true,
        lat: jitter(-1.286389, 0.08),
        lng: jitter(36.817223, 0.08),
        mapX: randomMapPercent(),
        mapY: randomMapPercent(),
      });

      const area = await Area.create({
        county: item.cty,
        constituency: item.const,
        ward: item.ward,
        station: station._id,
        metrics: {
          leadersCount: 6,
          manifestosCount: 6,
          reportsCount: Math.floor(Math.random() * 3),
          petitionsCount: Math.floor(Math.random() * 2),
        },
        accountability: {
          budgetProgress: Math.floor(Math.random() * 60) + 20,
          procurementCount: Math.floor(Math.random() * 15) + 3,
          reportsCount: Math.floor(Math.random() * 3),
          items: [
            {
              title: `${item.ward} drainage repair`,
              status: "In progress",
            },
            {
              title: `${item.ward} community lighting`,
              status: "Under review",
            },
          ],
        },
        manifestoCompare: [
          {
            office: "Governor",
            theme: "Health",
            highlight: "Improve county health services",
          },
          {
            office: "MP",
            theme: "Jobs",
            highlight: `Create employment programs for ${item.const}`,
          },
          {
            office: "MCA",
            theme: "Ward Services",
            highlight: `Fix drainage and lighting in ${item.ward}`,
          },
        ],
        leaders: [],
      });

      const leadersToCreate = [
        ...countyLeaders.map((leader) => ({
          ...leader,
          area: area._id,
        })),
        ...makeLocalLeaders(item).map((leader) => ({
          ...leader,
          area: area._id,
        })),
      ];

      const createdLeaders = await Leader.insertMany(leadersToCreate);

      area.leaders = createdLeaders.map((leader) => leader._id);
      await area.save();

      await AccountabilityItem.create({
        areaId: area._id,
        projectName: `${item.ward} Local Project`,
        vendor: "CivicHub Works Ltd",
        status: pickStatus(i),
        amount: 2500000 + i * 15000,
        progress: Math.min(100, Math.floor(Math.random() * 90) + 5),
      });

      if ((i + 1) % 25 === 0 || i === rawData.length - 1) {
        console.log(`✅ Seeded ${i + 1}/${rawData.length} stations`);
      }
    }

    console.log(`🎉 CivicHub seed complete: ${rawData.length} stations, ${rawData.length} areas, ${rawData.length * 6} leaders, ${rawData.length} accountability items.`);
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    process.exit(process.exitCode || 0);
  }
}

seed();