import { createClient } from "@supabase/supabase-js";
import {} from "dotenv/config";
import url from "url";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

let { data, error } = await supabase.from("types").select();
console.log(data, error);

const supabase1 = createClient(supabaseUrl, supabaseKey);

let { data:data1, error:error1 } = await supabase1.from("entry").select("*").limit(100);
console.log(data1, error1);


let enter = 'JS-VBNET-2'
let request = '/Index.htm'
let { data:data2, error:error2 } = await supabase
  .rpc('path1', {
    enter, 
    request
  });

  if (error) {
    console.error('Error calling function:', error2);
  } else {
    console.log('Function result:', data2);
  }
