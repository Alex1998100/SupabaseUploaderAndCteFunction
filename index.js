import { createClient } from "@supabase/supabase-js";
import {} from "dotenv/config";
import { Connect, disConnect, Select, Insert } from "./postgres.js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const { data, error } = await supabase.from("types").select();
let types = new Map();
data.forEach((x) => types.set(x.mime, x.i));

let selectCallback = async (result) => {
  console.log(types);
  for (let i = 0; i < result.length; i++) {
    const { error } = await supabase.from("test").insert({ name: result[i].name, id: result[i].id, parent: result[i].parent, type: types.get(result[i].mime) });
    console.log(result[i].i, error);
  }
  await disConnect(db);
};

let db = Connect();
await Select(db, "SELECT * FROM public.entry order by i;", selectCallback);
